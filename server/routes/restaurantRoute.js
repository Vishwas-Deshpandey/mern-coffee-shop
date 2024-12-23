import express from 'express'
import { isAuthenticated, isResturantOwner } from '../middleware/authMiddleware.js';
import { addRestaurantController, changeRestaurantStatus, getMyRestaurantController } from '../controller/restaurantController.js';
const router = express.Router();



router.get('/', isAuthenticated, isResturantOwner, getMyRestaurantController);

router.post('/add', isAuthenticated, isResturantOwner, addRestaurantController);

router.put('/change-status/:restaurantId', isAuthenticated, isResturantOwner, changeRestaurantStatus);


export default router;