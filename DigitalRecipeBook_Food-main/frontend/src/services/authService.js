import api from './api';

export const authService = {
  /**
   * Register new user
   */
  async register(email, password, firstName, lastName) {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        firstName,
        lastName,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Login user
   */
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get current user
   */
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default authService;
