import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * Navbar Component
 */
export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          🍳 RecipeBook
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-primary transition">
                Dashboard
              </Link>
              <Link to="/my-recipes" className="hover:text-primary transition">
                My Recipes
              </Link>
              <Link to="/create-recipe" className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90">
                + Create
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary transition">
                Login
              </Link>
              <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90">
                Register
              </Link>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:opacity-80"
            title="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}
