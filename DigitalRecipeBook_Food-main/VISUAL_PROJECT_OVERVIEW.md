# Digital Recipe Book - Visual Project Overview

## 🎯 Project Vision

A modern digital recipe book app that helps users organize, share, and discover recipes while building a community around cooking.

---

## 📐 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER BROWSER / DEVICE                        │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │   FRONTEND   │  (React + Tailwind + ShadCN)
                    │   Netlify    │  https://app.netlify.com
                    └──────┬───────┘
                           │
                    HTTP/REST API
                  (JWT Authentication)
                           │
        ┌──────────────────▼───────────────────┐
        │       BACKEND (Express.js)            │
        │  Render: https://api.render.com       │
        │                                       │
        │  ├── API Routes (REST)               │
        │  ├── JWT Middleware                  │
        │  ├── Business Logic                  │
        │  ├── File Upload Handler             │
        │  └── Error Handling                  │
        └──────────────────┬───────────────────┘
                           │
        ┌──────────────────┴─────────────────────────┐
        │                                            │
        ▼                                            ▼
    ┌─────────────────┐              ┌──────────────────────┐
    │  DATABASE       │              │  FILE STORAGE        │
    │  (Supabase)     │              │  (Supabase Storage)  │
    │  PostgreSQL     │              │  Recipe Images       │
    │                 │              │  User Avatars        │
    │  Users          │              │  Attachments         │
    │  Recipes        │              └──────────────────────┘
    │  Ingredients    │
    │  Reviews        │
    │  Meal Plans     │
    │  Shopping Lists │
    └─────────────────┘
```

---

## 📊 Data Flow Diagram

### User Registration/Login Flow
```
1. User enters email & password
           ▼
2. Frontend validates input
           ▼
3. Axios sends to API (POST /auth/register)
           ▼
4. Backend validates input again
           ▼
5. Password hashed with bcrypt
           ▼
6. New user created in database
           ▼
7. JWT token generated
           ▼
8. Token sent back to frontend
           ▼
9. Token stored in localStorage
           ▼
10. Token sent with every API request
           ▼
11. Middleware verifies token
           ▼
12. Request processed and response sent
```

### Recipe Creation Flow
```
1. User fills recipe form
           ▼
2. Frontend validation
           ▼
3. User selects image file
           ▼
4. FormData created (text + image)
           ▼
5. POST /api/recipes with JWT token
           ▼
6. Backend verifies JWT (confirms user)
           ▼
7. Server validates recipe data
           ▼
8. Image uploaded to Supabase Storage
           ▼
9. Image URL received
           ▼
10. Recipe saved to database with image URL
           ▼
11. Success response sent to frontend
           ▼
12. Toast notification shown
           ▼
13. Redirect to recipe detail page
```

---

## 🏗️ Frontend Component Hierarchy

```
App.jsx
├── <AuthContext.Provider>
├── <RecipeContext.Provider>
├── <ThemeContext.Provider>
│   │
│   └── <ProtectedRoute>
│       └── Layout
│           ├── <Navbar />
│           ├── <Sidebar />
│           ├── Main Content
│           │   └── <Routes>
│           │       ├── <Home />
│           │       ├── <Login />
│           │       ├── <Register />
│           │       ├── <Dashboard />
│           │       │   └── <Analytics />
│           │       ├── <MyRecipes />
│           │       │   └── <RecipeList>
│           │       │       └── <RecipeCard /> (multiple)
│           │       ├── <RecipeDetail />
│           │       │   ├── <RecipeReviews />
│           │       │   └── <RatingSubmission />
│           │       ├── <CreateRecipe />
│           │       │   └── <RecipeForm />
│           │       ├── <EditRecipe />
│           │       │   └── <RecipeForm />
│           │       ├── <MealPlanning />
│           │       │   ├── <MealCalendar />
│           │       │   └── <ShoppingList />
│           │       └── <SharedRecipes />
│           │
│           └── <Footer />
│
├── <Toast Container />
└── <Modal Portal />
```

---

## 🔌 Backend Route Structure

```
/api
├── /auth
│   ├── POST   /register
│   ├── POST   /login
│   ├── POST   /logout
│   ├── GET    /me                    (Protected)
│   └── POST   /refresh
│
├── /recipes
│   ├── GET    /                      (public recipes)
│   ├── GET    /my-recipes            (Protected)
│   ├── GET    /:id                   (get one)
│   ├── POST   /                      (Protected)
│   ├── PUT    /:id                   (Protected)
│   ├── DELETE /:id                   (Protected)
│   ├── GET    /search?ingredient=x
│   ├── POST   /:id/share             (Protected)
│   │
│   └── /reviews
│       ├── GET    /:recipeId/reviews
│       ├── POST   /:recipeId/reviews (Protected)
│       ├── PUT    /:recipeId/reviews/:id (Protected)
│       └── DELETE /:recipeId/reviews/:id (Protected)
│
├── /meal-plans
│   ├── GET    /                      (Protected)
│   ├── POST   /                      (Protected)
│   ├── POST   /:id/add-recipe        (Protected)
│   ├── DELETE /:id/recipes/:recipeId (Protected)
│   └── GET    /:id/shopping-list     (Protected)
│
├── /users
│   ├── GET    /dashboard/stats       (Protected)
│   ├── GET    /dashboard/popular-recipes
│   ├── GET    /profile               (Protected)
│   └── PUT    /profile               (Protected)
│
└── /upload
    ├── POST   /recipe-image          (Protected)
    └── POST   /avatar                (Protected)
