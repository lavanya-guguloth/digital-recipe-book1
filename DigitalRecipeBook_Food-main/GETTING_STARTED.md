# 🚀 Getting Started - Digital Recipe Book

Complete guide to get your Digital Recipe Book application up and running in 30 minutes.

---

## ⚡ 30-Minute Quick Start

### Phase 1: Code to GitHub (5 minutes)

```bash
# Navigate to project
cd g:\DigitalRecipeBook_Food

# Initialize git
git init

# Configure git
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: Sprint 1 scaffolding complete"

# Add remote
git remote add origin https://github.com/umeshchandracholleti/DigitalRecipeBook_Food.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Verify**: Check GitHub repository - all files should be there ✅

---

### Phase 2: Setup Supabase (10 minutes)

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Login
3. Click "New Project"
4. Fill in:
   - **Name**: DigitalRecipeBook
   - **Password**: Generate strong password
   - **Region**: Closest to you
5. Wait 2-3 minutes for creation
6. Go to "SQL Editor" → "+ New Query"
7. Open `backend/database/schema.sql`
8. Copy entire content → Paste into SQL editor
9. Click "Run" ✅
10. Go to "Settings" → "API" → Copy:
    - **Project URL**
    - **Anon Key**
    - **Service Key**

Save these credentials!

---

### Phase 3: Configure Environment (5 minutes)

**Create `backend/.env`**:
```
NODE_ENV=production
PORT=5000
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
JWT_SECRET=generate-random-32-char-string
JWT_EXPIRE=7d
```

**Generate JWT_SECRET**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Create `frontend/.env`**:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_BASE_URL=http://localhost:5000
```

---

### Phase 4: Local Development (10 minutes)

#### Terminal 1 - Backend

```bash
cd backend
npm install
npm start
```

**Expected Output**:
```
Server running on port 5000
✅ Database connected
✅ Ready for requests
```

**Test health endpoint**:
```bash
curl http://localhost:5000/api/health
```

#### Terminal 2 - Frontend

```bash
cd frontend
npm install
npm run dev
```

**Expected Output**:
```
Local: http://localhost:5173
Press 'r' to restart
Press 'o' to open in browser
```

Visit: http://localhost:5173 in browser ✅

---

## 📋 Detailed Setup Guides

### 1. GitHub Setup
👉 [GITHUB_SETUP_GUIDE.md](./GITHUB_SETUP_GUIDE.md)
- Initialize git repository
- Configure GitHub
- Push code to repository
- Setup branch protection

### 2. Supabase Database Setup
👉 [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)
- Create Supabase project
- Execute database schema
- Configure authentication
- Setup Row Level Security

### 3. API Documentation
👉 [backend/API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md)
- All 19+ API endpoints
- Request/response examples
- Authentication setup
- Error handling

### 4. Deployment to Production
👉 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Backend deployment (Render)
- Frontend deployment (Netlify)
- Environment configuration
- Monitoring and logs

---

## 🧪 Testing Your Setup

### Step 1: Test Backend API

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Should return:
{
  "status": "OK",
  "message": "Server is running"
}
```

### Step 2: Test User Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123",
    "firstName": "Test",
    "lastName": "User"
  }'

# Should return:
{
  "message": "User registered successfully",
  "user": { "id": "...", "email": "test@example.com" },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Step 3: Test Frontend

1. Open http://localhost:5173
2. Click "Sign Up"
3. Enter email: test@example.com
4. Enter password: TestPassword123
5. Click "Register"
6. Should redirect to dashboard ✅

### Step 4: Check Database

In Supabase dashboard:
1. Click "Table Editor"
2. Click "users"
3. Should see your test user ✅

---

## 📁 Project Structure

```
DigitalRecipeBook_Food/
├── frontend/                     # React app
│   ├── src/
│   │   ├── pages/               # All pages
│   │   ├── components/          # Reusable components
│   │   ├── context/             # Global state
│   │   ├── services/            # API services
│   │   └── styles/              # CSS files
│   ├── package.json
│   ├── vite.config.js
│   └── .env                     # Your environment variables
│
├── backend/                      # Express.js API
│   ├── src/
│   │   ├── controllers/         # Business logic
│   │   ├── models/              # Database models
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Auth, error handling
│   │   ├── utils/               # Utilities
│   │   └── config/              # Configuration
│   ├── database/
│   │   └── schema.sql           # Database schema
│   ├── package.json
│   ├── server.js                # Entry point
│   └── .env                     # Your environment variables
│
├── Documentation
│   ├── API_DOCUMENTATION.md     # All endpoints
│   ├── DEPLOYMENT_GUIDE.md      # Deployment steps
│   ├── GITHUB_SETUP_GUIDE.md    # Git/GitHub setup
│   ├── SUPABASE_SETUP_GUIDE.md  # Database setup
│   ├── START_HERE.md            # Quick start
│   └── GETTING_STARTED.md       # This file
│
└── .gitignore                   # Git ignore rules
```

---

## 🔄 Development Workflow

### Daily Development

```bash
# 1. Pull latest changes
git pull origin main

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Start development servers
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend  
cd frontend && npm run dev

# 4. Make changes and test

# 5. Commit changes (frequently)
git add .
git commit -m "feat: add feature description"

