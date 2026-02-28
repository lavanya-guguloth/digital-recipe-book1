import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function migrateRecipesTable() {
  try {
    console.log('🔄 Checking recipes table schema...\n');

    // Get current table structure
    const { data, error } = await supabaseAdmin
      .from('recipes')
      .select()
      .limit(1);

    if (error) {
      console.error('❌ Error checking table:', error.message);
      process.exit(1);
    }

    console.log('✓ Recipes table exists\n');

    // Create the SQL migration script
    const sqlScript = `
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
CREATE POLICY "Anyone can view ingredients" ON public.ingredients
  FOR SELECT USING (true);

CREATE POLICY "Users can insert ingredients" ON public.ingredients
  FOR INSERT WITH CHECK (true);

-- RLS Policies for reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_recipes_user_id ON public.recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_category ON public.recipes(category);
CREATE INDEX IF NOT EXISTS idx_recipes_is_public ON public.recipes(is_public);
CREATE INDEX IF NOT EXISTS idx_ingredients_recipe_id ON public.ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_reviews_recipe_id ON public.reviews(recipe_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
`;

    console.log('📋 SQL Migration Script:');
    console.log('------------------------\n');
    console.log(sqlScript);
    console.log('\n------------------------');
    console.log('⚠️  You need to run this SQL in Supabase:');
    console.log('1. Open https://app.supabase.com/');
    console.log('2. Go to your project');
    console.log('3. Open SQL Editor');
    console.log('4. Paste the script above');
    console.log('5. Click "Run"');
    console.log('\nAfter running the migrations, execute this script again.');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

migrateRecipesTable();
