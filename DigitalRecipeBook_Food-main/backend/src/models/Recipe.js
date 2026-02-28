import { supabase } from '../config/database.js';
import logger from '../utils/logger.js';

/**
 * Recipe Model - Database operations for recipes
 */
export const RecipeModel = {
  /**
   * Create new recipe
   * @param {Object} recipeData - Recipe data
   * @returns {Promise<Object>} Created recipe
   */
  async create(recipeData) {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .insert([recipeData])
        .select()
        .single();

      if (error) throw error;
      logger.success('Recipe created:', data.id);
      return data;
    } catch (error) {
      logger.error('Error creating recipe:', error.message);
      throw error;
    }
  },

  /**
   * Get all recipes (with pagination)
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Recipes and count
   */
  async getAll(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      const { data, count } = await supabase
        .from('recipes')
        .select('*, users(first_name, last_name, avatar_url)', { count: 'exact' })
        .eq('is_public', true)
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

      return { data, count };
    } catch (error) {
      logger.error('Error fetching recipes:', error.message);
      throw error;
    }
  },

  /**
   * Get recipe by ID
   * @param {string} id - Recipe ID
   * @returns {Promise<Object>} Recipe data
   */
  async getById(id) {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*, users(first_name, last_name, avatar_url), ingredients(*), reviews(*)')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error('Error fetching recipe:', error.message);
      throw error;
    }
  },

  /**
   * Update recipe
   * @param {string} id - Recipe ID
   * @param {Object} updates - Data to update
   * @returns {Promise<Object>} Updated recipe
   */
  async update(id, updates) {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      logger.success('Recipe updated:', id);
      return data;
    } catch (error) {
      logger.error('Error updating recipe:', error.message);
      throw error;
    }
  },

  /**
   * Delete recipe
   * @param {string} id - Recipe ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      logger.success('Recipe deleted:', id);
    } catch (error) {
      logger.error('Error deleting recipe:', error.message);
      throw error;
    }
  },
};

export default RecipeModel;
