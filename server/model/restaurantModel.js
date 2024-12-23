import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isOpen: {
        type: Boolean,
        required: true,
        default: false
    },
    restaurantRating: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });


const Restaurant = mongoose.model('restaurant', restaurantSchema);

export default Restaurant;