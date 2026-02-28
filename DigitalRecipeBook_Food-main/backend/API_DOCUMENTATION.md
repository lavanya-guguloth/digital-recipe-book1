# Digital Recipe Book - API Documentation

## 📋 Complete API Reference

Base URL: `http://localhost:5000/api` (Development)  
Base URL: `https://your-render-deployment.com/api` (Production)

All protected endpoints require: `Authorization: Bearer <JWT_TOKEN>`

---

## 🔐 Authentication Endpoints

### 1. Register New User

**Endpoint**: `POST /auth/register`

**Public**: Yes (No authentication required)

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response** (201):
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response** (400/409):
```json
{
  "error": "User already exists"
}
```

**Example cURL**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

---

### 2. Login User

**Endpoint**: `POST /auth/login`

**Public**: Yes

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response** (200):
```json
{
  "message": "Login successful",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "avatarUrl": "https://..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response** (401):
```json
{
  "error": "Invalid credentials"
}
```

**Example cURL**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

---

### 3. Get Current User

**Endpoint**: `GET /auth/me`

**Protected**: ✅ Yes (Requires JWT token)

**Request Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response** (200):
```json
{
  "message": "User fetched successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "avatarUrl": "https://...",
    "bio": "I love cooking!"
  }
}
```

**Example cURL**:
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 4. Logout

**Endpoint**: `POST /auth/logout`

**Protected**: ✅ Yes

**Request Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response** (200):
```json
{
  "message": "Logout successful"
}
```

**Example cURL**:
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🍽️ Recipe Endpoints (Coming Sprint 1)

### 5. Get All Public Recipes

**Endpoint**: `GET /recipes`

**Protected**: No

**Query Parameters**:
- `page` (integer, default: 1) - Page number
- `limit` (integer, default: 10) - Items per page
- `category` (string, optional) - Filter by category

**Response** (200):
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "title": "Spaghetti Carbonara",
      "description": "Classic Italian pasta",
      "category": "main courses",
      "cookTime": 20,
      "prepTime": 10,
      "servings": 4,
      "difficulty": "easy",
      "imageUrl": "https://...",
      "createdAt": "2024-02-25T10:00:00Z"
    }
  ],
  "count": 1,
  "page": 1,
  "total": 100
}
```

**Example cURL**:
```bash
curl -X GET "http://localhost:5000/api/recipes?page=1&limit=10&category=main%20courses" \
  -H "Content-Type: application/json"
```

---

### 6. Get User's Recipes

**Endpoint**: `GET /recipes/my-recipes`

**Protected**: ✅ Yes

**Query Parameters**:
- `page` (integer, default: 1)
- `limit` (integer, default: 10)

**Response** (200):
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "My Special Recipe",
      "category": "desserts",
      "isPublic": true,
      "rating": 4.5,
      "reviewCount": 12
    }
  ],
  "count": 5
}
```

**Example cURL**:
```bash
curl -X GET "http://localhost:5000/api/recipes/my-recipes" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 7. Get Single Recipe

**Endpoint**: `GET /recipes/:id`

**Protected**: No

**Path Parameters**:
- `id` (string) - Recipe UUID

**Response** (200):
```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Spaghetti Carbonara",
    "description": "Classic Italian pasta",
    "instructions": "1. Boil water...\n2. Cook pasta...",
    "category": "main courses",
    "cookTime": 20,
    "prepTime": 10,
    "servings": 4,
    "difficulty": "easy",
    "imageUrl": "https://...",
    "isPublic": true,
    "ingredients": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440100",
        "name": "Spaghetti",
        "quantity": 400,
        "unit": "g"
      }
    ],
    "reviews": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440200",
        "userId": "550e8400-e29b-41d4-a716-446655440001",
        "rating": 5,
        "comment": "Delicious!"
      }
    ],
    "createdAt": "2024-02-25T10:00:00Z"
  }
}
```

**Example cURL**:
```bash
curl -X GET "http://localhost:5000/api/recipes/550e8400-e29b-41d4-a716-446655440000" \
  -H "Content-Type: application/json"
```

---

### 8. Create Recipe

**Endpoint**: `POST /recipes`

**Protected**: ✅ Yes

**Request Body**:
```json
{
  "title": "Homemade Pizza",
  "description": "Fresh homemade pizza",
  "instructions": "1. Prepare dough...\n2. Add toppings...",
  "category": "main courses",
  "cookTime": 25,
  "prepTime": 30,
  "servings": 2,
  "difficulty": "medium",
  "isPublic": true,
  "ingredients": [
    {
      "name": "Flour",
      "quantity": 500,
      "unit": "g"
    },
    {
      "name": "Tomato Sauce",
      "quantity": 200,
      "unit": "ml"
    }
  ]
}
```

**Response** (201):
```json
{
  "message": "Recipe created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Homemade Pizza",
    "userId": "550e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2024-02-25T10:00:00Z"
  }
}
```

**Example cURL**:
```bash
curl -X POST http://localhost:5000/api/recipes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Homemade Pizza",
    "description": "Fresh pizza",
    "instructions": "1. Prepare dough...",
    "category": "main courses",
    "cookTime": 25,
    "prepTime": 30,
    "servings": 2,
    "difficulty": "medium",
    "isPublic": true,
    "ingredients": [
      {"name": "Flour", "quantity": 500, "unit": "g"}
    ]
  }'
```

---

### 9. Update Recipe

**Endpoint**: `PUT /recipes/:id`

**Protected**: ✅ Yes (Owner only)

**Path Parameters**:
- `id` (string) - Recipe UUID

**Request Body**: (Same as Create Recipe, but partial fields allowed)

**Response** (200):
```json
{
  "message": "Recipe updated successfully",
  "data": { /* Updated recipe */ }
}
```

