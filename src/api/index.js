import express from 'express';
import { userRouter } from './user';
import productionLogRouter from './productionLog';
import kitchenRouter from './kitchen';
import monthlyLogRouter from './monthlyLog';

const router = express.Router();

router.use('/user', userRouter);
router.use('/kitchen', kitchenRouter);
router.use('/productionLog', productionLogRouter);
router.use('/monthlyLog', monthlyLogRouter);

export default router;
