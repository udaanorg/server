import express from 'express';
import productionLogRouter from './productionLog';
import kitchenRouter from './kitchen';
import monthlyLogRouter from './monthlyLog';

const router = express.Router();

router.use('/productionLog', productionLogRouter);
router.use('/kitchen', kitchenRouter);
router.use('/monthlyLog', monthlyLogRouter);

export default router;