**Example cURL**:
```bash
curl -X PUT http://localhost:5000/api/recipes/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Pizza Recipe"}'
```

---

### 10. Delete Recipe

**Endpoint**: `DELETE /recipes/:id`

**Protected**: ✅ Yes (Owner only)

**Response** (200):
```json
{
  "message": "Recipe deleted successfully"
}
```

**Example cURL**:
```bash
curl -X DELETE http://localhost:5000/api/recipes/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## ⭐ Reviews Endpoints (Coming Sprint 2)

### 11. Get Recipe Reviews

**Endpoint**: `GET /recipes/:id/reviews`

**Protected**: No

**Response** (200):
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440200",
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "userName": "John Doe",
      "rating": 5,
      "comment": "Amazing recipe!",
      "createdAt": "2024-02-25T10:00:00Z"
    }
  ],
  "averageRating": 4.8,
  "totalReviews": 10
}
```

---

### 12. Post Review

**Endpoint**: `POST /recipes/:id/reviews`

**Protected**: ✅ Yes

**Request Body**:
```json
{
  "rating": 5,
  "comment": "Absolutely delicious!"
}
```

**Response** (201):
```json
{
  "message": "Review posted successfully",
  "data": { /* New review */ }
}
```

---

## 📅 Meal Planning Endpoints (Coming Sprint 2)

### 13. Get User's Meal Plans

**Endpoint**: `GET /meal-plans`

**Protected**: ✅ Yes

**Response** (200):
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440300",
      "weekStart": "2024-02-25",
      "meals": [
        {
          "day": 0,
          "mealType": "breakfast",
          "recipe": { /* Recipe data */ }
        }
      ]
    }
  ]
}
```

---

### 14. Create Meal Plan

**Endpoint**: `POST /meal-plans`

**Protected**: ✅ Yes

**Request Body**:
```json
{
  "weekStartDate": "2024-02-25"
}
```

---

### 15. Get Shopping List

**Endpoint**: `GET /meal-plans/:id/shopping-list`

**Protected**: ✅ Yes

**Response** (200):
```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440400",
    "items": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440401",
        "ingredientName": "Tomato",
        "quantity": 5,
        "unit": "pieces",
        "category": "vegetables",
        "isChecked": false
      }
    ]
  }
}
```

---

## 📤 Upload Endpoints (Coming Sprint 1)

### 16. Upload Recipe Image

**Endpoint**: `POST /upload/recipe-image`

**Protected**: ✅ Yes

**Content-Type**: `multipart/form-data`

**Form Fields**:
- `file` (binary) - Image file (max 5MB, JPEG/PNG/WebP)

**Response** (200):
```json
{
  "message": "Image uploaded successfully",
  "imageUrl": "https://supabase-storage-url.com/..."
}
```

**Example cURL**:
```bash
curl -X POST http://localhost:5000/api/upload/recipe-image \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/image.jpg"
```

---

## 📊 Dashboard Endpoints (Coming Sprint 2)

### 17. Get User Dashboard Stats

**Endpoint**: `GET /users/dashboard/stats`

**Protected**: ✅ Yes

**Response** (200):
```json
{
  "data": {
    "totalRecipes": 15,
    "totalViews": 250,
    "averageRating": 4.5,
    "categoriesBreakdown": {
      "main courses": 5,
      "desserts": 3,
      "appetizers": 2
    },
    "recentRecipes": [
      { /* Recipe data */ }
    ]
  }
}
```

---

### 18. Get Popular Recipes

**Endpoint**: `GET /users/dashboard/popular-recipes`

**Protected**: No

**Response** (200):
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Most Popular Recipe",
      "rating": 4.9,
      "views": 500
    }
  ]
}
```

---

## 🔍 Search Endpoints (Coming Sprint 2)

### 19. Search Recipes by Ingredient

**Endpoint**: `GET /recipes/search?ingredient=tomato`

**Query Parameters**:
- `ingredient` (string) - Ingredient name
- `page` (integer, default: 1)
- `limit` (integer, default: 10)

**Response** (200):
```json
{
  "data": [ /* Matching recipes */ ],
  "count": 5
}
```

---

## ❌ Error Responses

All endpoints follow this error format:

```json
{
  "error": "Error message here",
  "status": 400,
  "details": "Additional context if available"
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Server Error - Internal error |

---

## 🔑 JWT Token Information

**Token Format**: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Token Payload**:
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "iat": 1708700400,
  "exp": 1709305200
}
```

**Token Expiration**: 7 days (configurable)

**How to Use**:
1. Get token from login endpoint
2. Store in localStorage: `localStorage.setItem('authToken', token)`
3. Add to all protected requests:
   ```javascript
   headers: {
     'Authorization': `Bearer ${token}`
   }
   ```

---

## 📚 Testing with Postman/Thunder Client

### Setup Collection

1. Create new environment:
   - `base_url`: `http://localhost:5000/api`
   - `token`: (leave empty initially)

2. Import endpoints above

3. Get token:
   - Login and save response `token` to `{{token}}`variable

4. Use `{{token}}` in Authorization header for protected endpoints

---

## Rate Limiting

Currently disabled for development. In production:
- **Limit**: 100 requests per 15 minutes per IP
- **Response**: 429 Too Many Requests

---

## CORS Policy

**Allowed Origins** (Configured):
- `http://localhost:3000` (Development)
- `https://your-netlify-domain.com` (Production)

**Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS

**Allowed Headers**: Content-Type, Authorization

---

## Pagination

All list endpoints support pagination:

```json
{
  "data": [],
  "page": 1,
  "limit": 10,
  "count": 10,
  "total": 100,
  "pages": 10
}
```

---

**Last Updated**: February 25, 2026  
**API Version**: 1.0.0  
**Status**: Sprint 1 In Progress

