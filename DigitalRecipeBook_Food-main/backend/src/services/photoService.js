import { supabaseAdmin } from '../config/database.js';
import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Photo Upload Service - Handle image uploads to Supabase Storage
 */

const BUCKET_NAME = 'recipe-photos';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Upload photo for recipe
 * @param {Buffer} fileBuffer - File content
 * @param {string} originalFileName - Original file name
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Upload result with public URL
 */
export const uploadRecipePhoto = async (fileBuffer, originalFileName, userId) => {
  try {
    // Validation
    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error('File buffer is empty');
    }

    if (fileBuffer.length > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB`);
    }

    // Generate unique file name
    const fileExt = originalFileName.split('.').pop();
    const fileName = `${userId}/${uuidv4()}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage.from(BUCKET_NAME).upload(fileName, fileBuffer, {
      cacheControl: '3600',
      upsert: false,
      contentType: `image/${fileExt}`,
    });

    if (error) throw error;

    // Get public URL
    const { data: publicData } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(data.path);

    logger.success('Photo uploaded:', fileName);

    return {
      path: data.path,
      publicUrl: publicData.publicUrl,
    };
  } catch (error) {
    logger.error('Error uploading photo:', error.message);
    throw error;
  }
};

/**
 * Delete photo from storage
 * @param {string} photoPath - Photo path/key in storage
 * @returns {Promise<void>}
 */
export const deleteRecipePhoto = async (photoPath) => {
  try {
    if (!photoPath) return;

    const { error } = await supabaseAdmin.storage.from(BUCKET_NAME).remove([photoPath]);

    if (error) throw error;

    logger.success('Photo deleted:', photoPath);
  } catch (error) {
    logger.error('Error deleting photo:', error.message);
    throw error;
  }
};

/**
 * Get public URL for photo
 * @param {string} photoPath - Photo path in storage
 * @returns {string} Public URL
 */
export const getPhotoPublicUrl = (photoPath) => {
  if (!photoPath) return null;

  const { data } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(photoPath);
  return data.publicUrl;
};

export default {
  uploadRecipePhoto,
  deleteRecipePhoto,
  getPhotoPublicUrl,
};
