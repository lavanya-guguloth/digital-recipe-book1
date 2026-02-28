import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ErrorBoundary from './components/auth/ErrorBoundary';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyRecipes from './pages/MyRecipes';
import CreateRecipe from './pages/CreateRecipe';
import RecipeDetail from './pages/RecipeDetail';
import NotFound from './pages/NotFound';

// Layouts
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/my-recipes" element={<MyRecipes />} />
                    <Route path="/recipes/create" element={<CreateRecipe />} />
                  </Route>

                  {/* Public Recipe Route */}
                  <Route path="/recipes/:id" element={<RecipeDetail />} />

                  {/* 404 */}
                  <Route path="/not-found" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/not-found" />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
