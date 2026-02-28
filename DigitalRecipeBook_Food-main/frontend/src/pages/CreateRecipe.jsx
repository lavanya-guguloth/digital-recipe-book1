import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function CreateRecipe() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    servings: '4',
    prepTime: '15',
    cookTime: '30',
    difficulty: 'medium',
    category: 'other',
    isPublic: true,
    ingredients: [{ name: '', quantity: '', unit: 'cup' }],
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Create Recipe</h1>
        <p className="text-gray-600">Please log in to create recipes.</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const handleAddIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '', unit: 'cup' }],
    }));
  };

  const handleRemoveIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, photo: 'File size must be less than 5MB' }));
        return;
      }

      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setErrors((prev) => ({ ...prev, photo: 'File must be JPEG, PNG, or WebP' }));
        return;
      }

      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors((prev) => ({ ...prev, photo: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    const validIngredients = formData.ingredients.filter((ing) => ing.name.trim());
    if (validIngredients.length === 0) {
      newErrors.ingredients = 'At least one ingredient is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      let photoUrl = null;

      // Upload photo if provided
      if (photoFile) {
        const photoFormData = new FormData();
        photoFormData.append('file', photoFile);

        const photoResponse = await axios.post(`${API_BASE_URL}/upload/photo`, photoFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        photoUrl = photoResponse.data.publicUrl;
      }

      // Submit recipe
      const recipeData = {
        title: formData.title,
        description: formData.description,
        servings: formData.servings,
        prepTime: formData.prepTime,
        cookTime: formData.cookTime,
        difficulty: formData.difficulty,
        category: formData.category,
        photoUrl,
        isPublic: formData.isPublic,
        ingredients: formData.ingredients.filter((ing) => ing.name.trim()),
      };

      const response = await axios.post(`${API_BASE_URL}/recipes`, recipeData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });

      setSuccessMessage('Recipe created successfully!');
      setTimeout(() => {
        navigate(`/recipes/${response.data.id}`);
      }, 1500);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to create recipe';
      setErrors((prev) => ({ ...prev, submit: errorMessage }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Create Recipe</h1>
        <p className="text-gray-600 mb-8">Share your favorite recipe with the community</p>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
            {successMessage}
          </div>
        )}

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Basic Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Chocolate Chip Cookies"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your recipe..."
                rows="4"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Photo</label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
                </div>
                {photoPreview && (
                  <img src={photoPreview} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">Max 5MB. Supported: JPEG, PNG, WebP</p>
            </div>
          </div>

          {/* Recipe Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Recipe Details</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                <input
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time (min)</label>
                <input
                  type="number"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cook Time (min)</label>
                <input
                  type="number"
                  name="cookTime"
                  value={formData.cookTime}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="other">Other</option>
                <option value="appetizer">Appetizer</option>
                <option value="main">Main Course</option>
                <option value="side">Side Dish</option>
                <option value="dessert">Dessert</option>
                <option value="beverage">Beverage</option>
                <option value="breakfast">Breakfast</option>
              </select>
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Ingredients</h2>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                + Add Ingredient
              </button>
            </div>

            {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients}</p>}

            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-3 items-end">
                <input
                  type="text"
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  step="0.1"
                  className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <select
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                  className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="cup">Cup</option>
                  <option value="tbsp">Tbsp</option>
                  <option value="tsp">Tsp</option>
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="ml">ml</option>
                  <option value="oz">oz</option>
                  <option value="lb">lb</option>
                </select>
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Visibility */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleInputChange}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span className="text-gray-700">Make recipe public</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Public recipes can be viewed and rated by other users
            </p>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition font-medium"
            >
              {loading ? 'Creating...' : 'Create Recipe'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
