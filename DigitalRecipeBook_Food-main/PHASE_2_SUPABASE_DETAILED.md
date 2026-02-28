# Phase 2: Setup Supabase - COMPLETE WALKTHROUGH

## 📋 Quick Checklist
Follow these steps in order. Estimated time: **15-20 minutes**

---

## Step 1️⃣ Create Supabase Account (2 min)

1. Open browser: https://supabase.com
2. Click "Sign Up" (top right)
3. Choose authentication (GitHub, Google, or Email)
4. Complete signup

✅ **You'll see**: Supabase dashboard

---

## Step 2️⃣ Create New Project (2 min)

1. In dashboard, click "New Project" (or top left "+ New")
2. You'll see a form with these fields:

   | Field | Value |
   |-------|-------|
   | Organization | Select your org (or create new) |
   | Project Name | `DigitalRecipeBook` |
   | Database Password | Generate strong password** |
   | Region | Select closest to you |
   | Pricing Plan | Free (perfectly fine for testing) |

   **Generate strong password**: Min 12 chars, mixed case, numbers, symbols
   Example: `MyDb@Pass123!2024`

3. Click "Create new project"
4. ⏳ **WAIT 2-3 MINUTES** for project initialization
5. You'll see a message: "Project is being set up..."

✅ **You'll see**: Green checkmark, "Connected"

---

## Step 3️⃣ Get Your API Credentials (2 min)

Once project is created:

1. Left sidebar → Click "Settings" → "API"
2. You'll see several values. Copy these THREE (save in notepad):

   ```
   Project URL:
   https://xxxxxxxxxxxxx.supabase.co
   
   Anon Key:
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   Service Role Key (Secret - keep safe!):
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

📌 **IMPORTANT**: 
- Keep these safe
- Service Key = TOP SECRET (never share, never commit to git)
- Anon Key = Can be used in frontend
- Project URL = Connection string

✅ **Copied all three?** → Move to next step

---

## Step 4️⃣ Execute Database Schema (3 min)

1. Left sidebar → Click "SQL Editor"
2. Click "+ New Query"
3. Clear any template text (select all, delete)
4. Now you need to copy the SQL schema:

   - Go to: `backend/database/schema.sql` in your project
   - Select ALL the SQL code (Ctrl+A)
   - Copy it (Ctrl+C)

5. Back in Supabase SQL Editor → Paste the SQL (Ctrl+V)
6. You should see 250+ lines of SQL code
7. Click "Run" button (▶️ play icon on top right)
8. ⏳ Wait 5-10 seconds...

✅ **Expected**: Green message "1 completed successfully"

❌ **If you see errors**:
- Check SQL syntax (copy fresh from schema.sql)
- Try running again
- Check you have correct project selected

---

## Step 5️⃣ Verify Tables Created (2 min)

1. Left sidebar → Click "Table Editor"
2. Look for these 8 tables in the list:

   ```
   ✅ public.users
   ✅ public.recipes
   ✅ public.ingredients
   ✅ public.reviews
   ✅ public.meal_plans
   ✅ public.meal_plan_items
   ✅ public.shopping_lists
   ✅ public.shopping_list_items
   ```

3. Click each one to verify columns are there

✅ **All 8 tables visible?** → Phase 2 is COMPLETE!

---

## Step 6️⃣ Enable Authentication (1 min)

1. Left sidebar → Click "Authentication"
2. Click "Providers"
3. Make sure "Email" is enabled (it should be by default)
4. You can also enable Google, GitHub (optional)

✅ **Done!** Authentication is ready

---

## 📝 What You Now Have

After completing Phase 2:
- ✅ Supabase project created
- ✅ 8 database tables with relationships
- ✅ Row Level Security policies active
- ✅ Credentials ready to use
- ✅ Authentication configured

---

## 🔑 Next: Save Your Credentials

You'll need these for Phase 3 (running locally).

**Copy these values into a safe text file** for the next step:

```
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

---

## ⏱️ Estimated Timing

| Task | Time |
|------|------|
| Create account | 2 min |
| Create project | 2 min (+ 2-3 min wait) |
| Get credentials | 2 min |
| Execute schema | 3 min |
| Verify tables | 2 min |
| Enable auth | 1 min |
| **TOTAL** | **15 min** |

---

## 🆘 Troubleshooting

### "Project stuck on 'setting up'"
- Wait another minute
- Refresh page (F5)
- If still stuck, try creating a new project

### "SQL error when running schema"
- Copy schema fresh from `backend/database/schema.sql`
- Make sure you selected ALL the SQL
- Try running again

### "Can't find Table Editor"
- Make sure project is fully created
- Click project name → should see Dashboard
- Left sidebar → look for "Table Editor"

### "Tables not showing"
- Click another project then back
- Refresh page
- Check Project URL is correct

---

## ✅ Checklist

Before moving to Phase 3, verify:

```
✅ Supabase account created
✅ Project "DigitalRecipeBook" created
✅ Credentials copied and saved
✅ Database schema executed
✅ All 8 tables visible
✅ Authentication enabled
✅ Ready to use credentials
```

**All checked?** → Ready for Phase 3!

---

## 🎯 Next Step

After Phase 2 is complete:
→ Go to [NEXT_STEPS_ACTION_PLAN.md](./NEXT_STEPS_ACTION_PLAN.md) Phase 3: Configure Environment & Run Locally

You'll use the credentials from Step 3 to create your `.env` files.

---

**Time to complete**: ~15 minutes  
**Complexity**: Easy (mostly clicking and copying)  
**Can I automate this?**: No, requires manual account creation on supabase.com

**Ready to do Phase 2?** Open https://supabase.com and follow the steps above!
