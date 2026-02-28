# Render and Netlify Deployment Guide

## Overview
This guide will help you deploy the Digital Recipe Book:
- **Backend API** → Render
- **Frontend** → Netlify

---

## Part 1: Backend Deployment (Render)

### Prerequisites
- GitHub repository with your code pushed
- Render account (https://render.com)

### Step 1: Connect GitHub to Render
1. Go to [render.com](https://render.com) and sign up/log in
2. Click the **GitHub icon** to connect your GitHub account
3. Authorize Render to access your repositories
4. Select the repository containing your code

### Step 2: Create a New Web Service
1. Click **New +** button → Select **Web Service**
2. Search for and select your `digital-recipe-book1` repository
3. Click **Connect**

### Step 3: Configure the Web Service
Fill in the following settings:

| Field | Value |
|-------|-------|
| **Name** | `digital-recipe-book-api` |
| **Environment** | `Node` |
| **Root Directory** | `DigitalRecipeBook_Food-main/backend` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Starter` (free tier) |

### Step 4: Add Environment Variables
Click **Environment** section and add these variables:

```
NODE_ENV = production
PORT = 5000
JWT_SECRET = [Generate a random string or click Generate]
JWT_EXPIRE = 7d
MAX_FILE_SIZE = 5242880
UPLOAD_DIR = ./uploads
DB_HOST = your_supabase_host.supabase.co
DB_PORT = 5432
DB_USER = postgres
DB_PASSWORD = [Your Supabase password]
DB_NAME = postgres
DATABASE_URL = postgresql://postgres:[password]@[host]:5432/postgres
FRONTEND_URL = https://[your-netlify-domain].netlify.app
```

**How to get Supabase credentials:**
1. Go to [supabase.com](https://supabase.com)
2. Create/access your project
3. Go to Settings → Database
4. Copy the connection string or individual credentials

### Step 5: Deploy
1. Click **Create Web Service**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Build and start your application
3. Once deployed, you'll get a URL like: `https://digital-recipe-book-api.onrender.com`
4. **Copy this URL** - you'll need it for Netlify setup

### Step 6: Enable Auto Deploys (Optional)
- In Render dashboard, go to Service Settings
- Enable **Auto Deploy** to redeploy on every GitHub push

---

## Part 2: Frontend Deployment (Netlify)

### Prerequisites
- Your Render API URL (from Part 1, Step 5)
- Netlify account (https://netlify.com)

### Step 1: Connect GitHub to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/log in
2. Click **Add new site** button
3. Select **Import an existing project** → **GitHub**
4. Authorize Netlify to access your GitHub
5. Select your `digital-recipe-book1` repository
6. Click **Open** or **Import**

### Step 2: Configure Build Settings
You'll see a deploy configuration screen. Fill in:

| Field | Value |
|-------|-------|
| **Team** | Select your team |
| **Base directory** | `DigitalRecipeBook_Food-main/frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |

### Step 3: Add Environment Variables
Before deploying, set environment variables:
1. Click **Edit variables** (or skip to set later)
2. Add:
   ```
   VITE_API_URL = https://digital-recipe-book-api.onrender.com
   VITE_NODE_ENV = production
   VITE_APP_NAME = Digital Recipe Book
   ```
   Replace the `VITE_API_URL` with your actual Render API URL

### Step 4: Deploy
1. Click **Deploy site**
2. Netlify will:
   - Clone your repository
   - Install dependencies
   - Build your frontend
   - Deploy to CDN
3. Once complete, you'll get a URL like: `https://digital-recipe-book1.netlify.app`

### Step 5: Update Backend CORS
Now that you have your Netlify URL:
1. Go back to **Render dashboard**
2. Select your backend service
3. Go to **Environment** → Edit `FRONTEND_URL`
4. Set it to your Netlify URL (from Step 4)
5. Click **Save** - Render will automatically redeploy with the new CORS setting

---

## Part 3: Post-Deployment Testing

### Health Check
Test your backend API:
```
https://digital-recipe-book-api.onrender.com/api/health
```
Should return: `{ "status": "API is running", "timestamp": "..." }`

### Full Test Flow
1. **Visit your Netlify frontend URL**
2. **Test User Registration**
   - Fill in the registration form
   - Check that user is created in Supabase
3. **Test Login**
   - Log in with your credentials
4. **Test Recipe Creation**
   - Create a new recipe
   - Upload a photo
   - Verify the photo uploads correctly
5. **Test Recipe View**
   - View your recipes in "My Recipes"
   - Click to view recipe details

### Common Issues

| Issue | Solution |
|-------|----------|
| **"API not responding"** | Check Render service status, verify FRONTEND_URL is set |
| **"CORS error"** | Ensure FRONTEND_URL in Render matches your Netlify URL exactly |
| **"Can't upload photos"** | Check MAX_FILE_SIZE and UPLOAD_DIR in Render environment |
| **"Database connection failed"** | Verify DATABASE_URL and credentials in Render environment |

---

## Part 4: Git Commit & Push

After all configuration files are created, commit them:

```bash
git add .
git commit -m "Add deployment configurations for Render and Netlify"
git push
```

---

## Monitoring & Logs

### View Render Logs
1. Render dashboard → Select your web service
2. Click **Logs** tab
3. Watch for errors during requests

### View Netlify Logs
1. Netlify dashboard → Select your site
2. Click **Deploys** tab
3. Select a deploy to see build logs

---

## Next Steps

1. ✅ Set up environment variables in Render
2. ✅ Deploy backend to Render
3. ✅ Deploy frontend to Netlify
4. ✅ Update Render's FRONTEND_URL with Netlify URL
5. ✅ Test complete flow
6. ✅ Monitor logs for issues
7. Set up domain name (optional - both services support custom domains)

---

## Useful Links
- [Render Documentation](https://render.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Supabase Documentation](https://supabase.com/docs)
