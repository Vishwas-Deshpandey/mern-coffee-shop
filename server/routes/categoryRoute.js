import express from 'express';
import { isAuthenticated, isResturantOwner } from '../middleware/authMiddleware.js';
import {
    createNewCategoryController,
    getAllCategoryController,
    getCategoryController,
    updateCategoryController
} from '../controller/categoryController.js';

const router = express.Router();

router.get('/all/:restaurantId', isAuthenticated, isResturantOwner, getAllCategoryController);

router.get('/get-category/:categoryId', isAuthenticated, isResturantOwner, getCategoryController);

router.post('/create', isAuthenticated, isResturantOwner, createNewCategoryController);

router.put('/update/:categoryId', isAuthenticated, isResturantOwner, updateCategoryController);


export default router;