# 🔧 Fix Recipe Creation - Database Schema Update Required

## Problem
The recipes table in Supabase is missing some required columns. That's why you can't add recipes yet!

## Solution - 3 Easy Steps

### Step 1: Open Supabase SQL Editor
1. Go to https://app.supabase.com/
2. Click on your **DigitalRecipeBook** project
3. On the left sidebar, find **SQL Editor**
4. Click **New Query**

### Step 2: Paste This SQL Script

Copy and paste this entire SQL script into the SQL editor:

```sql
-- Ensure recipes table has all required columns
ALTER TABLE IF EXISTS recipes
ADD COLUMN IF NOT EXISTS prep_time INTEGER DEFAULT 15,
ADD COLUMN IF NOT EXISTS cook_time INTEGER DEFAULT 30,
ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'other',
ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Create ingredients table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.ingredients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id uuid REFERENCES public.recipes(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  quantity DECIMAL(10,2),
  unit TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create reviews table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id uuid REFERENCES public.recipes(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS if not already enabled
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ingredients
DROP POLICY IF EXISTS "Anyone can view ingredients" ON public.ingredients;
CREATE POLICY "Anyone can view ingredients" ON public.ingredients
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert ingredients" ON public.ingredients;
CREATE POLICY "Users can insert ingredients" ON public.ingredients
  FOR INSERT WITH CHECK (true);

-- RLS Policies for reviews  
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own reviews" ON public.reviews;
CREATE POLICY "Users can insert their own reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_recipes_user_id ON public.recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_category ON public.recipes(category);
CREATE INDEX IF NOT EXISTS idx_recipes_is_public ON public.recipes(is_public);
CREATE INDEX IF NOT EXISTS idx_ingredients_recipe_id ON public.ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_reviews_recipe_id ON public.reviews(recipe_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
```

### Step 3: Execute & Verify

1. Click the **▶ Run** button (or press **Ctrl+Enter**)
2. Wait for the script to complete - you should see **✓ Success**
3. If there are any errors, they will appear in red - let me know!

---

## After The Fix

Once the SQL runs successfully:

### Option A: Add Sample Recipes Automatically
```bash
cd g:\DigitalRecipeBook_Food\backend
node src/scripts/addSampleRecipes.js
```

This will add 8 sample recipes to your database!

### Option B: Create Your Own Recipe
1. Go to: https://deft-bombolone-5d4f6b.netlify.app/
2. Login with your account
3. Click "Create Recipe" button
4. Fill in the form and submit!

---

## ✅ Verification Checklist

After running the SQL and creating recipes:

- [ ] Go to Dashboard: https://deft-bombolone-5d4f6b.netlify.app/dashboard
- [ ] You should see recipes displayed
- [ ] Search functionality works
- [ ] Can click on recipes to view details
- [ ] Can view ingredients and reviews
- [ ] Can add your own review with rating

---

## What The SQL Does

| SQL Command | Purpose |
|-------------|---------|
| `ALTER TABLE recipes` | Adds missing columns to recipes table |
| `CREATE TABLE ingredients` | Stores all ingredients for recipes |
| `CREATE TABLE reviews` | Stores user ratings and comments |
| `ENABLE ROW LEVEL SECURITY` | Ensures data privacy |
| `CREATE POLICY` | Sets up access rules |
| `CREATE INDEX` | Improves query performance |

---

## Troubleshooting

### Error: "Column already exists"
✓ This is fine! The script uses `IF NOT EXISTS` to skip existing columns

### Error: "Permission denied"
- Make sure you're logged into Supabase as the project owner
- Check your connection to the database

### Script completed but recipes still won't create
- Clear your browser cache (Ctrl+Shift+Delete)
- Refresh the app with Ctrl+F5
- Try creating a new recipe

---

## Still Having Issues?

Let me know the exact error message and I can help debug further!

**Status**: Once the SQL runs ✓, your recipe system will be fully functional! 🎉
