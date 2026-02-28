# Digital Recipe Book - Full Stack Application Architecture Plan

## 📋 Executive Summary
A modern, scalable full-stack digital recipe book application enabling users to create, organize, share, and discover recipes with advanced features like meal planning, analytics, and AI-powered suggestions.

---

## 🏗️ Project Structure Overview

```
DigitalRecipeBook_Food/
├── frontend/                    # React + Tailwind CSS + ShadCN UI
│   ├── src/
│   ├── public/
│   ├── README.md
│   └── package.json
│
├── backend/                     # Node.js + Express
│   ├── src/
│   ├── README.md
│   └── package.json
│
└── PROJECT_ARCHITECTURE_PLAN.md (This file)
```

---

## 🎯 Technology Stack

### Frontend
- **Framework**: React 18+
- **Styling**: Tailwind CSS
- **Component Library**: ShadCN UI
- **HTTP Client**: Axios
- **State Management**: Context API + useReducer
- **Deployment**: Netlify
- **Additional**: React Router v6, React Query (optional for data caching)

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + Supabase Auth
- **File Storage**: Supabase Storage for images
- **Deployment**: Render
- **Additional**: dotenv, bcrypt, cors, multer

### Database
- **Platform**: Supabase (PostgreSQL)
- **ORM**: Node-postgres (node-pg) or Prisma (optional)
- **Hosting**: Cloud-based (Supabase)

---

## 📁 Frontend Folder Structure

```
frontend/
├── src/
│   ├── components/              # Reusable components
│   │   ├── common/             # Common UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── recipe/             # Recipe-specific components
│   │   │   ├── RecipeCard.jsx
│   │   │   ├── RecipeForm.jsx
│   │   │   ├── RecipeDetails.jsx
│   │   │   └── RecipeList.jsx
│   │   ├── meal-plan/          # Meal planning components
│   │   │   ├── MealPlanCalendar.jsx
│   │   │   ├── ShoppingList.jsx
│   │   │   └── SelectRecipe.jsx
│   │   ├── auth/               # Auth components
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── dashboard/          # Dashboard components
│   │       ├── Analytics.jsx
│   │       ├── UserStats.jsx
│   │       └── PopularRecipes.jsx
│   │
│   ├── pages/                  # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MyRecipes.jsx
│   │   ├── RecipeDetail.jsx
│   │   ├── CreateRecipe.jsx
│   │   ├── MealPlanning.jsx
│   │   ├── SharedRecipes.jsx
│   │   └── NotFound.jsx
│   │
│   ├── context/                # Context API state management
│   │   ├── AuthContext.jsx
│   │   ├── RecipeContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── MealPlanContext.jsx
│   │
│   ├── services/               # API services
│   │   ├── api.js             # Axios instance
│   │   ├── authService.js
│   │   ├── recipeService.js
│   │   ├── mealPlanService.js
│   │   └── uploadService.js
│   │
│   ├── hooks/                  # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useRecipes.js
│   │   ├── useLocalStorage.js
│   │   └── useMealPlan.js
│   │
│   ├── utils/                  # Utility functions
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validation.js
│   │
│   ├── App.jsx                 # Main app component
│   ├── index.css              # Global styles
│   └── main.jsx               # Entry point
│
├── public/                     # Static files
├── .env.example               # Environment variables template
├── .gitignore
├── package.json
├── tailwind.config.js
├── README.md
└── vite.config.js
```

---

## 📁 Backend Folder Structure

```
backend/
├── src/
│   ├── controllers/            # Business logic
│   │   ├── authController.js
│   │   ├── recipeController.js
│   │   ├── userController.js
│   │   ├── mealPlanController.js
│   │   ├── reviewController.js
│   │   └── imageController.js
│   │
│   ├── routes/                 # API endpoints
│   │   ├── authRoutes.js
│   │   ├── recipeRoutes.js
│   │   ├── userRoutes.js
│   │   ├── mealPlanRoutes.js
│   │   └── index.js
│   │
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js            # JWT verification
│   │   ├── errorHandler.js
│   │   ├── validation.js
│   │   └── upload.js
│   │
│   ├── models/                 # Database models/queries
│   │   ├── User.js
│   │   ├── Recipe.js
│   │   ├── MealPlan.js
│   │   ├── Review.js
│   │   └── Ingredient.js
│   │
│   ├── config/                 # Configuration files
│   │   ├── database.js        # Supabase connection
│   │   ├── environment.js
│   │   └── constants.js
│   │
│   ├── utils/                  # Utility functions
│   │   ├── logger.js
│   │   ├── emailService.js
│   │   ├── validators.js
│   │   └── helpers.js
│   │
│   ├── app.js                  # Express app setup
│   └── server.js               # Server entry point
│
├── .env.example               # Environment variables template
├── .gitignore
├── package.json
├── README.md
└── docker-compose.yml (optional)
```

