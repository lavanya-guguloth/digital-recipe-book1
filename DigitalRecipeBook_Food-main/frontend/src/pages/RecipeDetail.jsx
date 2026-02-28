import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  useEffect(() => {
    fetchRecipeAndReviews();
  }, [id]);

  const fetchRecipeAndReviews = async () => {
    try {
      setLoading(true);
      const recipeResponse = await axios.get(`${API_BASE_URL}/recipes/${id}`);
      setRecipe(recipeResponse.data);

      const reviewsResponse = await axios.get(`${API_BASE_URL}/recipes/${id}/reviews`);
      setReviews(reviewsResponse.data.data);

      setError('');
    } catch (err) {
      setError('Failed to load recipe');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setReviewSubmitting(true);

    try {
      await axios.post(`${API_BASE_URL}/recipes/${id}/reviews`, { rating: parseInt(rating), comment }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });

      setRating(5);
      setComment('');
      setReviewSuccess('Review added successfully!');
      setTimeout(() => {
        setReviewSuccess('');
        fetchRecipeAndReviews();
      }, 1500);
    } catch (err) {
      setReviewError('Failed to add review');
      console.error(err);
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-300 rounded-lg h-96 animate-pulse mb-8" />
          <div className="bg-gray-300 rounded-lg h-12 animate-pulse mb-4" />
          <div className="bg-gray-300 rounded-lg h-12 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Recipe not found'}</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
        >
          ← Back to Recipes
        </button>

        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {/* Recipe Image */}
          <div className="h-96 bg-gray-200">
            {recipe.photo_url ? (
              <img src={recipe.photo_url} alt={recipe.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">
                <span className="text-gray-400 text-xl">No Image</span>
              </div>
            )}
          </div>

          {/* Recipe Info */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
            <p className="text-gray-600 text-lg mb-6">{recipe.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex text-yellow-400 text-2xl">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < Math.round(recipe.averageRating) ? '★' : '☆'}</span>
                ))}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{recipe.averageRating}</div>
                <div className="text-gray-600">({recipe.totalReviews} reviews)</div>
              </div>
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <div className="text-gray-600 text-sm font-medium">Difficulty</div>
                <div className="text-lg font-semibold text-gray-900 capitalize">{recipe.difficulty}</div>
              </div>
              <div>
                <div className="text-gray-600 text-sm font-medium">Servings</div>
                <div className="text-lg font-semibold text-gray-900">{recipe.servings} people</div>
              </div>
              <div>
                <div className="text-gray-600 text-sm font-medium">Prep Time</div>
                <div className="text-lg font-semibold text-gray-900">{recipe.prep_time} min</div>
              </div>
              <div>
                <div className="text-gray-600 text-sm font-medium">Cook Time</div>
                <div className="text-lg font-semibold text-gray-900">{recipe.cook_time} min</div>
              </div>
            </div>

            {/* Category */}
            <div>
              <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg font-semibold capitalize">
                {recipe.category}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>

              {recipe.ingredients && recipe.ingredients.length > 0 ? (
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                      <span>
                        {ingredient.quantity && `${ingredient.quantity} `}
                        {ingredient.unit && `${ingredient.unit} `}
                        {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No ingredients listed.</p>
              )}
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews & Ratings</h2>

              {/* Review Form */}
              {isAuthenticated ? (
                <form onSubmit={handleSubmitReview} className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave a Review</h3>

                  {reviewError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg">
                      {reviewError}
                    </div>
                  )}

                  {reviewSuccess && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg">
                      {reviewSuccess}
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRating(r)}
                          className={`text-3xl transition ${rating >= r ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts about this recipe..."
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition font-medium"
                  >
                    {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              ) : (
                <div className="mb-8 pb-8 border-b border-gray-200 p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    Please{' '}
                    <button
                      onClick={() => navigate('/login')}
                      className="text-indigo-600 hover:text-indigo-700 font-semibold"
                    >
                      log in
                    </button>{' '}
                    to leave a review.
                  </p>
                </div>
              )}

              {/* Reviews List */}
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-indigo-600">
                              {review.users?.first_name?.[0] || 'U'}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {review.users?.first_name} {review.users?.last_name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                          ))}
                        </div>
                      </div>

                      {review.comment && (
                        <p className="text-gray-700">{review.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recipe Info</h3>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">By</div>
                  <div className="font-semibold text-gray-900">
                    {recipe.users?.first_name} {recipe.users?.last_name}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600">Total Time</div>
                  <div className="font-semibold text-gray-900">
                    {recipe.prep_time + recipe.cook_time} minutes
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600">Category</div>
                  <div className="font-semibold text-gray-900 capitalize">{recipe.category}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600">Difficulty Level</div>
                  <div className="font-semibold text-gray-900 capitalize">{recipe.difficulty}</div>
                </div>

                <button className="w-full mt-6 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
                  Save Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
