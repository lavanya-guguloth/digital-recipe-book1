import UserModel from '../models/User.js';
import { hashPassword, comparePassword, validateEmail, validatePassword } from '../utils/validators.js';
import { generateToken } from '../middleware/auth.js';
import logger from '../utils/logger.js';

/**
 * Authentication Controller
 */
export const authController = {
  /**
   * Register new user
   */
  async register(req, res) {
    try {
      const { email, password, firstName, lastName } = req.body;

      // Validate input
      if (!email || !password || !firstName) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      if (!validatePassword(password)) {
        return res.status(400).json({
          error: 'Password must be at least 8 characters',
        });
      }

      // Check if user exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }

      // Hash password
      const passwordHash = await hashPassword(password);

      // Create user
      const user = await UserModel.create({
        email,
        password_hash: passwordHash,
        first_name: firstName,
        last_name: lastName || '',
      });

      // Generate token
      const token = generateToken({ id: user.id, email: user.email });

      logger.success('User registered:', email);
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        },
        token,
      });
    } catch (error) {
      logger.error('Registration error:', error.message);
      res.status(500).json({ error: 'Registration failed', details: error.message });
    }
  },

  /**
   * Login user
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      // Find user
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Compare passwords
      const isMatch = await comparePassword(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = generateToken({ id: user.id, email: user.email });

      logger.success('User logged in:', email);
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          avatarUrl: user.avatar_url,
        },
        token,
      });
    } catch (error) {
      logger.error('Login error:', error.message);
      res.status(500).json({ error: 'Login failed', details: error.message });
    }
  },

  /**
   * Get current user
   */
  async getCurrentUser(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({
        message: 'User fetched successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          avatarUrl: user.avatar_url,
          bio: user.bio,
        },
      });
    } catch (error) {
      logger.error('Get user error:', error.message);
      res.status(500).json({ error: 'Failed to fetch user', details: error.message });
    }
  },

  /**
   * Logout user (handled on frontend by removing token)
   */
  async logout(req, res) {
    try {
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      logger.error('Logout error:', error.message);
      res.status(500).json({ error: 'Logout failed' });
    }
  },
};

export default authController;
