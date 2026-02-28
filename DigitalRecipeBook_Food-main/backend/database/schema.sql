-- Digital Recipe Book Database Schema
-- Supabase PostgreSQL Database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR UNIQUE NOT NULL,
    password_hash VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR,
    avatar_url VARCHAR,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipes Table
CREATE TABLE IF NOT EXISTS public.recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    description TEXT,
    instructions TEXT NOT NULL,
    cook_time_minutes INTEGER,
    prep_time_minutes INTEGER,
    servings INTEGER,
    difficulty_level VARCHAR CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
    category VARCHAR,
    image_url VARCHAR,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ingredients Table
CREATE TABLE IF NOT EXISTS public.ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
    name VARCHAR NOT NULL,
    quantity DECIMAL,
    unit VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(recipe_id, user_id)
);

-- Meal Plans Table
CREATE TABLE IF NOT EXISTS public.meal_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    week_start_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meal Plan Items Table
CREATE TABLE IF NOT EXISTS public.meal_plan_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meal_plan_id UUID NOT NULL REFERENCES public.meal_plans(id) ON DELETE CASCADE,
    recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
    day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
    meal_type VARCHAR CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shopping Lists Table
CREATE TABLE IF NOT EXISTS public.shopping_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    meal_plan_id UUID REFERENCES public.meal_plans(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shopping List Items Table
CREATE TABLE IF NOT EXISTS public.shopping_list_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shopping_list_id UUID NOT NULL REFERENCES public.shopping_lists(id) ON DELETE CASCADE,
    ingredient_name VARCHAR NOT NULL,
    quantity DECIMAL,
    unit VARCHAR,
    category VARCHAR,
    is_checked BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_recipes_user_id ON public.recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_category ON public.recipes(category);
CREATE INDEX IF NOT EXISTS idx_recipes_is_public ON public.recipes(is_public);
CREATE INDEX IF NOT EXISTS idx_ingredients_recipe_id ON public.ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_reviews_recipe_id ON public.reviews(recipe_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_user_id ON public.meal_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_meal_plan_items_meal_plan_id ON public.meal_plan_items(meal_plan_id);
CREATE INDEX IF NOT EXISTS idx_shopping_lists_user_id ON public.shopping_lists(user_id);
CREATE INDEX IF NOT EXISTS idx_shopping_list_items_shopping_list_id ON public.shopping_list_items(shopping_list_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_list_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Users Table
CREATE POLICY "Users can view their own profile" ON public.users 
    FOR SELECT USING (auth.uid() = id);

-- RLS Policies for Recipes Table
CREATE POLICY "Anyone can view public recipes" ON public.recipes 
    FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create recipes" ON public.recipes 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recipes" ON public.recipes 
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for Reviews Table
CREATE POLICY "Anyone can view reviews" ON public.reviews 
    FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON public.reviews 
    FOR INSERT WITH CHECK (auth.uid() = user_id);
