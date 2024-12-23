import mongoose from 'mongoose'



const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant'
    }
}, { timestamps: true })


const Category = mongoose.model('category', categorySchema)

export default Category;