# 6. Push to GitHub
git push origin feature/my-feature

# 7. Create Pull Request on GitHub

# 8. Once merged, pull new changes
git pull origin main
```

### Adding New Features

See feature templates in: [AGILE_SPRINT_PLANNING.md](./AGILE_SPRINT_PLANNING.md)

Each feature includes:
- User story format
- Acceptance criteria
- Required files
- Testing checklist

---

## 📚 Essential Topics

### Authentication (Already Implemented)
- JWT tokens
- Password hashing (bcrypt)
- Protected routes
- Token refresh logic

**Implementation in**: 
- `backend/src/middleware/auth.js` - Token validation
- `backend/src/controllers/authController.js` - Register/Login
- `frontend/src/context/AuthContext.jsx` - State management

### API Integration (Ready to Use)
- Axios with interceptors
- Automatic token injection
- Error handling
- Request/response transformation

**Using the API**:
```javascript
import { authService } from '../services/authService';

// Register
const user = await authService.register({
  email, password, firstName, lastName
});

// Login
const result = await authService.login(email, password);

// Get current user
const user = await authService.getCurrentUser();
```

### Database Queries (Supabase Ready)
- All 8 tables created
- Relationships configured
- Indexes for performance
- Row Level Security enabled

**Making queries**:
```javascript
import { supabase } from '../config/database';

// Fetch recipes
const { data, error } = await supabase
  .from('recipes')
  .select('*')
  .eq('is_public', true);

// Insert recipe
const { data, error } = await supabase
  .from('recipes')
  .insert([{ title: 'My Recipe', user_id: userId }]);
```

---

## 🐛 Troubleshooting

### Backend won't start

```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID> /F

# Check environment variables
echo %SUPABASE_URL%

# Check node version
node --version  # Should be v18 or higher
```

### Frontend shows blank page

```bash
# Check browser console for errors
# Press F12 → Console tab

# Check if API is running
curl http://localhost:5000/api/health

# Check environment variables
cat frontend/.env
```

### Cannot connect to Supabase

```bash
# Verify credentials
# 1. Check SUPABASE_URL is correct
# 2. Check SUPABASE_ANON_KEY is valid
# 3. Check project status in Supabase dashboard

# Test connection
node -e "
const { createClient } = require('@supabase/supabase-js');
const s = createClient('YOUR_URL', 'YOUR_KEY');
s.from('users').select().then(r => console.log(r));
"
```

### Database schema not created

```bash
# Re-run schema in Supabase SQL Editor
# 1. Go to SQL Editor
# 2. New Query
# 3. Copy/paste backend/database/schema.sql
# 4. Run

# Verify tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

---

## ✅ Pre-Production Checklist

Before deploying to production:

```
Backend
☐ All environment variables set correctly
☐ Database schema executed and verified
☐ JWT secret is random and strong
☐ Password hashing using bcrypt
☐ CORS configured for production domain
☐ Error handling properly logging
☐ No console.log in production code
☐ All API tests passing

Frontend
☐ API base URL points to backend
☐ Environment variables configured
☐ Build successful: npm run build
☐ No errors in dist/ folder
☐ Form validation working
☐ Authentication flow complete
☐ Protected routes redirecting properly
☐ Responsive design tested

Database
☐ All 8 tables created
☐ Row Level Security policies active
☐ Indexes created for performance
☐ Backup configured
☐ Connection pooling enabled

Deployment
☐ GitHub repository pushed
☐ Render account created
☐ Netlify account created
☐ Supabase project created
☐ All credentials saved securely
☐ CI/CD workflows configured
☐ SSL certificates enabled
```

---

## 📞 Support Resources

| Topic | Resource |
|-------|----------|
| React | [react.dev](https://react.dev) |
| Express | [expressjs.com](https://expressjs.com) |
| Supabase | [supabase.com/docs](https://supabase.com/docs) |
| PostgreSQL | [postgresql.org/docs](https://postgresql.org/docs) |
| Vite | [vitejs.dev](https://vitejs.dev) |
| Tailwind | [tailwindcss.com](https://tailwindcss.com) |
| JWT | [jwt.io](https://jwt.io) |

---

## 🎯 Next Steps

### Immediate (Today)
1. ✅ Push code to GitHub
2. ✅ Setup Supabase database
3. ✅ Configure environment variables
4. ✅ Run locally and test

### This Week
1. Complete Sprint 1 recipe CRUD endpoints
2. Implement all form components
3. Test authentication thoroughly
4. Deploy to production (Render + Netlify)

### Next Sprint
1. Implement reviews system
2. Build meal planning features
3. Create shopping list functionality
4. Add analytics dashboard

---

## 🎉 You're Ready!

Your Digital Recipe Book application is fully scaffolded and ready for feature development.

**Current Status**:
- ✅ Frontend: React setup complete, all pages created
- ✅ Backend: Express API ready, authentication system done
- ✅ Database: Supabase schema ready to execute
- ✅ Documentation: Complete guides for setup and deployment

**Start here**: Follow [GITHUB_SETUP_GUIDE.md](./GITHUB_SETUP_GUIDE.md) → [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) → Run locally → Deploy!

---

**Questions?** Check the relevant guide or search documentation links above.

**Ready to start building?** 🚀 Let's go!

