import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['CUSTOMER', 'RESTAURANT_OWNER','ADMIN'],
        default: 'CUSTOMER'
    }
}, { timestamps: true });

const User = mongoose.model('user', userSchema);


export default User;