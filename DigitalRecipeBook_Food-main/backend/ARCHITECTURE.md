# Backend Architecture

## Project Structure

```
backend/
├── src/
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   ├── config/             # Configuration files
│   │   ├── constants.js    # Application constants
│   │   ├── database.js     # Supabase client setup
│   │   └── environment.js  # Environment variables
│   ├── controllers/        # Request handlers
│   │   ├── authController.js
│   │   └── recipeController.js
│   ├── middleware/         # Express middleware
│   │   ├── auth.js         # JWT authentication
│   │   ├── errorHandler.js # Error handling
│   │   └── upload.js       # File upload handling
│   ├── models/             # Data models
│   │   ├── Recipe.js
│   │   └── User.js
│   ├── routes/             # API route definitions
│   │   ├── authRoutes.js
│   │   ├── recipeRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── index.js
│   ├── services/           # Business logic
│   │   └── photoService.js
│   ├── scripts/            # Utility scripts
│   │   ├── migrateDatabase.js
│   │   └── addSampleRecipes.js
│   └── utils/              # Helper utilities
│       ├── logger.js       # Logging utility
│       └── validators.js   # Input validation

```

## Key Components

### Authentication Flow
1. User registers/logs in via `/api/auth/register` or `/api/auth/login`
2. JWT token is issued and stored in localStorage
3. Protected routes require JWT in `Authorization` header
4. Token is verified by `auth.js` middleware

### Recipe Management
- Users can create, read, update, delete recipes
- Recipes support ingredients and attachments
- Public recipes are searchable and filterable
- Rating/review system for community engagement

### Database
- Supabase PostgreSQL with Row-Level Security (RLS)
- Tables: users, recipes, ingredients, reviews
- Automatic timestamps for audit trail

## Error Handling
- Centralized error handling middleware in `app.js`
- Logger utility for consistent logging
- Proper HTTP status codes returned

## Running the Backend

```bash
# Development
npm run dev

# Production
npm start

# Linting
npm run lint

# Formatting
npm run format
```

## Environment Variables
See `.env` file configuration in `config/environment.js`
