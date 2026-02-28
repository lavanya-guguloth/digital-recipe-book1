import api from './api';

export const recipeService = {
  /**
   * Get all recipes
   */
  async getAllRecipes(page = 1, limit = 10) {
    try {
      const response = await api.get('/recipes', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get user's recipes
   */
  async getMyRecipes(page = 1, limit = 10) {
    try {
      const response = await api.get('/recipes/my-recipes', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get single recipe
   */
  async getRecipeById(id) {
    try {
      const response = await api.get(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create recipe
   */
  async createRecipe(recipeData) {
    try {
      const response = await api.post('/recipes', recipeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default recipeService;
