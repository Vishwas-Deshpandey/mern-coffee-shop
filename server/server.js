import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectToMongoDatabase } from './config/db.js';

import authRoute from './routes/authRoute.js'
import restaurantRoute from './routes/restaurantRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import menuIngrediantRoute from './routes/menuIngrediantsRoute.js'
import menuRotue from './routes/menuRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


// connect database
connectToMongoDatabase();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}

app.use(express.json()) // middleware to access the json data
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions))



app.get('/', (req, res) => {
    try {
        return res.status(200).json({
            message: "Welcome To Node Server"
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error"
        })
    }
})

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/restaurant', restaurantRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/menuIngrediants', menuIngrediantRoute);
app.use('/api/v1/menu', menuRotue);

app.listen(PORT, () => {
    console.log(`Running at port no ${PORT}`)
})