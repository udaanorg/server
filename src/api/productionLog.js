import express from "express";
import productionLogService from "../services/productionLogService";

const productionLogRouter = express.Router();

/**
 * @api {get} /api/v1/productionLog/all Get all prodution logs
 * @apiName ProductionLog
 * @apiGroup ProductionLog
 * @apiError (ServerError) {json} 500 
*/

productionLogRouter.get("/all", async (req, res) => {
    try {
        const data = await productionLogService.getAllProductionLogs();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.json({ message: 'Server Error' });
    }
});

/**
 * @api {post} /api/v1/productionLog/ Insert production Log
 * @apiName ProductionLog
 * @apiGroup ProductionLog
 * @apiParam {string} kitchen kitchen's id
 * @apiParam {number} platesMade none
 * @apiParam {number} quantityUsed none
 * @apiParam {number} quantityLeft none
 * @apiError (ServerError) {json} 500 
*/

productionLogRouter.post("/", async (req, res) => {
    try {
        await productionLogService.createProductionLog({...req.body});
        res.json({ message: "Created" });
    } catch (err) {
        console.error(err);
        res.json({ message: 'Server Error' });
    }
});

export default productionLogRouter;