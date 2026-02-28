# Digital Recipe Book - Frontend

A modern, responsive React application for managing and sharing recipes with Tailwind CSS and ShadCN UI components.

## 🎯 Project Overview

This is the frontend for the Digital Recipe Book application. Features include:
- User authentication (login/register)
- Create, edit, and delete recipes
- Upload recipe photos
- Search and filter recipes by category
- Rate and review recipes
- Meal planning with calendar
- Shopping list generation
- User dashboard with analytics
- Dark mode support
- Fully responsive design

## 🛠️ Tech Stack

- **Framework**: React 18+
- **Styling**: Tailwind CSS 3.x
- **Components**: ShadCN UI
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **State Management**: Context API
- **Build Tool**: Vite 5.x

## 📁 Project Structure

```
src/
├── components/        # Reusable components
│   ├── common/       # Common UI components
│   ├── recipe/       # Recipe components
│   ├── auth/         # Authentication components
│   ├── dashboard/    # Dashboard components
│   └── meal-plan/    # Meal planning components
├── pages/            # Page components
├── context/          # Context API providers
├── services/         # API services
├── hooks/            # Custom hooks
├── utils/            # Utility functions
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <frontend-repo-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```

   Update `.env`:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The app will open at `http://localhost:3000`

## 🎨 Features

### Currently Available
- ✅ Home page with feature showcase
- ✅ Navigation bar with theme toggle
- ✅ Authentication flow (UI ready)
- ✅ Protected routes
- ✅ Responsive layout
- ✅ Dark mode support

### Coming in Sprint 1
- 📋 Login/Register forms
- 🔐 Full authentication flow
- 📊 Dashboard
- 🍽️ My Recipes page

### Coming in Sprint 2
- ➕ Create Recipe form
- 📸 Image upload
- ⭐ Reviews & ratings
- 🔍 Search functionality
- 📅 Meal planning calendar
- 🛒 Shopping list generation

### Coming in Sprint 3+
- ⏰ Cooking timer
- 💾 Autosave feature
- 📄 PDF export
- 🤖 AI recipe suggestions

## 🎨 Color Scheme

```
Primary:   #FF6B6B (Warm Red)
Secondary: #4ECDC4 (Fresh Teal)
Accent:    #FFE66D (Energetic Yellow)
```

## 🔧 Available Scripts

### Development
```bash
npm run dev          # Start dev server
```

### Build
```bash
npm run build        # Build for production
```

### Preview
```bash
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

## 🌐 API Integration

The frontend connects to the backend API at the endpoint specified in `.env`.

### API Base URL
```
Development: http://localhost:5000/api
Production: Your Render deployment URL
```

### Authentication
- JWT tokens stored in localStorage
- Token automatically added to all requests
- Invalid tokens trigger redirect to login

## 🚀 Deployment

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Set environment variables
4. Deploy

**Build command**: `npm run build`  
**Publish directory**: `dist`

## 📱 Responsive Design

The application is fully responsive:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🌙 Dark Mode

Toggle dark mode using the moon/sun icon in the navbar. Preference is saved to localStorage.

## 🔐 Security

- Sensitive data stored in .env files
- API tokens sent via Authorization header
- CORS configured on backend
- Input validation on forms
- Protected routes for authenticated users

## 📚 Documentation

- **API Services**: See `src/services/`
- **Components**: Each component has JSDoc comments
- **Utilities**: See `src/utils/`
- **Context**: See `src/context/`

## 🤝 Contributing

This is a learning project. Contributions welcome!

## 📄 License

Open source - MIT License

## 👥 Author

Digital Recipe Book Team

---

**Status**: Currently in Sprint 1 - Foundation & Basic UI  
**Last Updated**: February 2024

