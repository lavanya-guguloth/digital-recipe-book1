import express from 'express';
import authRoutes from './authRoutes.js';
import recipeRoutes from './recipeRoutes.js';
import uploadRoutes from './uploadRoutes.js';

const router = express.Router();

/**
 * Main Routes
 */

router.use('/auth', authRoutes);
router.use('/recipes', recipeRoutes);
router.use('/upload', uploadRoutes);

export default router;
