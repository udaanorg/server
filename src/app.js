import express from 'express';
import api from './api';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', api);

export default app;
