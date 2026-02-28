import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function MyRecipes() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchMyRecipes();
    }
  }, [isAuthenticated, user, page]);

  const fetchMyRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/recipes/user/${user.id}?page=${page}&limit=12`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      setRecipes(response.data.data);
      setTotalPages(response.data.totalPages);
      setError('');
    } catch (err) {
      setError('Failed to load your recipes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    setDeletingId(id);

    try {
      await axios.delete(`${API_BASE_URL}/recipes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });

      setRecipes(recipes.filter((r) => r.id !== id));
    } catch (err) {
      setError('Failed to delete recipe');
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">My Recipes</h1>
        <p className="text-gray-600">Please log in to view your recipes.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Recipes</h1>
          <p className="text-gray-600 mb-6">Manage and view your created recipes</p>
          <Link
            to="/recipes/create"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            + Create New Recipe
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        {/* Recipes */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-300 rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <p className="text-gray-600 text-lg mb-4">You haven't created any recipes yet.</p>
            <Link
              to="/recipes/create"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition inline-block"
            >
              Create Your First Recipe
            </Link>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Recipe Image */}
                  <div className="relative h-48 bg-gray-200">
                    {recipe.photo_url ? (
                      <img
                        src={recipe.photo_url}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      {recipe.is_public ? (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
                          Public
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-500 text-white text-xs font-semibold rounded">
                          Private
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Recipe Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {recipe.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {recipe.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < Math.round(recipe.averageRating) ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {recipe.averageRating} ({recipe.reviewCount})
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 pt-4 border-t border-gray-200 mb-4">
                      <div>
                        <span className="font-semibold">⏱</span> {recipe.prep_time}m
                      </div>
                      <div>
                        <span className="font-semibold">👨‍🍳</span> {recipe.cook_time}m
                      </div>
                      <div>
                        <span className="font-semibold">🍽</span> {recipe.servings}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        to={`/recipes/${recipe.id}`}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-center text-sm font-medium"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(recipe.id)}
                        disabled={deletingId === recipe.id}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 transition text-sm font-medium"
                      >
                        {deletingId === recipe.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => {
                    setPage(page - 1);
                    window.scrollTo(0, 0);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                >
                  ← Previous
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => {
                      setPage(i + 1);
                      window.scrollTo(0, 0);
                    }}
                    className={`px-4 py-2 rounded-lg transition ${
                      page === i + 1
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() => {
                    setPage(page + 1);
                    window.scrollTo(0, 0);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
