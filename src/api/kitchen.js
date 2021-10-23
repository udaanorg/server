import express from 'express';
import { KitchenService } from '../services'
import { verifyTokenMiddleWare } from './user';

const kitchenRouter = express.Router();

/**
 * @api {get} /api/v1/kitchen/all Get all Kitchens
 * @apiName Kitchen
 * @apiGroup Kitchen
 * @apiError (ServerError) {json} 500 
*/

kitchenRouter.get("/all", async (req, res) => {
    try {
        const data = await KitchenService.getAllKitchens();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.json({ message: 'Server Error' });
    }
});

/**
 * @api {get} /api/v1/kitchen/one/:id Get Kitchen by Id
 * @apiName Kitchen
 * @apiGroup Kitchen
 * @apiError (ServerError) {json} 500 
*/

kitchenRouter.get("/one/:id", async(req, res) => {
    try {
        const data = await KitchenService.getKitchenById(req.params.id);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.json({ message: 'Server Error' });
    }
});

kitchenRouter.use('/', verifyTokenMiddleWare);

/**
 * @api {post} /api/v1/kitchen/ Insert Kitchen
 * @apiName Kitchen
 * @apiGroup Kitchen
 * @apiParam {string} id
 * @apiParam {string} state none
 * @apiParam {string} city none
 * @apiParam {string} area none
 * @apiParam {number} pincode none
 * @apiError (ServerError) {json} 500 
*/

kitchenRouter.post("/", async (req, res) => {
    try {
        await KitchenService.createKitchen({...req.body});
        res.json({ message: "Created" });
    } catch (err) {
        console.error(err);
        res.json({ message: 'Server Error' });
    }
});

export default kitchenRouter;