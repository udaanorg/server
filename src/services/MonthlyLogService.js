import { MonthlyLog } from '../database';

class MonthlyLogService {

    /**
     * Get all monthly logs from the database
     * @returns An array of logs
     */
    async getAllLogs() {

        try {
            const listFromDB = await MonthlyLog.find();
            return listFromDB;
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('Monthly log error!');
        }
    }

    /**
     * Insert log into the database
     * @param data properties: {kitchen, materialName, quantityBought, quantityLeft}
     */
    async insertLog(data) {

        try {

            let instance = new MonthlyLog();
            instance = Object.assign(instance, data);
            await instance.save();
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('Monthly log error!');
        }
    }
}

// We use Node.js module caching to implement Singleton pattern.
export default new MonthlyLogService();
