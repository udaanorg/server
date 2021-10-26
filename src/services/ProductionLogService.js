import { ProductionLog } from '../database';

class ProductionLogService {

    async getAllProductionLogs() {
        try {
            const allProductionLogs = await ProductionLog.find();
            return allProductionLogs;
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('Production log error!');
        }
    }

    async createProductionLog(data) {
        try {
            let newProductionLog = new ProductionLog();
            newProductionLog = Object.assign(newProductionLog, data);
            await newProductionLog.save();
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('Production log error!');
        }
    }
    
}

export default new ProductionLogService();