---

## 🗄️ Database Schema (Supabase PostgreSQL)

### Tables & Relationships

#### 1. **users** table
```sql
id (UUID, Primary Key)
email (VARCHAR, Unique)
password_hash (VARCHAR)
first_name (VARCHAR)
last_name (VARCHAR)
avatar_url (VARCHAR, nullable)
bio (TEXT, nullable)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

#### 2. **recipes** table
```sql
id (UUID, Primary Key)
user_id (UUID, Foreign Key → users.id)
title (VARCHAR)
description (TEXT)
instructions (TEXT)
cook_time_minutes (INTEGER)
prep_time_minutes (INTEGER)
servings (INTEGER)
difficulty_level (ENUM: easy, medium, hard)
category (VARCHAR)
image_url (VARCHAR, nullable)
is_public (BOOLEAN)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

#### 3. **ingredients** table
```sql
id (UUID, Primary Key)
recipe_id (UUID, Foreign Key → recipes.id)
name (VARCHAR)
quantity (DECIMAL)
unit (VARCHAR)
created_at (TIMESTAMP)
```

#### 4. **reviews** table
```sql
id (UUID, Primary Key)
recipe_id (UUID, Foreign Key → recipes.id)
user_id (UUID, Foreign Key → users.id)
rating (INTEGER, 1-5)
comment (TEXT, nullable)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

#### 5. **meal_plans** table
```sql
id (UUID, Primary Key)
user_id (UUID, Foreign Key → users.id)
week_start_date (DATE)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

#### 6. **meal_plan_items** table
```sql
id (UUID, Primary Key)
meal_plan_id (UUID, Foreign Key → meal_plans.id)
recipe_id (UUID, Foreign Key → recipes.id)
day_of_week (INTEGER, 0-6)
meal_type (ENUM: breakfast, lunch, dinner, snack)
created_at (TIMESTAMP)
```

#### 7. **shopping_lists** table
```sql
id (UUID, Primary Key)
user_id (UUID, Foreign Key → users.id)
meal_plan_id (UUID, Foreign Key → meal_plans.id)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

#### 8. **shopping_list_items** table
```sql
id (UUID, Primary Key)
shopping_list_id (UUID, Foreign Key → shopping_lists.id)
ingredient_name (VARCHAR)
quantity (DECIMAL)
unit (VARCHAR)
category (VARCHAR)
is_checked (BOOLEAN)
created_at (TIMESTAMP)
```

---

## 🔌 Backend API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/refresh` - Refresh JWT token

### Recipes
- `GET /api/recipes` - Get all public recipes
- `GET /api/recipes/my-recipes` - Get user's recipes (Protected)
- `GET /api/recipes/:id` - Get recipe details
- `POST /api/recipes` - Create recipe (Protected)
- `PUT /api/recipes/:id` - Update recipe (Protected)
- `DELETE /api/recipes/:id` - Delete recipe (Protected)
- `GET /api/recipes/search` - Search recipes by ingredient/category
- `POST /api/recipes/:id/share` - Share recipe link

### Reviews & Ratings
- `GET /api/recipes/:id/reviews` - Get recipe reviews
- `POST /api/recipes/:id/reviews` - Post review (Protected)
- `PUT /api/recipes/:id/reviews/:reviewId` - Update review (Protected)
- `DELETE /api/recipes/:id/reviews/:reviewId` - Delete review (Protected)

### Meal Planning
- `GET /api/meal-plans` - Get user's meal plans (Protected)
- `POST /api/meal-plans` - Create meal plan (Protected)
- `POST /api/meal-plans/:id/add-recipe` - Add recipe to meal plan (Protected)
- `DELETE /api/meal-plans/:id/recipes/:recipeId` - Remove recipe (Protected)
- `GET /api/meal-plans/:id/shopping-list` - Generate shopping list (Protected)

### User Dashboard
- `GET /api/users/dashboard/stats` - Get user analytics (Protected)
- `GET /api/users/dashboard/popular-recipes` - Get popular recipes
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update profile (Protected)

