# Digital Recipe Book - Backend API

A modern REST API for the Digital Recipe Book application built with Node.js, Express.js, and Supabase.

## 🎯 Project Overview

This is the backend service for the Digital Recipe Book application. It handles:
- User authentication and authorization
- Recipe CRUD operations
- Image uploads to Supabase Storage
- Meal planning and shopping lists
- Ratings and reviews
- Analytics and statistics

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.x
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + Bcrypt
- **File Storage**: Supabase Storage
- **File Uploads**: Multer
- **Validation**: Express Validator

## 📁 Project Structure

```
src/
├── controllers/        # Business logic
├── models/            # Database operations
├── routes/            # API endpoints
├── middleware/        # Custom middleware
├── config/            # Configuration files
├── utils/             # Utility functions
├── app.js             # Express app setup
└── server.js          # Server entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <backend-repo-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_KEY=your_service_key
   JWT_SECRET=your_jwt_secret
   PORT=5000
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

The API will start on `http://localhost:5000`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/logout` - Logout user

### Recipes (Coming in Sprint 1)
- `GET /api/recipes` - Get all public recipes
- `GET /api/recipes/my-recipes` - Get user's recipes (Protected)
- `GET /api/recipes/:id` - Get recipe details
- `POST /api/recipes` - Create recipe (Protected)
- `PUT /api/recipes/:id` - Update recipe (Protected)
- `DELETE /api/recipes/:id` - Delete recipe (Protected)

### Meal Planning (Coming in Sprint 2)
- `GET /api/meal-plans` - Get user's meal plans
- `POST /api/meal-plans` - Create meal plan
- `GET /api/meal-plans/:id/shopping-list` - Generate shopping list

## 🗄️ Database Schema

The database includes the following tables:

- **users** - User accounts and profiles
- **recipes** - Recipes with ingredients and instructions
- **ingredients** - Recipe ingredients
- **reviews** - User reviews and ratings
- **meal_plans** - Weekly meal plans
- **meal_plan_items** - Meals in meal plans
- **shopping_lists** - Generated shopping lists
- **shopping_list_items** - Items in shopping lists

See `database/schema.sql` for complete schema.

## 🔐 Security

- Passwords hashed with bcrypt (12 salt rounds)
- JWT-based authentication
- Protected endpoints require valid tokens
- Input validation on all endpoints
- CORS configured for frontend
- Row Level Security (RLS) in Supabase

## 📝 Environment Variables

```
SUPABASE_URL          # Supabase project URL
SUPABASE_ANON_KEY     # Supabase anonymous key
SUPABASE_SERVICE_KEY  # Supabase service role key (admin)
JWT_SECRET            # Secret key for JWT signing
JWT_EXPIRE            # JWT expiration time (default: 7d)
PORT                  # Server port (default: 5000)
NODE_ENV              # Environment (development/production)
```

## 💡 Development

### Run development server
```bash
npm run dev
```

### Lint code
```bash
npm run lint
```

### Format code
```bash
npm run format
```

## 🚀 Deployment

### Deploy to Render

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy

## 📚 Documentation

- API Documentation: See API Endpoints section above
- Database Schema: See `database/schema.sql`
- For frontend documentation, see frontend README

## 🤝 Contributing

This is a learning project. Contributions and improvements are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 👥 Author

Digital Recipe Book Team

---

**Status**: Currently in Sprint 1 - Foundation & Authentication  
**Last Updated**: February 2024

