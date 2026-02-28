import app from './app.js';
import dotenv from 'dotenv';
import logger from './utils/logger.js';

dotenv.config();

const PORT = process.env.NODE_ENV === 'production'
  ? process.env.PORT
  : process.env.LOCAL_PORT || process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.success(`Server is running on http://localhost:${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
});
