import { Kitchen } from "../database";

class KitchenService {
    
    async getAllKitchens() {
        try {
            const allKitchens = await Kitchen.find();
            return allKitchens;
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('Kitchen error!');
        }
    }

    async getKitchenById(kitchenId) {
        try {
            let kitchen = await Kitchen.find({ id: kitchenId });
            return kitchen;
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('Kitchen error!');
        }
    }

    async createKitchen(data) {
        try {
            let newKitchen = new Kitchen();
            newKitchen = Object.assign(newKitchen, data);
            await newKitchen.save();
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('Kitchen error!');
        }
    }

}

export default new KitchenService();