### Image Upload
- `POST /api/upload/recipe-image` - Upload recipe image (Protected)
- `POST /api/upload/avatar` - Upload avatar (Protected)

---

## 🎨 Key Features Implementation Priority

### Phase 1: MVP (Weeks 1-2)
✅ User Authentication (Login/Register)
✅ Recipe CRUD (Create, Read, Update, Delete)
✅ Recipe Categories
✅ Photo Upload
✅ Dashboard with basic stats

### Phase 2: Enhanced Features (Weeks 3-4)
✅ Ingredient Search
✅ Ratings & Reviews
✅ Recipe Sharing
✅ Meal Planning Feature
✅ Shopping List Generation

### Phase 3: Advanced Features (Week 5+)
✅ Cooking Timer
✅ Autosave Feature
✅ Dark Mode
✅ Export Recipe as PDF
✅ AI Recipe Suggestions (Optional Bonus)

---

## 🔐 Security & Best Practices

1. **Authentication**: JWT-based authentication with refresh tokens
2. **Password**: Bcrypt hashing (salt rounds: 12)
3. **CORS**: Configure proper CORS headers
4. **Input Validation**: Server-side validation for all inputs
5. **SQL Injection Prevention**: Use parameterized queries
6. **Rate Limiting**: Implement API rate limiting
7. **HTTPS Only**: Enforce HTTPS in production
8. **Environment Variables**: Store secrets in .env files
9. **Error Handling**: Proper error responses with appropriate HTTP status codes

---

## 📦 Dependencies Overview

### Frontend (package.json)
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "tailwindcss": "^3.x",
    "@shadcn/ui": "latest",
    "lucide-react": "^latest"
  },
  "devDependencies": {
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x"
  }
}
```

### Backend (package.json)
```json
{
  "dependencies": {
    "express": "^4.x",
    "dotenv": "^16.x",
    "cors": "^2.x",
    "@supabase/supabase-js": "^2.x",
    "bcrypt": "^5.x",
    "jsonwebtoken": "^9.x",
    "multer": "^1.x",
    "express-validator": "^7.x"
  },
  "devDependencies": {
    "nodemon": "^3.x"
  }
}
```

---

## 🚀 Deployment Strategy

### Frontend Deployment (Netlify)
- Connect GitHub repository
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables: Supabase URL, API endpoint

### Backend Deployment (Render)
- Connect GitHub repository
- Build command: `npm install`
- Start command: `npm start`
- Environment variables: Database URL, JWT secret, etc.
- Free tier or paid based on traffic

---

## 📖 Documentation Requirements

### Frontend README includes:
✅ Project description
✅ Features list
✅ Tech stack
✅ Installation steps
✅ Deployment link
✅ Backend API link
✅ Screenshots
✅ Video walkthrough

### Backend README includes:
✅ Project overview
✅ Tech stack
✅ API documentation
✅ Database schema
✅ Installation steps
✅ Deployment link

---

## 🔄 Development Workflow (Agile)

### Sprint Structure (2-week sprints)

**Sprint 1: Foundation & Authentication**
- Setup project repositories
- Database schema creation
- Authentication system
- Basic UI components

**Sprint 2: Core Features**
- Recipe CRUD operations
- Image upload functionality
- Recipe categories
- Dashboard basic view

**Sprint 3: Advanced Features**
- Meal planning
- Shopping list generation
- Reviews & ratings
- Search functionality

**Sprint 4: Polish & Optimization**
- Dark mode
- Responsive design
- Performance optimization
- Bug fixes

**Sprint 5: Deployment & Documentation**
- Deployment setup
- Comprehensive documentation
- Final testing
- Video walkthrough

---

## ✅ Approval Checklist

Before proceeding, please confirm:

- [ ] Technology stack approved
- [ ] Folder structure appropriate
- [ ] Database schema understood
- [ ] Deployment plan acceptable
- [ ] Feature prioritization agreed upon
- [ ] Budget/No costs approval (using free tier services)
- [ ] Timeline acceptable

---

## 📝 Notes

- **No External Purchases Required**: All services free tier or open-source
- **Scalability**: Architecture supports future enhancements
- **Code Quality**: Follow ESLint & Prettier for consistent formatting
- **Version Control**: Git flow workflow
- **Testing**: Unit tests recommended for critical functions

---

**Next Steps Upon Approval:**
1. Initialize both repositories (frontend & backend)
2. Setup project scaffolding
3. Create environment configuration files
4. Begin Phase 1 implementation

