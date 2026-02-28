# Deployment Guide - Digital Recipe Book

Complete step-by-step guide to deploy the Digital Recipe Book application to production.

---

## 📋 Pre-Deployment Checklist

- [ ] GitHub repository created and code pushed
- [ ] Supabase project created and schema executed
- [ ] Environment variables configured
- [ ] All tests passing locally
- [ ] Dependencies verified
- [ ] `.env` files excluded from git
- [ ] Frontend build optimized
- [ ] Backend security headers configured
- [ ] Render account created
- [ ] Netlify account created
- [ ] Custom domain configured (optional)

---

## 🗄️ Part 1: Database Setup - Supabase

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or login
3. Click "New Project"
4. Fill in:
   - **Project Name**: `DigitalRecipeBook`
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to users
5. Click "Create new project" (wait 2-3 minutes)

### Step 2: Execute Database Schema

1. Go to project dashboard
2. Click "SQL Editor" → "New Query"
3. Open [backend/database/schema.sql](../backend/database/schema.sql)
4. Copy entire content
5. Paste into SQL editor
6. Click "Run" (executes all 8 tables with relationships and RLS policies)
7. Wait for completion ✅

### Step 3: Get Supabase Credentials

1. Click "Settings" → "API"
2. Copy and save:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon Key**: (public key for frontend)
   - **Service Key**: (secret key for backend only)

### Step 4: Set RLS Policies (Row Level Security)

1. Go to "Authentication" → "Policies"
2. Verify policies are created for:
   - `users` table: Users see own profile
   - `recipes` table: Users see public recipes + own recipes
   - `reviews` table: Anyone can read, users can create/update own

All policies are in `schema.sql` - they execute automatically.

---

## 🔧 Part 2: Environment Configuration

### Backend Environment (.env)

Create `backend/.env`:

```
# Node
NODE_ENV=production

# Server
PORT=5000
CLIENT_URL=https://your-netlify-domain.netlify.app

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-key-here

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_BUCKET_NAME=recipe-images
```

**Generate JWT_SECRET**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend Environment (.env)

Create `frontend/.env.production`:

```
VITE_API_BASE_URL=https://your-render-deployment.onrender.com
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 🚀 Part 3: Backend Deployment - Render

### Step 1: Connect Repository to Render

1. Go to [render.com](https://render.com)
2. Sign up/login with GitHub
3. Click "New +" → "Web Service"
4. Select your GitHub repository
5. Fill in:
   - **Name**: `digitalrecipebook-api`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

### Step 2: Set Environment Variables

1. Scroll to "Environment" section
2. Add each variable from `backend/.env`:
   - NODE_ENV: `production`
   - PORT: `5000`
   - CLIENT_URL: `https://your-netlify-domain.netlify.app`
   - SUPABASE_URL: (from Supabase)
   - SUPABASE_ANON_KEY: (from Supabase)
   - SUPABASE_SERVICE_KEY: (from Supabase)
   - JWT_SECRET: (generated secret)
   - JWT_EXPIRE: `7d`

### Step 3: Deploy

1. Click "Create Web Service"
2. Wait for deployment (3-5 minutes)
3. Get API URL: `https://your-render-deployment.onrender.com`
4. Test health endpoint:
   ```bash
   curl https://your-render-deployment.onrender.com/api/health
   ```

### Step 4: Configure Auto-Deploy

1. Go to "Settings" in Render dashboard
2. Enable "Auto-Deploy on Push"
3. Connected to GitHub repository's `main` branch

---

## 🎨 Part 4: Frontend Deployment - Netlify

### Step 1: Connect Repository to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Fill in:
   - **Team**: Your team
   - **Repository**: Your repo
   - **Branch to deploy**: `main`

### Step 2: Configure Build Settings

1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. **Base directory**: `frontend`

Netlify.toml already configured - should auto-detect.

### Step 3: Set Environment Variables

1. Go to "Site Settings" → "Build & Deploy" → "Environment"
2. Click "Edit variables"
3. Add:
   - `VITE_API_BASE_URL`: `https://your-render-deployment.onrender.com`
   - `VITE_SUPABASE_URL`: (from Supabase)
   - `VITE_SUPABASE_ANON_KEY`: (from Supabase)

### Step 4: Deploy

