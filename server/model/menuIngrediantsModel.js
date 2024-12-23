import mongoose from "mongoose";


const menuIngrediantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: String,
        enum:['IN_STOCK','OUT_OF_STOCK'],
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant'
    }
}, { timestamps: true })

const MenuIngrediant = mongoose.model('menuIngrediant', menuIngrediantSchema);

export default MenuIngrediant