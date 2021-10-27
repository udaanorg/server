import express from 'express';
import { ProductionLogService } from '../services/';
import { verifyTokenMiddleWare } from './user';

const productionLogRouter = express.Router();

/**
 * @api {get} /api/v1/productionLog/all Get all prodution logs
 * @apiName ProductionLog
 * @apiGroup ProductionLog
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200
 *      [
 *          {
 *              "id": "04740acb-cfa8-4edb-9433-78818eaa5d1c",
 *              "entryDate": "2021-10-23T07:22:49.894Z",
 *              "quantityUsed": 3000,
 *              "quantityLeft": 555555,
 *              "platesMade": 300
 *          }
 *      ]
*/
productionLogRouter.get("/all", async (req, res) => {
    try {
        const data = await ProductionLogService.getAllProductionLogs();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.json({ message: 'Server Error' });
    }
});

productionLogRouter.use('/', verifyTokenMiddleWare);

/**
 * @api {post} /api/v1/productionLog/ Insert production Log
 * @apiName ProductionLog
 * @apiGroup ProductionLog
 * @apiParam {string} kitchen kitchen's id
 * @apiParam {string} [entryDate] none
 * @apiParam {number} platesMade none
 * @apiParam {number} quantityUsed none
 * @apiParam {number} quantityLeft none
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201
 *      {
 *          "message": "Created!"
 *      }
*/
productionLogRouter.post("/", async (req, res) => {
    try {
        await ProductionLogService.createProductionLog({...req.body});
        res.json({ message: "Created" });
    } catch (err) {
        console.error(err);
        res.json({ message: 'Server Error' });
    }
});

export default productionLogRouter;