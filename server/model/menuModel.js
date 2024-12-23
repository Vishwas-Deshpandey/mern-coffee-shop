import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    menuImage: {
        type: String,
        required: true
    },
    stock: {
        type: Boolean,
        required: true,
        default: true
    },
    numRatings: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    menuIngrediants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menuIngrediant'
    }],
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant'
    }
}, { timestamps: true })


const Menu = mongoose.model('menu', menuSchema);

export default Menu;