import multer from 'multer';
import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from '../config/constants.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only JPEG, PNG, WebP allowed'));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

export default upload;
