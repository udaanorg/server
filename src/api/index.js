import express from 'express';
import productionLogRouter from './productionLog';
import kitchenRouter from './kitchen';

const router = express.Router();

router.use('/productionLog', productionLogRouter);
router.use('/kitchen', kitchenRouter);

export default router;
