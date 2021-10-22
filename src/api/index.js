import express from 'express';
import { userRouter } from './user';
import monthlyLogRouter from './monthlyLog';

const router = express.Router();

router.use('/user', userRouter);
router.use('/monthlyLog', monthlyLogRouter);
export default router;
