import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

/**
 * Authentication Routes
 */

// POST /api/auth/register - Register new user
router.post('/register', authController.register);

// POST /api/auth/login - Login user
router.post('/login', authController.login);

// GET /api/auth/me - Get current user (Protected)
router.get('/me', authMiddleware, authController.getCurrentUser);

// POST /api/auth/logout - Logout user
router.post('/logout', authMiddleware, authController.logout);

export default router;
