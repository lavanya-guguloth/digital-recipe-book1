import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  getAllRecipes,
  getUserRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  addReview,
  getRecipeReviews,
} from '../controllers/recipeController.js';

const router = express.Router();

/**
 * Recipe Routes
 */

// Protected routes (require authentication) - Define BEFORE parameterized routes
router.post('/', authMiddleware, createRecipe); // Create new recipe

// Public routes - More specific routes BEFORE generic ones
router.get('/user/:userId', getUserRecipes); // Get user's recipes (must be before /:id)
router.get('/:id/reviews', getRecipeReviews); // Get reviews for a recipe
router.get('/', getAllRecipes); // Get all recipes with search & pagination
router.get('/:id', getRecipeById); // Get single recipe with details

// Protected routes for updates
router.put('/:id', authMiddleware, updateRecipe); // Update recipe
router.delete('/:id', authMiddleware, deleteRecipe); // Delete recipe
router.post('/:id/reviews', authMiddleware, addReview); // Add review to recipe

export default router;
