import { supabase, supabaseAdmin } from '../config/database.js';
import logger from '../utils/logger.js';

/**
 * User Model - Database operations for users
 */
export const UserModel = {
  /**
   * Create new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user
   */
  async create(userData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert([userData])
        .select()
        .single();

      if (error) throw error;
      logger.success('User created:', data.id);
      return data;
    } catch (error) {
      logger.error('Error creating user:', error.message);
      throw error;
    }
  },

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Promise<Object>} User data
   */
  async findByEmail(email) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      logger.error('Error finding user by email:', error.message);
      throw error;
    }
  },

  /**
   * Find user by ID
   * @param {string} id - User ID
   * @returns {Promise<Object>} User data
   */
  async findById(id) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error('Error finding user by ID:', error.message);
      throw error;
    }
  },

  /**
   * Update user
   * @param {string} id - User ID
   * @param {Object} updates - Data to update
   * @returns {Promise<Object>} Updated user
   */
  async update(id, updates) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      logger.success('User updated:', id);
      return data;
    } catch (error) {
      logger.error('Error updating user:', error.message);
      throw error;
    }
  },
};

export default UserModel;
