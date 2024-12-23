import express from 'express'
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { getMyUserProfile, loginUserController, registerUserController } from '../controller/authController.js';

const router = express.Router();

router.get('/', isAuthenticated, getMyUserProfile);

router.post('/register', registerUserController);

router.post('/login', loginUserController);


export default router