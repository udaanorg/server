import { Kitchen } from "../database";


class kitchenServcie {
    
    async getAllKitchens() {
        try {
            const allKitchens = await Kitchen.find();
            return allKitchens;
        } catch (err) {
            console.error(err);
        }
    }

    async getKitchenById(kitchenId) {
        try {
            let kitchen = await Kitchen.find({ id: kitchenId });
            return kitchen;
        } catch (err) {
            console.error(err);
        }
    }

    async createKitchen(data) {
        try {
            let newKitchen = new Kitchen();
            newKitchen = Object.assign(newKitchen, data);
            await newKitchen.save();
        } catch (err) {
            console.error(err);
        }
    }

}

export default new kitchenServcie();