1. Click "Deploy site"
2. Wait for build (2-3 minutes)
3. Get URL: `https://your-site-name.netlify.app`
4. Test frontend loads

### Step 5: Enable Auto-Deploy

Auto-enabled by default - every `main` branch push deploys automatically.

---

## 🔗 Part 5: Connect Frontend to Backend

### Step 1: Update Frontend Environment

1. In `frontend/.env.production`:
   ```
   VITE_API_BASE_URL=https://your-render-deployment.onrender.com
   ```

2. Commit and push
3. Netlify auto-deploys

### Step 2: Verify Connection

1. Go to frontend URL
2. Try logging in
3. Check if registration works
4. Monitor Network tab for API calls to backend

### Step 3: Test Full Flow

```
1. Register new account
2. Verify user in Supabase: Auth → Users
3. Login with new credentials
4. Create a recipe
5. Check database: recipes table has new entry
6. Log out and refresh - redirect to login ✅
```

---

## 🔐 Production Security Checklist

- [ ] JWT_SECRET is random and 32+ characters
- [ ] SUPABASE_SERVICE_KEY only in backend (never in frontend)
- [ ] CORS configured for production domain only
- [ ] Environment variables never committed to git
- [ ] HTTPS enforced on all domains
- [ ] Password hashing using bcrypt (12 rounds)
- [ ] Rate limiting enabled (in production)
- [ ] SQL injection protection via parameterized queries
- [ ] XSS protection via content-type headers
- [ ] CSRF token validation on state-changing requests

---

## 📊 Monitoring & Logs

### Backend Logs - Render

1. Go to Render dashboard
2. Select your web service
3. Click "Logs"
4. Monitor startup errors and API calls

### Frontend Logs - Netlify

1. Go to Netlify dashboard
2. Select your site
3. Click "Deploys"
4. View build logs
5. Check "Analytics" for traffic

### Database Logs - Supabase

1. Go to Supabase dashboard
2. Click "Database" → "Query Performance"
3. Monitor slow queries
4. Check "Logs" tab for errors

---

## 🐛 Troubleshooting Deployment

### Issue: Backend won't start

**Solution**:
- Check environment variables are set
- Verify Supabase credentials are correct
- Check logs: `Render Dashboard → Logs`
- Ensure package.json has correct start script

### Issue: Frontend shows 404 errors

**Solution**:
- Verify API base URL in `.env.production`
- Check CORS configuration matches frontend domain
- Ensure backend is deployed and healthy
- Check browser console for errors

### Issue: Database connection fails

**Solution**:
- Verify Supabase URL and keys are correct
- Check Supabase project is running
- Ensure schema was executed successfully
- Test connection: `supabase-js` client initialization

### Issue: User registration not working

**Solution**:
```bash
# Check backend logs for validation errors
# Verify Supabase auth is enabled
# Check email format is valid
```

---

## 📈 Performance Optimization

### Frontend (Netlify)

```bash
# Built into framework
- Code splitting: Vite auto-splits chunks
- Tree shaking: Remove unused code
- Lazy loading: Components load on demand
- Caching: CDN caches built assets
```

### Backend (Render)

```bash
# Database
- Indexes on frequently queried columns
- Connection pooling via Supabase
- Query optimization in models

# Server
- Gzip compression enabled
- Caching headers configured via render.yaml
- Static file serving optimized
```

---

## 🔄 Continuous Deployment Workflow

```
1. Push code to main branch
   ↓
2. GitHub triggers workflows
   ↓
3. Backend deploys to Render (if backend/* changed)
   ↓
4. Frontend deploys to Netlify (if frontend/* changed)
   ↓
5. Environment variables auto-updated
   ↓
6. Health checks verify deployment success
```

---

## 📞 Support & Resources

| Issue | Resource |
|-------|----------|
| Supabase | [docs.supabase.com](https://docs.supabase.com) |
| Render | [render.com/docs](https://render.com/docs) |
| Netlify | [docs.netlify.com](https://docs.netlify.com) |
| React | [react.dev](https://react.dev) |
| Express | [expressjs.com](https://expressjs.com) |

---

**Deployment Completed**: Your app is now live in production! 🎉

**Next Steps**:
1. Monitor performance and logs
2. Gather user feedback
3. Plan Sprint 2 features
4. Setup custom domain (optional)
5. Enable email notifications (optional)

