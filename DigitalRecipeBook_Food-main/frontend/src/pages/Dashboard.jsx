import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    'all',
    'appetizer',
    'main',
    'side',
    'dessert',
    'beverage',
    'breakfast',
    'other',
  ];

  useEffect(() => {
    fetchRecipes();
  }, [search, category, page]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 12,
        ...(search && { search }),
        ...(category && category !== 'all' && { category }),
      });

      const response = await axios.get(`${API_BASE_URL}/recipes?${params}`);
      setRecipes(response.data.data);
      setTotalPages(response.data.totalPages);
      setError('');
    } catch (err) {
      setError('Failed to load recipes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600">Please log in to view dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Recipe Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.first_name}! Explore and discover recipes</p>
          <Link
            to="/recipes/create"
            className="mt-4 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            + Create Recipe
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search recipes by title or description..."
              value={search}
              onChange={handleSearch}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-lg capitalize transition ${
                    category === cat || (category === '' && cat === 'all')
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>
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
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No recipes found. Try a different search.</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {recipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  to={`/recipes/${recipe.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden group"
                >
                  {/* Recipe Image */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    {recipe.photo_url ? (
                      <img
                        src={recipe.photo_url}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
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
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 pt-4 border-t border-gray-200">
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

                    {/* Difficulty Badge */}
                    <div className="mt-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded capitalize ${
                          recipe.difficulty === 'easy'
                            ? 'bg-green-100 text-green-800'
                            : recipe.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mb-8">
                <button
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                >
                  ← Previous
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
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
                  onClick={() => handlePageChange(page + 1)}
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