```

---

## 📱 UI Screens / Pages Map

```
PAGES:

┌─────────────────────────┐
│   LANDING / HOME        │─────► Limited features for guests
└────────────┬────────────┘
             │
             ├──► LOGIN / REGISTER (no account)
             │
             ▼
    ┌─────────────────────────┐
    │   AUTHENTICATED AREA     │
    └────────┬────────────────┘
             │
             ├──► DASHBOARD
             │    ├─ User stats
             │    ├─ Recent recipes
             │    ├─ Quick actions
             │    └─ Analytics charts
             │
             ├──► MY RECIPES
             │    ├─ List all user's recipes
             │    ├─ Filter by category
             │    ├─ Search recipes
             │    └─ Create new recipe button
             │
             ├──► CREATE / EDIT RECIPE
             │    ├─ Recipe form
             │    ├─ Image upload
             │    ├─ Save draft (autosave)
             │    └─ Submit / Update
             │
             ├──► RECIPE DETAIL
             │    ├─ Full recipe view
             │    ├─ Image display
             │    ├─ Ingredients list
             │    ├─ Cooking instructions
             │    ├─ Reviews & ratings
             │    ├─ Edit / Delete buttons
             │    ├─ Share recipe link
             │    └─ Start cooking timer
             │
             ├──► MEAL PLANNING
             │    ├─ Weekly calendar view
             │    ├─ Add recipes to days
             │    ├─ Remove recipes
             │    ├─ Generate shopping list
             │    └─ View/print shopping list
             │
             ├──► EXPLORE / SHARED RECIPES
             │    ├─ Browse public recipes
             │    ├─ Search & filter
             │    ├─ View recipes by others
             │    ├─ Rate & review
             │    └─ Save to collection
             │
             └──► USER PROFILE
                  ├─ Edit profile info
                  ├─ Upload avatar
                  ├─ Settings
                  ├─ Dark mode toggle
                  ├─ Logout
                  └─ Export recipes (PDF)
```

---

## 🗄️ Database Entity Relationship

```
users (1) ---► (Many) recipes
  │id               ├─ user_id
  ├─ email          ├─ title
  ├─ password_hash  ├─ description
  ├─ name           └─ ...
  └─ ...

recipes (1) ────► (Many) ingredients
  ├─ id                  ├─ recipe_id
  ├─ user_id (FK)        ├─ name
  ├─ title               ├─ quantity
  ├─ image_url           └─ unit
  └─ ...

recipes (1) ────► (Many) reviews
  ├─ id                ├─ recipe_id (FK)
  ├─ title             ├─ user_id (FK)
  └─ ...               ├─ rating
                       ├─ comment
                       └─ ...

users (1) ────► (Many) meal_plans
  ├─ id              ├─ user_id (FK)
  └─ ...             ├─ week_start_date
                     └─ ...

meal_plans (1) ────► (Many) meal_plan_items
  ├─ id                   ├─ meal_plan_id (FK)
  └─ ...                  ├─ recipe_id (FK)
                          ├─ day_of_week
                          └─ meal_type

meal_plans (1) ────► (Many) shopping_lists
  ├─ id                    ├─ meal_plan_id (FK)
  └─ ...                   ├─ user_id (FK)
                           └─ ...

shopping_lists (1) ────► (Many) shopping_list_items
  ├─ id                      ├─ shopping_list_id (FK)
  └─ ...                     ├─ ingredient_name
                             ├─ category
                             └─ is_checked
```

---

## 🎨 Color & Design Tokens

```
PRIMARY COLORS:
┌─────────────────────────────────────┐
│ Primary Brand: #FF6B6B (Warm Red)   │  ← Used for buttons, highlights
│ Secondary: #4ECDC4 (Fresh Teal)     │  ← Used for accents, links
│ Accent: #FFE66D (Energetic Yellow)  │  ← Used for important actions
└─────────────────────────────────────┘

LIGHT MODE:
┌─────────────────────────────────────┐
│ Background: #FFFFFF                 │
│ Surface: #F5F5F5                    │
│ Text: #1A1A1A (Dark Gray)           │
│ Border: #E0E0E0 (Light Gray)        │
│ Hover: #EEEEEE (Very Light Gray)    │
└─────────────────────────────────────┘

DARK MODE:
┌─────────────────────────────────────┐
│ Background: #121212 (Very Dark)     │
│ Surface: #1E1E1E (Dark Gray)        │
│ Text: #FFFFFF (White)               │
│ Border: #333333 (Dark Border)       │
│ Hover: #2A2A2A (Slightly Lighter)   │
└─────────────────────────────────────┘

