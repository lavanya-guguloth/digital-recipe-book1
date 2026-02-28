export const RECIPE_CATEGORIES = [
  'appetizers',
  'main courses',
  'side dishes',
  'desserts',
  'beverages',
  'soups',
  'salads',
  'breads',
  'breakfast',
  'snacks',
];

export const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'];

export const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'];

export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE || '7d';
