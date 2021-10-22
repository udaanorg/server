import { ProductionLog } from '../database';

class ProductionLogService {

    async getAllProductionLogs() {
        try {
            const allProductionLogs = await ProductionLog.find();
            return allProductionLogs;
        } catch (err) {
            console.error(err);
        }
    }

    async createProductionLog(data) {
        try {
            let newProductionLog = new ProductionLog();
            newProductionLog = Object.assign(newProductionLog, data);
            await newProductionLog.save();
        } catch (err) {
            console.error(err);
        }
    }
    
}

export default new ProductionLogService();