import express from 'express';
import { MonthlyLogService } from '../services';

const monthlyLogRouter = express.Router();

/**
 * @api {get} /api/v1/monthlyLog/all Get all logs
 * @apiName MonthlyLog
 * @apiGroup MonthlyLog
 * @apiError (ServerError) {json} 500 
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

/**
 * @api {post} /api/v1/monthlyLog/ Insert log
 * @apiName MonthlyLog
 * @apiGroup MonthlyLog
 * @apiParam {string} kitchen kitchen's id
 * @apiParam {string} materialName none
 * @apiParam {number} quantityBought none
 * @apiParam {number} quantityLeft none
 * @apiError (ServerError) {json} 500 
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
