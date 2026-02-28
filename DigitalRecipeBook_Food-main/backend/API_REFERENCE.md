# API Documentation

## Base URL
- Development: `http://localhost:5000/api`
- Production: See deployment guide

## Authentication
Include JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Health Check

### GET /health
Check if API is running.

**Response:**
```json
{
  "status": "API is running",
  "timestamp": "2026-02-28T10:00:00Z"
}
```

---

## Authentication Endpoints

### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "jwt_token_here"
}
```

**Error (400):**
```json
{
  "error": "Email already exists or validation failed"
}
```

### POST /auth/login
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "token": "jwt_token_here"
}
```

**Error (401):**
```json
{
  "error": "Invalid credentials"
}
```

### POST /auth/logout
Logout user (client-side token removal).

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## Recipe Endpoints

### GET /recipes
Get all public recipes with pagination and search.

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 12)
- `search` (optional string)
- `category` (optional: breakfast, lunch, dinner, dessert, snack, other)

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Pasta Carbonara",
      "description": "Classic Italian pasta",
      "category": "lunch",
      "prepTime": 10,
      "cookTime": 20,
      "difficulty": "medium",
      "photoUrl": "url_to_image",
      "averageRating": 4.5,
      "reviewCount": 12,
      "ingredients": [],
      "reviews": []
    }
  ],
  "count": 150,
  "page": 1
}
```

### GET /recipes/:id
Get single recipe details.

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Pasta Carbonara",
  "description": "Classic Italian pasta",
  "instructions": "Step by step...",
  "category": "lunch",
  "prepTime": 10,
  "cookTime": 20,
  "difficulty": "medium",
  "isPublic": true,
  "photoUrl": "url",
  "userId": "uuid",
  "user": {
    "firstName": "Chef",
    "lastName": "Name"
  },
  "ingredients": [
    {
      "id": "uuid",
      "name": "Pasta",
      "quantity": 400,
      "unit": "g"
    }
  ],
  "reviews": [
    {
      "id": "uuid",
      "rating": 5,
      "comment": "Delicious!",
      "userId": "uuid"
    }
  ]
}
```

### POST /recipes
Create a new recipe (requires authentication).

**Request Body:**
```json
{
  "title": "Pasta Carbonara",
  "description": "Classic Italian pasta",
  "instructions": "Step by step...",
  "category": "lunch",
  "prepTime": 10,
  "cookTime": 20,
  "difficulty": "medium",
  "isPublic": true,
  "ingredients": [
    {
      "name": "Pasta",
      "quantity": 400,
      "unit": "g"
    }
  ]
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "title": "Pasta Carbonara",
  "message": "Recipe created successfully"
}
```

### PUT /recipes/:id
Update an existing recipe (requires ownership).

**Request Body:** Same as POST

**Response (200):**
```json
{
  "message": "Recipe updated successfully"
}
```

### DELETE /recipes/:id
Delete a recipe (requires ownership).

**Response (200):**
```json
{
  "message": "Recipe deleted successfully"
}
```

### GET /recipes/user/:userId
Get all recipes by a specific user.

**Response (200):** Same as GET /recipes

---

## Review Endpoints

### POST /recipes/:id/reviews
Add a review to a recipe (requires authentication).

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Absolutely delicious!"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "rating": 5,
  "comment": "Absolutely delicious!",
  "message": "Review added successfully"
}
```

### GET /recipes/:id/reviews
Get all reviews for a recipe.

**Response (200):**
```json
[
  {
    "id": "uuid",
    "rating": 5,
    "comment": "Great recipe!",
    "userId": "uuid",
    "createdAt": "2026-02-28T10:00:00Z"
  }
]
```

---

## Upload Endpoints

### POST /upload
Upload a recipe photo (requires authentication).

**Request:**
- Content-Type: multipart/form-data
- File: image file (jpg, png, webp)

**Response (200):**
```json
{
  "photoUrl": "https://storage.url/photo.jpg",
  "message": "Photo uploaded successfully"
}
```

**Error (400):**
```json
{
  "error": "No file provided"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error or missing required field",
  "status": 400
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required",
  "status": 401
}
```

### 403 Forbidden
```json
{
  "error": "You don't have permission for this action",
  "status": 403
}
```

### 404 Not Found
```json
{
  "error": "Recipe not found",
  "status": 404
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "status": 500
}
```

---

## Rate Limiting
Currently not implemented. To be added in production.

## Pagination
All list endpoints return paginated results. Use `page` and `limit` query parameters.

## Sorting
Default: Most recent first (created_at DESC)

## Filtering
- Search: Full-text search in title and description
- Category: Filter by recipe category
- User: Filter recipes by user ID
