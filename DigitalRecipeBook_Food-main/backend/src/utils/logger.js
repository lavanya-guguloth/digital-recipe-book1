/**
 * Logger utility
 */
export const logger = {
  info: (message, data) => {
    console.log(`ℹ️ [INFO]: ${message}`, data || '');
  },
  error: (message, error) => {
    console.error(`❌ [ERROR]: ${message}`, error || '');
  },
  warn: (message, data) => {
    console.warn(`⚠️ [WARN]: ${message}`, data || '');
  },
  success: (message, data) => {
    console.log(`✅ [SUCCESS]: ${message}`, data || '');
  },
};

export default logger;
