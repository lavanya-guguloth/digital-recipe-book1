# Phase 3: Quick Setup Instructions

## ✅ Files Created:
1. `backend/.env` - Backend environment variables
2. `frontend/.env` - Frontend environment variables  
3. JWT Secret generated: `5581515d6a62fa958252ebe4f9aa0ea37080cbc7cbfe24bb07c4eba725d54165`

---

## 📝 ACTION REQUIRED: Add Your Supabase Credentials

You need to replace the placeholders in BOTH .env files with your actual Supabase credentials.

### Step 1: Open Your Credentials

Open the notepad file where you saved your 3 Supabase values:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_KEY

### Step 2: Update backend/.env

**Open file**: `backend/.env`

**Find these lines** and replace with YOUR values:
```
SUPABASE_URL=PASTE_YOUR_SUPABASE_URL_HERE
SUPABASE_ANON_KEY=PASTE_YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_KEY=PASTE_YOUR_SERVICE_KEY_HERE
```

**Replace with** (use YOUR actual values):
```
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Save the file** (Ctrl+S)

### Step 3: Update frontend/.env

**Open file**: `frontend/.env`

**Find these lines** and replace with YOUR values:
```
VITE_SUPABASE_URL=PASTE_YOUR_SUPABASE_URL_HERE
VITE_SUPABASE_ANON_KEY=PASTE_YOUR_ANON_KEY_HERE
```

**Replace with** (use YOUR actual values - same URL and Anon Key):
```
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Save the file** (Ctrl+S)

---

## ⚠️ Important Notes:

- JWT_SECRET is already filled in - don't change it
- Use the SAME Supabase URL in both files
- Use the SAME Anon Key in both files  
- Service Key only goes in backend/.env (never in frontend!)
- Don't commit these files to Git (they're in .gitignore)

---

## ✅ When Done:

After you've updated both .env files with your credentials, reply: **"Credentials added"**

Then I'll install dependencies and start the servers!

