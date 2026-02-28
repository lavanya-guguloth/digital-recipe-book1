# Supabase Database Setup Guide

Complete guide to setup Supabase and execute the database schema for Digital Recipe Book.

---

## 🚀 Part 1: Create Supabase Project

### Step 1: Sign Up / Login

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Sign Up" (or log in if you have account)
3. Choose authentication method:
   - GitHub
   - Google
   - Email

### Step 2: Create New Project

1. After login, click "New Project"
2. Select organization (create one if needed)
3. Fill in project details:

| Field | Value |
|-------|-------|
| Project Name | `DigitalRecipeBook` |
| Database Password | Generate strong password (min 12 chars) |
| Region | Select closest to your target users |
| Pricing Plan | Free tier (perfect for testing) |

**Generate Strong Password**:
```
MinLength: 12 characters
Include: uppercase, lowercase, numbers, special chars
Example: MyP@ssw0rd!Recipe2024
```

4. Click "Create new project"
5. **Wait 2-3 minutes** for project initialization

### Step 3: Access Project Dashboard

When ready, you'll see:
- Project name
- Database status: "Available"
- API keys and URLs

---

## 📊 Part 2: Set Up Database Schema

### Step 1: Open SQL Editor

1. In Supabase dashboard, click "SQL Editor" (left sidebar)
2. Click "+ New Query" or "New Query"
3. Clear default template (select all, delete)

### Step 2: Copy Database Schema

1. Open file: `backend/database/schema.sql`
2. Copy entire content
3. Paste into SQL editor query box

**Files included in schema.sql**:

```
✅ Users table with authentication
✅ Recipes table with metadata
✅ Ingredients table with relations
✅ Reviews/ratings table
✅ Meal Plans table
✅ Meal Plan Items table
✅ Shopping Lists table
✅ Shopping List Items table
✅ Indexes for performance
✅ Row Level Security (RLS) policies
```

### Step 3: Execute Schema

1. Click "Run" button (⏯️)
2. Watch query execute (should take 5-10 seconds)
3. See confirmation: "1 completed successfully"

**Expected Output**:
```
All rows affected successfully
Query executed successfully
No errors
```

### Step 4: Verify Table Creation

1. Click "Table Editor" (left sidebar)
2. Should see 8 tables listed:
   - ✅ users
   - ✅ recipes
   - ✅ ingredients
   - ✅ reviews
   - ✅ meal_plans
   - ✅ meal_plan_items
   - ✅ shopping_lists
   - ✅ shopping_list_items

3. Click each table to verify structure

---

## 🔑 Part 3: Get API Credentials

### Step 1: Navigate to Settings

1. In Supabase dashboard, click "Settings" (left sidebar)
2. Click "API" tab

### Step 2: Copy Credentials

You'll see several keys. **Save these securely**:

```
Project URL:
https://xxxxx.supabase.co

Anon Key (Public - for frontend):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Service Key (Secret - for backend only!):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ IMPORTANT**: 
- Service Key is secret - never commit to git or expose publicly
- Anon Key can be in frontend code (read-only access)

### Step 3: Store in Environment Files

Create files (don't commit to git):

**backend/.env**:
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-key-here
```

**frontend/.env**:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**frontend/.env.production**:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 🔐 Part 4: Enable Authentication

### Step 1: Setup Auth Providers

1. Click "Authentication" → "Providers"
2. Enable providers:
   - Email (enabled by default)
   - Other: Google, GitHub (optional)

### Step 2: Configure Email Settings

1. Click "Email" provider
2. Set:
   - Email Confirmations: On
   - Confirm email: Check
   - Auto-confirm in development: Off (use for testing)

### Step 3: Test Auth

In Supabase SQL Editor, run:
```sql
-- Check if auth is working
SELECT * FROM auth.users;
```

Should return empty initially (no users yet).

---

## 🔒 Part 5: Verify Row Level Security (RLS)

### Step 1: Check RLS Policies

1. Click "Authentication" → "Policies"
2. Verify policies are created for each table:

