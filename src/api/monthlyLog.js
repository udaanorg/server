import express from 'express';
import { MonthlyLogService } from '../services';
import { verifyTokenMiddleWare } from './user';

const monthlyLogRouter = express.Router();

/**
 * @api {get} /api/v1/monthlyLog/all Get all logs
 * @apiName MonthlyLog
 * @apiGroup MonthlyLog
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200
 *      [
 *          {
 *              "id": "04740acb-cfa8-4edb-9433-78818eaa5d1c",
 *              "entryDate": "2021-10-23T07:22:49.894Z",
 *              "materialName": "noneeee",
 *              "quantityBought": 555555,
 *              "quantityLeft": 300
 *          }
 *      ]
 */
monthlyLogRouter.get('/all', async (req, res) => {

    try {
        const data = await MonthlyLogService.getAllLogs();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

monthlyLogRouter.use('/', verifyTokenMiddleWare);

/**
 * @api {post} /api/v1/monthlyLog/ Insert log
 * @apiName MonthlyLog
 * @apiGroup MonthlyLog
 * @apiParam {string} kitchen kitchen's id
 * @apiParam {string} [entryDate] none
 * @apiParam {string} materialName none
 * @apiParam {number} quantityBought none
 * @apiParam {number} quantityLeft none
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201
 *      {
 *          "message": "Created!"
 *      }
 */
monthlyLogRouter.post('/', async (req, res) => {

    try {
        await MonthlyLogService.insertLog({ ...req.body });
        res.status(201).json({ message: 'Created!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default monthlyLogRouter;
