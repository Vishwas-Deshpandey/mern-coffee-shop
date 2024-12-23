import express from 'express'
import { isAuthenticated, isResturantOwner } from '../middleware/authMiddleware.js';
import { createMenuIngrediantController, getAllMenuIngrediants, getSingleMenuIngrediant, updateMenuIngrediant } from '../controller/menuIngrediantsController.js';
const router = express.Router();


router.post('/create/:restaurantId', isAuthenticated, isResturantOwner, createMenuIngrediantController);

router.get('/all/:restaurantId', isAuthenticated, isResturantOwner, getAllMenuIngrediants)

router.get('/get-ingrediant/:id', isAuthenticated, isResturantOwner, getSingleMenuIngrediant)

router.put('/update/:id', isAuthenticated, isResturantOwner, updateMenuIngrediant)

export default router;