import express from 'express';
import multer from 'multer';
import { authMiddleware } from '../middleware/auth.js';
import { uploadRecipePhoto } from '../services/photoService.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Configure multer for file upload
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      cb(new Error('Invalid file type'));
    } else {
      cb(null, true);
    }
  },
});

/**
 * Upload Route - Handle photo uploads to Supabase Storage
 */

// POST /api/upload/photo - Upload recipe photo (Protected)
router.post('/photo', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await uploadRecipePhoto(req.file.buffer, req.file.originalname, req.user.id);

    logger.success('Photo uploaded by user:', req.user.id);
    res.json({
      message: 'Photo uploaded successfully',
      ...result,
    });
  } catch (error) {
    logger.error('Error uploading photo:', error.message);
    res.status(400).json({ error: error.message || 'Failed to upload photo' });
  }
});

export default router;
