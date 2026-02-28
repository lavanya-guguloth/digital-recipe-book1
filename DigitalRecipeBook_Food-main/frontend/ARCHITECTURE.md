# Frontend Architecture

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx             # Main app component and routing
│   ├── main.jsx            # Vite entry point
│   ├── index.css           # Global styles with Tailwind
│   ├── components/         # Reusable React components
│   │   ├── auth/           # Authentication components
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── common/         # Shared components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── dashboard/      # Dashboard features
│   │   ├── meal-plan/      # Meal planning features
│   │   └── recipe/         # Recipe components
│   ├── context/            # React Context state management
│   │   ├── AuthContext.jsx      # Authentication state
│   │   ├── RecipeContext.jsx    # Recipe data state
│   │   └── ThemeContext.jsx     # Theme/dark mode state
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MyRecipes.jsx
│   │   ├── CreateRecipe.jsx
│   │   ├── RecipeDetail.jsx
│   │   └── NotFound.jsx
│   ├── services/           # API communication
│   │   ├── api.js          # Axios configuration
│   │   ├── authService.js
│   │   └── recipeService.js
│   ├── utils/              # Helper functions
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json

```

## State Management

### Context Providers
- **AuthContext**: User authentication state, login/logout
- **RecipeContext**: Recipe data, favorites, filters
- **ThemeContext**: Dark/light mode preference

## Route Structure

### Public Routes
- `/` - Home page
- `/login` - User login
- `/register` - User registration

### Protected Routes (requires authentication)
- `/dashboard` - User dashboard
- `/my-recipes` - User's own recipes
- `/recipes/create` - Create new recipe
- `/recipes/:id` - Recipe detail view

## Styling
- **Tailwind CSS** for utility-first styling
- **Lucide React** for icons
- Custom theme support via ThemeContext

## API Integration
- Centralized API service with Axios
- Automatic token injection in requests
- Error handling and response interception

## Error Handling
- ErrorBoundary component for React error catching
- API error handling in services
- User-friendly error messages

## Running the Frontend

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint

# Formatting
npm run format
```

## Key Features
- Responsive design for mobile/tablet/desktop
- Protected route system
- Session management
- Error boundary for graceful failure handling
- Context-based global state management
