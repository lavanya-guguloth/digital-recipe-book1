# Digital Recipe Book - Agile Sprint Planning & Checklist

## 📋 Pre-Development Checklist

Before we start coding, please complete these setup tasks:

### GitHub Setup
- [ ] Create GitHub account (if not already)
- [ ] Create **DigitalRecipeBook-Frontend** repository (Public)
  - Initialize with README.md
  - Add .gitignore for Node.js
- [ ] Create **DigitalRecipeBook-Backend** repository (Public)
  - Initialize with README.md
  - Add .gitignore for Node.js
- [ ] Clone both repositories to your local machine
- [ ] Share repository URLs with me

### Supabase Setup
- [ ] Create Supabase account (supabase.com)
- [ ] Create new project named "digital-recipe-book"
- [ ] Note down:
  - Project URL
  - Anon Public Key
  - Service Role Key
- [ ] Email me these credentials (we'll keep them secure in .env)

### Local Development Environment
- [ ] Install Node.js v18+ (nodejs.org)
- [ ] Verify: `node --version` and `npm --version`
- [ ] Install Git (if not already)
- [ ] Install VS Code (if not already)
- [ ] Install these VS Code extensions:
  - Prettier - Code formatter
  - ESLint
  - Tailwind CSS IntelliSense
  - Thunder Client (for API testing)

### Directory Structure
```
Create locally:
C:\YourProjects\
├── DigitalRecipeBook-Frontend\      (Clone from GitHub)
└── DigitalRecipeBook-Backend\       (Clone from GitHub)
```

---

## 🏃 Sprint 1 (Weeks 1-2): Foundation & Authentication

### Sprint Goal
Establish project infrastructure and implement user authentication system with basic UI components.

### User Stories

#### Story 1: Project Setup
**As a** Developer
**I want to** have all necessary project files configured
**So that** I can start feature development

**Tasks:**
- [ ] Initialize frontend with Vite + React
- [ ] Install all frontend dependencies
- [ ] Configure Tailwind CSS
- [ ] Setup ShadCN UI components
- [ ] Create .env.example with required variables
- [ ] Verify build and dev server work

- [ ] Initialize backend with Express
- [ ] Install all backend dependencies
- [ ] Setup project file structure
- [ ] Configure environment variables
- [ ] Verify server starts correctly
- [ ] Setup nodemon for development

**Acceptance Criteria:**
- Frontend runs with `npm run dev`
- Backend runs with `npm start`
- No console errors
- Folder structure complete

---

#### Story 2: Database Schema Creation
**As a** Developer
**I want to** create database tables in Supabase
**So that** I can store user and recipe data

**Tasks:**
- [ ] Create `users` table with all fields
- [ ] Create `recipes` table with all fields
- [ ] Create `ingredients` table with all fields
- [ ] Create `reviews` table with all fields
- [ ] Create `meal_plans` table with all fields
- [ ] Create `meal_plan_items` table with all fields
- [ ] Create `shopping_lists` table with all fields
- [ ] Create `shopping_list_items` table with all fields
- [ ] Setup foreign key relationships
- [ ] Create database indexes for performance
- [ ] Document schema (ERD diagram)

**Acceptance Criteria:**
- All tables created successfully
- All relationships established
- Indexes created for frequently queried columns
- Database can be queried without errors

---

#### Story 3: Backend Authentication API
**As a** User
**I want to** register and login to the application
**So that** I can access my recipes

**Tasks:**
- [ ] Implement bcrypt password hashing
- [ ] Setup JWT token generation
- [ ] Create `/api/auth/register` endpoint
- [ ] Create `/api/auth/login` endpoint
- [ ] Create `/api/auth/logout` endpoint
- [ ] Create `/api/auth/me` endpoint (get current user)
- [ ] Implement JWT verification middleware
- [ ] Add input validation for auth endpoints
- [ ] Add error handling
- [ ] Test all endpoints with Thunder Client

**Acceptance Criteria:**
- Can register new user
- Can login with credentials
- JWT token generated and validated
- Protected endpoints require valid token
- Passwords hashed securely
- All API tests pass

---

#### Story 4: Frontend Authentication UI
**As a** User
**I want to** register and login through UI
**So that** I have a secure account

**Tasks:**
- [ ] Create LoginForm component
- [ ] Create RegisterForm component
- [ ] Create /login page
- [ ] Create /register page
- [ ] Implement AuthContext for state management
- [ ] Create authentication service (API calls)
- [ ] Add form validation on frontend
- [ ] Add error message display
- [ ] Add success notification on login
- [ ] Store JWT token in localStorage
- [ ] Create ProtectedRoute component
- [ ] Implement logout functionality
- [ ] Test authentication flow

**Acceptance Criteria:**
- User can successfully register
- User can successfully login
- User can logout
- Protected pages redirect to login
- JWT token stored and sent with requests
- Form validation works
- Error messages display properly

---

#### Story 5: Basic UI Components Library
**As a** Developer
**I want to** have reusable UI components ready
**So that** I can build pages faster

**Tasks:**
- [ ] Create Header component with navigation
- [ ] Create Navbar component
- [ ] Create Footer component
- [ ] Create Sidebar component (responsive)
- [ ] Create Button component (multiple variants)
- [ ] Create Card component
- [ ] Create Input component
- [ ] Create Form component wrapper
- [ ] Create Loading spinner
- [ ] Create Notification/Toast component
- [ ] Create Modal component
- [ ] Build with Tailwind CSS and ShadCN UI
- [ ] Document component usage

**Acceptance Criteria:**
- All components display correctly
- Responsive on desktop/tablet/mobile
- Consistent styling with color scheme
- Components reusable across app
- No prop drilling issues

---

### Sprint 1 Deliverables
- [ ] Working frontend dev environment
- [ ] Working backend dev environment
- [ ] Database schema complete
- [ ] User registration working
- [ ] User login working
- [ ] Protected routes working
- [ ] UI component library started
- [ ] Code on GitHub

### Sprint 1 Success Metrics
✅ No TypeScript/JavaScript errors
✅ All endpoints respond correctly
✅ JWT authentication working
✅ UI looks professional
✅ Code follows naming conventions

### Sprint 1 Demo
You should be able to:
1. Register a new account
2. Login with credentials
3. See JWT token in localStorage
4. Logout successfully
5. Try to access protected page (redirects to login)

---

## 🏃 Sprint 2 (Weeks 3-4): Core Recipe Features

### Sprint Goal
Implement complete CRUD operations for recipes and basic dashboard.

### User Stories

#### Story 6: Recipe Creation
**As a** User
**I want to** create recipes with ingredients and instructions
**So that** I can store my favorite recipes

**Tasks:**
- [ ] Create RecipeForm component
- [ ] Create /create-recipe page
- [ ] Implement form validation (frontend)
- [ ] Create POST /api/recipes endpoint (backend)
- [ ] Implement ingredient input (multiple fields)
- [ ] Add image upload functionality
- [ ] Implement server-side validation
- [ ] Add file upload middleware
- [ ] Store images in Supabase Storage
- [ ] Show success notification
- [ ] Handle errors gracefully

**Acceptance Criteria:**
- Can fill recipe form with data
- Can add multiple ingredients
- Can upload recipe image
- Recipe saved to database
- User ID associated with recipe
- Image uploaded to Supabase Storage
- Redirect to recipe detail on success

---

#### Story 7: View and List Recipes
**As a** User
**I want to** view my recipes and browse recipes
**So that** I can remember what I've created

**Tasks:**
- [ ] Create GET /api/recipes/my-recipes endpoint
- [ ] Create GET /api/recipes/:id endpoint
- [ ] Create RecipeCard component
- [ ] Create RecipeList component
- [ ] Create RecipeDetail page
- [ ] Create MyRecipes page
- [ ] Implement pagination
- [ ] Add loading states
- [ ] Format display data (time, servings, etc.)
- [ ] Display recipe images properly
- [ ] Add back navigation

**Acceptance Criteria:**
- Can view list of own recipes
- Can click recipe to view details
- All recipe data displays correctly
- Images show properly
- Pagination works
- Loading states visible

---

#### Story 8: Edit and Delete Recipes
**As a** User
**I want to** edit and delete my own recipes
**So that** I can manage my collection

**Tasks:**
- [ ] Create PUT /api/recipes/:id endpoint
- [ ] Create DELETE /api/recipes/:id endpoint
- [ ] Create EditRecipe page
- [ ] Implement form pre-fill with existing data
- [ ] Add edit button on recipe detail
- [ ] Add delete button with confirmation
- [ ] Update recipe in database
- [ ] Update image if changed
- [ ] Show success notification
- [ ] Handle authorization (own recipes only)

**Acceptance Criteria:**
- Can edit own recipes
- Can delete own recipes
- Can't edit/delete others' recipes
- Changes save to database
- Confirmation before delete
- Success notifications shown

---

#### Story 9: Recipe Categories
**As a** User
**I want to** categorize recipes
**So that** I can organize them better

**Tasks:**
- [ ] Add category field to recipes table
- [ ] Create category select in RecipeForm
- [ ] Create category filter on MyRecipes page
- [ ] Create GET /api/recipes?category=X endpoint
- [ ] Add category display on RecipeCard
- [ ] Add category badges/pills styling
- [ ] Update database queries for filtering

**Acceptance Criteria:**
- Can select category when creating recipe
- Can filter recipes by category
- Category displays on recipe cards
- Filtering works correctly

---

#### Story 10: Dashboard with Basic Stats
**As a** User
**I want to** see my recipe statistics on dashboard
**So that** I can track my collection

**Tasks:**
- [ ] Create Dashboard page
- [ ] Create GET /api/users/dashboard/stats endpoint
- [ ] Implement recipe count stat
- [ ] Implement recipes by category breakdown
- [ ] Add total cooking time statistic
- [ ] Create chart visualization (Charts.js or Recharts)
- [ ] Display recent recipes
- [ ] Make dashboard mobile-responsive
- [ ] Add quick action buttons

**Acceptance Criteria:**
- Dashboard loads correctly
- Stats display accurate data
- Charts render properly
- All data updates in real-time
- Responsive on mobile

---

### Sprint 2 Deliverables
- [ ] Complete Recipe CRUD working
- [ ] Recipe categories working
- [ ] Dashboard with stats
- [ ] Image upload working
- [ ] All endpoints tested
- [ ] Code reviewed and clean
- [ ] Pushed to GitHub

### Sprint 2 Demo
You should be able to:
1. Create a complete recipe with ingredients
2. Upload recipe image
3. View recipe in detail
4. Edit recipe information
5. Delete recipe (with confirmation)
6. Filter by category
7. See dashboard statistics

---

## 🏃 Sprint 3 (Week 5): Advanced Features

### User Stories

#### Story 11: Ingredient Search
#### Story 12: Reviews and Ratings
#### Story 13: Meal Planning System
#### Story 14: Shopping List Generation
#### Story 15: Recipe Sharing

*(Detailed format same as above - will be filled based on priority)*

---

## 🏃 Sprint 4 (Week 6): Polish & Deployment

### User Stories

#### Story 16: Dark Mode Toggle
#### Story 17: Responsive Design Improvements
#### Story 18: Performance Optimization
#### Story 19: Comprehensive Documentation
#### Story 20: Deployment Setup

---

## 📊 Burndown Chart Tracking

Create a simple Excel/Google Sheets to track:

| Sprint | Week | Tasks Planned | Tasks Completed | Velocity |
|--------|------|---------------|-----------------|----------|
| 1      | 1-2  | 30            | TBD             | TBD      |
| 2      | 3-4  | 28            | TBD             | TBD      |
| 3      | 5    | 25            | TBD             | TBD      |
| 4      | 6    | 20            | TBD             | TBD      |

---

## 🎯 Daily Standup Questions

Each day, consider:
1. What did I complete yesterday?
2. What am I working on today?
3. Any blockers or issues?
4. Code review needed?

---

## ✅ Definition of Done

A feature is "Done" when:
- [ ] Code written and committed
- [ ] Code reviewed (self-review minimum)
- [ ] No console errors
- [ ] Error handling implemented
- [ ] Input validation working
- [ ] Tested manually
- [ ] Documentation updated
- [ ] API documented (if backend)
- [ ] Mobile responsive (if frontend)
- [ ] Performance acceptable

---

## 🐛 Bug Tracking Template

When you find a bug:
```
Title: [Brief description]
Severity: Critical / High / Medium / Low
Component: Frontend / Backend / Database
Steps to Reproduce:
1. 
2. 
3. 

Expected: 
Actual: 

Environment: OS, Browser, Node version
```

---

## 📅 Weekly Checkpoints

### End of Week 1
- [ ] Project setup complete
- [ ] Database ready
- [ ] Basic authentication working
- [ ] UI components started

### End of Week 2
- [ ] Full authentication system
- [ ] Basic component library
- [ ] Ready for feature development

### End of Week 3
- [ ] Recipe CRUD working
- [ ] Dashboard created
- [ ] Categories implemented

### End of Week 4
- [ ] All core features working
- [ ] Search functionality
- [ ] Reviews/ratings system

### End of Week 5
- [ ] Advanced features complete
- [ ] Dark mode working
- [ ] All responsive

### End of Week 6
- [ ] Deployed and live
- [ ] Documentation complete
- [ ] Video walkthrough ready

---

## 🚀 Ready to Start?

Once you complete the pre-development checklist, we can begin Sprint 1 immediately!

**Key Milestones:**
1. ✅ Day 1-2: Project scaffolding
2. ✅ Day 3-4: Database setup
3. ✅ Day 5-7: Authentication working
4. ✅ Day 8-10: First features done
5. ✅ ... (continues through sprints)

Let me know once you're ready! 🚀

