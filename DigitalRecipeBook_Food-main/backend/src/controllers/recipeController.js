import RecipeModel from '../models/Recipe.js';
import logger from '../utils/logger.js';
import { supabaseAdmin } from '../config/database.js';

/**
 * Recipe Controller - Handles recipe API endpoints
 */

// GET /api/recipes - Get all public recipes with pagination and search
export const getAllRecipes = async (req, res) => {
  try {
    const { page = 1, limit = 12, search = '', category = '' } = req.query;

    let query = supabaseAdmin
      .from('recipes')
      .select('*, users(id, first_name, last_name, avatar_url), ingredients(*), reviews(rating)', { count: 'exact' })
      .eq('is_public', true);

    // Apply search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply category filter
    if (category) {
      query = query.eq('category', category);
    }

    // Pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1).order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) throw error;

    // Calculate average ratings
    const recipesWithRatings = data.map((recipe) => ({
      ...recipe,
      averageRating:
        recipe.reviews.length > 0
          ? (recipe.reviews.reduce((sum, r) => sum + r.rating, 0) / recipe.reviews.length).toFixed(1)
          : 0,
      reviewCount: recipe.reviews.length,
    }));

    res.json({
      data: recipesWithRatings,
      count,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    logger.error('Error fetching recipes:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

// GET /api/recipes/user/:userId - Get user's recipes
export const getUserRecipes = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const offset = (page - 1) * limit;
    const { data, error, count } = await supabaseAdmin
      .from('recipes')
      .select('*, ingredients(*), reviews(rating)', { count: 'exact' })
      .eq('user_id', userId)
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const recipesWithRatings = data.map((recipe) => ({
      ...recipe,
      averageRating:
        recipe.reviews.length > 0
          ? (recipe.reviews.reduce((sum, r) => sum + r.rating, 0) / recipe.reviews.length).toFixed(1)
          : 0,
      reviewCount: recipe.reviews.length,
    }));

    res.json({
      data: recipesWithRatings,
      count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    logger.error('Error fetching user recipes:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

// GET /api/recipes/:id - Get single recipe with details
export const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await RecipeModel.getById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Get reviews with user info
    const { data: reviews } = await supabaseAdmin
      .from('reviews')
      .select('*, users(id, first_name, last_name, avatar_url)')
      .eq('recipe_id', id)
      .order('created_at', { ascending: false });

    const averageRating =
      reviews && reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    res.json({
      ...recipe,
      reviews: reviews || [],
      averageRating,
      totalReviews: reviews ? reviews.length : 0,
    });
  } catch (error) {
    logger.error('Error fetching recipe detail:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
};

// POST /api/recipes - Create new recipe (Protected)
export const createRecipe = async (req, res) => {
  try {
    const { title, description, servings, prepTime, cookTime, difficulty, category, ingredients, photoUrl, isPublic } = req.body;
    const userId = req.user.id;

    // Validation
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'At least one ingredient is required' });
    }

    // Create recipe
    const recipeData = {
      user_id: userId,
      title,
      description,
      servings: parseInt(servings) || 4,
      prep_time: parseInt(prepTime) || 15,
      cook_time: parseInt(cookTime) || 30,
      difficulty: difficulty || 'medium',
      category: category || 'other',
      photo_url: photoUrl || null,
      is_public: isPublic === true,
      created_at: new Date().toISOString(),
    };

    const recipe = await RecipeModel.create(recipeData);

    // Create ingredients
    if (ingredients.length > 0) {
      const ingredientData = ingredients.map((ing) => ({
        recipe_id: recipe.id,
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit || '',
      }));

      await supabaseAdmin.from('ingredients').insert(ingredientData);
    }

    // Fetch complete recipe with ingredients
    const completeRecipe = await RecipeModel.getById(recipe.id);

    logger.success('Recipe created:', recipe.id);
    res.status(201).json(completeRecipe);
  } catch (error) {
    logger.error('Error creating recipe:', error.message);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
};

// PUT /api/recipes/:id - Update recipe (Protected)
export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, servings, prepTime, cookTime, difficulty, category, ingredients, photoUrl, isPublic } = req.body;

    // Check ownership
    const recipe = await RecipeModel.getById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (recipe.user_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this recipe' });
    }

    // Update recipe
    const updates = {
      title: title || recipe.title,
      description: description || recipe.description,
      servings: servings ? parseInt(servings) : recipe.servings,
      prep_time: prepTime ? parseInt(prepTime) : recipe.prep_time,
      cook_time: cookTime ? parseInt(cookTime) : recipe.cook_time,
      difficulty: difficulty || recipe.difficulty,
      category: category || recipe.category,
      photo_url: photoUrl !== undefined ? photoUrl : recipe.photo_url,
      is_public: isPublic !== undefined ? isPublic : recipe.is_public,
    };

    const updatedRecipe = await RecipeModel.update(id, updates);

    // Update ingredients if provided
    if (ingredients && Array.isArray(ingredients) && ingredients.length > 0) {
      // Delete old ingredients
      await supabaseAdmin.from('ingredients').delete().eq('recipe_id', id);

      // Insert new ingredients
      const ingredientData = ingredients.map((ing) => ({
        recipe_id: id,
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit || '',
      }));

      await supabaseAdmin.from('ingredients').insert(ingredientData);
    }

    const completeRecipe = await RecipeModel.getById(id);
    logger.success('Recipe updated:', id);
    res.json(completeRecipe);
  } catch (error) {
    logger.error('Error updating recipe:', error.message);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
};

// DELETE /api/recipes/:id - Delete recipe (Protected)
export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check ownership
    const recipe = await RecipeModel.getById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (recipe.user_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this recipe' });
    }

    // Delete ingredients
    await supabaseAdmin.from('ingredients').delete().eq('recipe_id', id);

    // Delete reviews
    await supabaseAdmin.from('reviews').delete().eq('recipe_id', id);

    // Delete recipe
    await RecipeModel.delete(id);

    logger.success('Recipe deleted:', id);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    logger.error('Error deleting recipe:', error.message);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
};

// POST /api/recipes/:id/reviews - Add review/rating (Protected)
export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { rating, comment } = req.body;

    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Check recipe exists
    const recipe = await RecipeModel.getById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Create review
    const { data: review, error } = await supabaseAdmin
      .from('reviews')
      .insert([
        {
          recipe_id: id,
          user_id: userId,
          rating: parseInt(rating),
          comment: comment || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    logger.success('Review added:', review.id);
    res.status(201).json(review);
  } catch (error) {
    logger.error('Error adding review:', error.message);
    res.status(500).json({ error: 'Failed to add review' });
  }
};

// GET /api/recipes/:id/reviews - Get all reviews for recipe
export const getRecipeReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;
    const { data: reviews, error, count } = await supabaseAdmin
      .from('reviews')
      .select('*, users(id, first_name, last_name, avatar_url)', { count: 'exact' })
      .eq('recipe_id', id)
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      data: reviews,
      count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    logger.error('Error fetching reviews:', error.message);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};
