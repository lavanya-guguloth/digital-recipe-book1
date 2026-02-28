import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Home Page
 */
export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Digital Recipe Book</h1>
          <p className="text-xl mb-8">
            Organize, share, and discover delicious recipes effortlessly
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:opacity-90 transition inline-block"
            >
              Get Started
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">Easy Recipe Creation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create and save your recipes with step-by-step instructions
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-2">Photo Upload</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share beautiful photos of your completed dishes
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">Community Ratings</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Rate and review recipes from other users
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-primary text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to start cooking?</h2>
          <Link
            to="/register"
            className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:opacity-90 transition inline-block"
          >
            Create Your Account
          </Link>
        </section>
      )}
    </div>
  );
}
