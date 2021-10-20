import { createConnection } from 'typeorm';
import Kitchen from './entity/Kitchen';
import User from './entity/User';
import MonthlyLog from './entity/MonthlyLog';
import ProductionLog from './entity/ProductionLog';

export {
    createConnection as connectToDatabase,
    Kitchen,
    User,
    MonthlyLog,
    ProductionLog
}