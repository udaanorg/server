import express from "express";
import kitchenService from "../services/kitchenService";

const kitchenRouter = express.Router();

/**
 * @api {get} /api/v1/kitchen/all Get all kitchens
 * @apiName Kitchen
 * @apiGroup Kitchen
 * @apiError (ServerError) {json} 500 
*/

kitchenRouter.get("/all", async (req, res) => {
    try {
        const data = await kitchenService.getAllKitchens();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.json({ message: 'Server Error' });
    }
});

/**
 * @api {get} /api/v1/kicthen/one/:id Get Kitchen by Id
 * @apiName Kitchen
 * @apiGroup Kitchen
 * @apiError (ServerError) {json} 500 
*/

kitchenRouter.get("/one/:id", async(req, res) => {
    try {
        const data = await kitchenService.getKitchenById(req.params.id);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.json({ message: 'Server Error' });
    }
});

/**
 * @api {post} /api/v1/kicthen/ Insert kicthen 
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
        await kitchenService.createKitchen({...req.body});
        res.json({ message: "Created" });
    } catch (err) {
        console.error(err);
        res.json({ message: 'Server Error' });
    }
});

export default kitchenRouter;