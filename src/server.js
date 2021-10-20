import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import 'reflect-metadata';
import config from './config';
import { connectToDatabase } from './database';

connectToDatabase().then(() => {
    console.log('Connected to database!');
    app.listen(config.PORT, () => console.log('Server is up!'));   
}).catch((err) => {
    console.error('Database connection error!', err);
});
