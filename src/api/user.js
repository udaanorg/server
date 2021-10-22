import express from 'express';
import { UserService } from '../services/';

const userRouter = express.Router();

/**
 * @api {post} /api/v1/user/signup User signup
 * @apiName User
 * @apiGroup User
 * @apiParam {string} name 
 * @apiParam {string} kitchen kitchen's id
 * @apiParam {string} email 
 * @apiParam {string} password 
 * @apiParam {string} dateOfBirth 
 * @apiError (ClientError) {json} 400 
 * @apiError (ServerError) {json} 500 
 */
userRouter.post('/signup', async (req, res) => {
    try {
        const serviceResponse = await UserService.signup({ ...req.body });
        if (serviceResponse instanceof Error) {
            res.status(400).json({ message: 'Client Error' });
            return;
        }
        res.status(201).json({ message: 'Created!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error!' });
    }
});

/**
 * @api {post} /api/v1/user/login User login
 * @apiName User
 * @apiGroup User
 * @apiParam {string} email
 * @apiParam {string} password
 * @apiError (ClientError) {json} 400
 * @apiError (ServerError) {json} 500 
 * @apiDescription Http-Only cookie is set.
 */
userRouter.post('/login', async (req, res) => {
    try {
        const serviceResponse = await UserService.login(req.body.email, req.body.password);
        if (serviceResponse instanceof Error) {
            res.status(400).json({ message: 'Client Error' });
            return;
        }
        res.cookie('token', serviceResponse.token, {
            maxAge: 3 * 24 * 60 * 60,
            httpOnly: true
        });
        res.status(200).json(serviceResponse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error!' });
    }
});

/**
 * @api {post} /api/v1/user/logout User logout
 * @apiName User
 * @apiGroup User
 * @apiParam {string} JWT
 * @apiError (ClientError) {json} 400
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 * @apiDescription Http-Only cookie is set.
 */
userRouter.post('/logout', async (req, res) => {
    try {
        const serviceResponse = await UserService.logout(req.body.token);
        if (serviceResponse instanceof Error) {
            res.status(400).json({ message: 'Client Error' });
            return;
        }
        res.cookie('token', '', {
            maxAge: 3 * 24 * 60 * 60,
            httpOnly: true
        });
        res.status(201).json({ message: 'Logged out!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error!' });
    }
});

async function verifyTokenMiddleWare(req, res, next) {
    try {
        const { token } = req.cookies;
        const serviceResponse = await UserService.verifyAndDecodeJWT(token);
        if (serviceResponse instanceof Error) {
            res.status(400).json({ message: 'Client Error' });
        }
        req.body.serviceResponse = serviceResponse;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

export {
    userRouter,
    verifyTokenMiddleWare
}
