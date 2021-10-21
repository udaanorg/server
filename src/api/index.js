import express from 'express';
import monthlyLogRouter from './monthlyLog';

const router = express.Router();

router.use('/monthlyLog', monthlyLogRouter);
export default router;