| Table | Policy | Effect |
|-------|--------|--------|
| users | select own profile | Users see only their row |
| recipes | select public + own | See public recipes + own recipes |
| reviews | select all, write own | Anyone reads, users write own |
| meal_plans | select own | Users see only their plans |

### Step 2: Test RLS in SQL Editor

```sql
-- Test 1: Insert test user
INSERT INTO users (email, password_hash) 
VALUES ('test@example.com', 'hashed_password');

-- Test 2: Verify RLS working
SELECT * FROM users;
-- Should only show current user's row if RLS on

-- Test 3: Insert recipe
INSERT INTO recipes (user_id, title, description)
VALUES ('user-uuid', 'Test Recipe', 'Description');

-- Test 4: Verify policy
SELECT * FROM recipes;
```

---

## 📁 Part 6: Verify Database Structure

### Step 1: Users Table

1. Click "Table Editor" → "users"
2. Expected columns:
   ```
   - id (UUID, primary key)
   - email (text, unique)
   - password_hash (text)
   - first_name (text)
   - last_name (text)
   - avatar_url (text)
   - bio (text)
   - created_at (timestamp)
   - updated_at (timestamp)
   ```

### Step 2: Recipes Table

1. Click "Table Editor" → "recipes"
2. Expected columns:
   ```
   - id (UUID, primary key)
   - user_id (UUID, foreign key → users)
   - title (text)
   - description (text)
   - instructions (text)
   - category (text)
   - difficulty_level (ENUM: easy, medium, hard)
   - cook_time_minutes (integer)
   - prep_time_minutes (integer)
   - servings (integer)
   - image_url (text)
   - is_public (boolean)
   - created_at (timestamp)
   - updated_at (timestamp)
   ```

### Step 3: Other Tables

Check tables:
- ingredients (with recipe_id FK)
- reviews (with recipe_id and user_id FK)
- meal_plans (with user_id FK)
- shopping_lists (with user_id FK)

---

## 🧪 Part 7: Test Connection from Backend

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Test Connection

Create file `test-supabase-connection.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xxxxx.supabase.co';
const supabaseKey = 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection
async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('✅ Connection successful!');
      console.log('Data:', data);
    }
  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
}

testConnection();
```

### Step 3: Run Test

```bash
node test-supabase-connection.js
```

**Expected Output**:
```
✅ Connection successful!
Data: []
```

---

## 🚀 Part 8: Setup Storage (Optional - for images)

### Step 1: Create Storage Bucket

1. Click "Storage" (left sidebar)
2. Click "Create a new bucket"
3. Name: `recipe-images`
4. Public or Private: Public (for image viewing)
5. Click "Create bucket"

### Step 2: Set Up Image Upload Path

Backend will upload to: `/recipe-images/{user_id}/recipe_{date}.jpg`

### Step 3: Configure CORS (if needed)

1. Click bucket settings
2. Add CORS header:
   ```
   https://your-frontend-domain.com
   ```

---

## ✅ Final Verification Checklist

```
✅ Supabase project created
✅ Database schema executed (8 tables)
✅ API credentials copied and saved
✅ Environment variables configured
✅ Authentication enabled and tested
✅ Row Level Security policies active
✅ Connection tested from backend
✅ Storage bucket created (optional)
✅ .env files added to .gitignore
✅ No credentials in git
```

---

## 🔗 Useful Supabase Links

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

---

## 🆘 Troubleshooting

### Issue: "Cannot connect to Supabase"

**Check**:
1. URL and keys are correct (no extra spaces)
2. Project status is "Available" in dashboard
3. Network connection works
4. Firewall allows connection

### Issue: "RLS policy denies access"

**Solution**:
1. Check policy is correct in schema.sql
2. Verify user is authenticated
3. Test with public table first

### Issue: "Foreign key constraint violation"

**Solution**:
1. Ensure parent record exists before inserting child
2. Check user_id exists in users table
3. Verify UUID format is correct

### Issue: "Table doesn't exist"

**Solution**:
1. Re-run schema.sql
2. Refresh browser
3. Check spelling in queries
4. Verify in Table Editor

---

**Done!** Supabase database is ready for connection. 🎉

**Next Step**: Connect backend and frontend to use the database!

