import express from 'express';
import { isAuthenticated, isResturantOwner } from '../middleware/authMiddleware.js';
import { createNewMenuController } from '../controller/menuController.js';
import { upload } from '../config/multerConfig.js';

const route = express.Router();


route.post('/create', isAuthenticated, isResturantOwner, upload.single('menuImage'), createNewMenuController)


export default route;