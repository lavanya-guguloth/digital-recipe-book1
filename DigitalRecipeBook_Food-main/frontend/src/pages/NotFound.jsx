import { Link } from 'react-router-dom';

/**
 * NotFound Page - 404
 */
export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-primary text-white px-8 py-3 rounded-lg hover:opacity-90 transition inline-block"
      >
        Go Home
      </Link>
    </div>
  );
}