SEMANTIC COLORS:
├─ Success: #4CAF50 (Green)
├─ Error: #F44336 (Red)
├─ Warning: #FF9800 (Orange)
└─ Info: #2196F3 (Blue)

SPACING SYSTEM (8px grid):
├─ xs: 4px
├─ sm: 8px
├─ md: 16px
├─ lg: 24px
├─ xl: 32px
└─ 2xl: 48px
```

---

## 🔄 User Journey Map

```
NEW USER JOURNEY:

Landing Page
    ▼
See Features/Screenshots
    ▼
Click "Sign Up"
    ▼
Registration Form
    ▼
Enter Email/Password
    ▼
Account Created ✓
    ▼
Auto Login
    ▼
Welcome Email (optional)
    ▼
Dashboard (empty state)
    ▼
Click "Create Recipe"
    ▼
Fill Recipe Form
    ▼
Upload Image
    ▼
Submit
    ▼
Recipe Saved ✓
    ▼
Recipe Detail Page
    ▼
See Created Recipe
    ▼
Edit / Share / Rate Option


RETURNING USER JOURNEY:

Login Page
    ▼
Enter Email/Password
    ▼
Dashboard
    ▼
See Recent Recipes
    ▼
Browse My Recipes
    ▼
Create/Edit/Delete
    ▼
Plan Meals
    ▼
Generate Shopping List
    ▼
Explore Others' Recipes
    ▼
Rate & Review
    ▼
Logout
```

---

## 📊 Phase Deliverables Timeline

### 📅 SPRINT 1: Foundation (Weeks 1-2)
```
Week 1:
├─ Mon: Project Setup & Structure
├─ Tue: Database Schema Creation
├─ Wed: Authentication Backend API
├─ Thu: Authentication Frontend UI
└─ Fri: Basic Component Library

Week 2:
├─ Mon: Login/Register Flow Complete
├─ Tue: Protected Routes Working
├─ Wed: Dashboard Basic Structure
├─ Thu: Testing & Bug Fixes
└─ Fri: Deploy on Render/Netlify (Development)

DELIVERABLE: Full authentication working ✓
```

### 📅 SPRINT 2: Core Features (Weeks 3-4)
```
Week 3:
├─ Mon-Tue: Recipe CRUD Implementation
├─ Wed: Image Upload Integration
├─ Thu: Recipe Categories Feature
└─ Fri: Search Functionality

Week 4:
├─ Mon: Dashboard Analytics
├─ Tue: Reviews & Ratings
├─ Wed: Recipe Sharing
├─ Thu: Testing & Optimization
└─ Fri: Code Review & Cleanup

DELIVERABLE: All core features working ✓
```

### 📅 SPRINT 3: Advanced (Week 5)
```
├─ Mon-Tue: Meal Planning System
├─ Wed: Shopping List Generation
├─ Thu: Cooking Timer Feature
└─ Fri: Autosave Implementation

DELIVERABLE: Advanced features complete ✓
```

### 📅 SPRINT 4: Polish (Week 6)
```
├─ Mon: Dark Mode Implementation
├─ Tue: Responsive Design Fixes
├─ Wed: Performance Optimization
├─ Thu: PDF Export Feature
├─ Fri: Deploy to Production

DELIVERABLE: Production-ready app ✓
```

---

## 📈 Success Metrics

```
CODE QUALITY:
├─ ESLint Score: 0 errors
├─ TypeScript/JSDoc Coverage: 80%+
├─ Code Duplication: < 5%
├─ Cyclomatic Complexity: < 10
└─ Test Coverage: 60%+

PERFORMANCE:
├─ Lighthouse Score: > 85
├─ First Contentful Paint: < 2s
├─ Time to Interactive: < 3.5s
├─ API Response Time: < 200ms
└─ Database Query Time: < 100ms

USER EXPERIENCE:
├─ Mobile Responsiveness: ✓
├─ Dark Mode Support: ✓
├─ Accessibility Score: > 90
├─ Form Validation: ✓
└─ Error Messages: Clear & Helpful

FUNCTIONALITY:
├─ Authentication: 100%
├─ Recipe Management: 100%
├─ Search: 100%
├─ Meal Planning: 100%
├─ Reviews/Ratings: 100%
└─ Dashboard: 100%

DEPLOYMENT:
├─ Backend Live: ✓
├─ Frontend Live: ✓
├─ Database Connected: ✓
├─ Images Uploading: ✓
└─ All Features Working: ✓
```

---

## 🎯 Key Differentiators

**Why This is Different:**
✓ Professional architecture (not tutorial code)
✓ Scalable design patterns
✓ Industry best practices
✓ Production-ready security
✓ Real-world optimizations
✓ Comprehensive documentation
✓ Deployable to real users
✓ Portfolio-worthy code quality

---

**This visual guide helps understand the complete system structure and flow.**

