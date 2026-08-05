import express from 'express';
import authController from './auth.controller.js';
import { loginValidation } from './auth.validation.js';
import validate from '../../middlewares/validate.middleware.js';
import { authenticateAdmin } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// Public route: Login
router.post('/login', loginValidation, validate, authController.login);

// Protected routes: Logout & Profile
router.post('/logout', authenticateAdmin, authController.logout);
router.get('/me', authenticateAdmin, authController.getMe);

export default router;
