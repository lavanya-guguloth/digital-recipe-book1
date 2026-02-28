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

// Sample recipes to add
const sampleRecipes = [
  {
    title: 'Classic Chocolate Chip Cookies',
    description: 'Delicious homemade chocolate chip cookies with a perfect balance of crispy edges and chewy centers. Perfect for any occasion!',
    instructions: '1. Preheat oven to 375°F. 2. Mix butter and sugars. 3. Add eggs and vanilla. 4. Combine flour, baking soda, and salt. 5. Mix dry ingredients into wet ingredients. 6. Fold in chocolate chips. 7. Drop spoonfuls on baking sheet. 8. Bake 12 minutes until golden.',
    category: 'dessert',
    difficulty: 'easy',
    servings: 24,
    prep_time: 15,
    cook_time: 12,
    is_public: true,
    photo_url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
    ingredients: [
      { name: 'All-purpose flour', quantity: 2, unit: 'cup' },
      { name: 'Butter', quantity: 1, unit: 'cup' },
      { name: 'Brown sugar', quantity: 0.75, unit: 'cup' },
      { name: 'Granulated sugar', quantity: 0.75, unit: 'cup' },
      { name: 'Eggs', quantity: 2, unit: '' },
      { name: 'Vanilla extract', quantity: 1, unit: 'tsp' },
      { name: 'Baking soda', quantity: 1, unit: 'tsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
      { name: 'Chocolate chips', quantity: 2, unit: 'cup' },
    ],
  },
  {
    title: 'Spaghetti Carbonara',
    description: 'Traditional Italian pasta dish with creamy egg sauce, bacon, and Parmesan cheese. Simple yet elegant.',
    instructions: '1. Cook spaghetti according to package directions. 2. While pasta cooks, fry bacon until crispy. 3. Beat eggs with Parmesan and black pepper. 4. Drain pasta. 5. Mix hot pasta with bacon. 6. Add egg mixture off heat, stirring quickly. 7. Serve immediately.',
    category: 'main',
    difficulty: 'medium',
    servings: 4,
    prep_time: 10,
    cook_time: 20,
    is_public: true,
    photo_url: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=400',
    ingredients: [
      { name: 'Spaghetti', quantity: 1, unit: 'lb' },
      { name: 'Bacon', quantity: 6, unit: 'oz' },
      { name: 'Eggs', quantity: 4, unit: '' },
      { name: 'Parmesan cheese', quantity: 1, unit: 'cup' },
      { name: 'Black pepper', quantity: 1, unit: 'tsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
    ],
  },
  {
    title: 'Greek Salad',
    description: 'Fresh and healthy Mediterranean salad with tomatoes, cucumbers, olives, and feta cheese. Perfect for lunch or as a side dish.',
    instructions: '1. Chop tomatoes and cucumbers into chunks. 2. Slice red onion thinly. 3. Combine tomatoes, cucumbers, onion, and olives in a bowl. 4. Crumble feta cheese over top. 5. Drizzle with olive oil and lemon juice. 6. Sprinkle oregano. 7. Toss gently and serve.',
    category: 'side',
    difficulty: 'easy',
    servings: 4,
    prep_time: 15,
    cook_time: 0,
    is_public: true,
    photo_url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
    ingredients: [
      { name: 'Tomatoes', quantity: 4, unit: '' },
      { name: 'Cucumbers', quantity: 2, unit: '' },
      { name: 'Red onion', quantity: 0.5, unit: '' },
      { name: 'Kalamata olives', quantity: 1, unit: 'cup' },
      { name: 'Feta cheese', quantity: 1, unit: 'cup' },
      { name: 'Olive oil', quantity: 0.5, unit: 'cup' },
      { name: 'Lemon juice', quantity: 3, unit: 'tbsp' },
      { name: 'Oregano', quantity: 1, unit: 'tsp' },
    ],
  },
  {
    title: 'Homemade Pizza',
    description: 'Make your own pizza from scratch with a crispy crust, tomato sauce, and your favorite toppings.',
    instructions: '1. Preheat oven to 475°F. 2. Roll out pizza dough on a floured surface. 3. Place on pizza stone or baking sheet. 4. Spread tomato sauce evenly. 5. Sprinkle mozzarella cheese. 6. Add pepperoni slices. 7. Drizzle with olive oil. 8. Sprinkle oregano. 9. Bake 15 minutes until crust is golden.',
    category: 'main',
    difficulty: 'medium',
    servings: 4,
    prep_time: 30,
    cook_time: 15,
    is_public: true,
    photo_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
    ingredients: [
      { name: 'Pizza dough', quantity: 1, unit: 'lb' },
      { name: 'Tomato sauce', quantity: 1, unit: 'cup' },
      { name: 'Mozzarella cheese', quantity: 2, unit: 'cup' },
      { name: 'Pepperoni', quantity: 0.5, unit: 'lb' },
      { name: 'Olive oil', quantity: 2, unit: 'tbsp' },
      { name: 'Oregano', quantity: 1, unit: 'tsp' },
    ],
  },
  {
    title: 'Chocolate Lava Cake',
    description: 'Indulgent chocolate dessert with a gooey center. Perfect for special occasions!',
    instructions: '1. Preheat oven to 425°F. Grease 4 ramekins. 2. Melt chocolate and butter together. 3. Beat eggs and sugar until thick. 4. Fold chocolate mixture into eggs. 5. Mix in flour and vanilla. 6. Divide batter among ramekins. 7. Bake 12 minutes until edges are firm but center jiggles. 8. Invert onto plates and serve with ice cream.',
    category: 'dessert',
    difficulty: 'hard',
    servings: 4,
    prep_time: 10,
    cook_time: 12,
    is_public: true,
    photo_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    ingredients: [
      { name: 'Dark chocolate', quantity: 8, unit: 'oz' },
      { name: 'Butter', quantity: 0.5, unit: 'cup' },
      { name: 'Eggs', quantity: 4, unit: '' },
      { name: 'Sugar', quantity: 0.5, unit: 'cup' },
      { name: 'Flour', quantity: 0.25, unit: 'cup' },
      { name: 'Vanilla extract', quantity: 1, unit: 'tsp' },
    ],
  },
  {
    title: 'Caesar Salad',
    description: 'Classic Caesar salad with romaine lettuce, croutons, and creamy Caesar dressing.',
    instructions: '1. Wash and chop romaine lettuce into bite-sized pieces. 2. Place lettuce in a large bowl. 3. Add croutons and Parmesan cheese. 4. Pour Caesar dressing over salad. 5. Toss well to coat. 6. Divide among plates and top with black pepper. 7. Serve immediately.',
    category: 'side',
    difficulty: 'easy',
    servings: 4,
    prep_time: 10,
    cook_time: 0,
    is_public: true,
    photo_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    ingredients: [
      { name: 'Romaine lettuce', quantity: 1, unit: 'head' },
      { name: 'Parmesan cheese', quantity: 0.5, unit: 'cup' },
      { name: 'Croutons', quantity: 1, unit: 'cup' },
      { name: 'Caesar dressing', quantity: 0.5, unit: 'cup' },
      { name: 'Black pepper', quantity: 1, unit: 'tsp' },
    ],
  },
  {
    title: 'Chicken Stir Fry',
    description: 'Quick and healthy Asian-inspired stir fry with vegetables and tender chicken pieces.',
    instructions: '1. Cut chicken into bite-sized pieces. 2. Chop bell peppers and cut broccoli into florets. 3. Heat oil in a wok or large skillet over high heat. 4. Add garlic and ginger, cook 1 minute. 5. Add chicken and cook until no longer pink. 6. Add vegetables and stir fry 5 minutes. 7. Add soy sauce and toss to coat. 8. Cook 2 more minutes and serve over rice.',
    category: 'main',
    difficulty: 'medium',
    servings: 4,
    prep_time: 20,
    cook_time: 15,
    is_public: true,
    photo_url: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=400',
    ingredients: [
      { name: 'Chicken breast', quantity: 1.5, unit: 'lb' },
      { name: 'Bell peppers', quantity: 3, unit: '' },
      { name: 'Broccoli', quantity: 1, unit: 'head' },
      { name: 'Soy sauce', quantity: 0.5, unit: 'cup' },
      { name: 'Garlic', quantity: 3, unit: 'clove' },
      { name: 'Ginger', quantity: 1, unit: 'tbsp' },
      { name: 'Vegetable oil', quantity: 3, unit: 'tbsp' },
    ],
  },
  {
    title: 'Pancakes',
    description: 'Fluffy and delicious pancakes perfect for breakfast. Serve with maple syrup and butter!',
    instructions: '1. Mix flour, baking powder, sugar, and salt in a bowl. 2. In another bowl, whisk together milk, eggs, and melted butter. 3. Combine wet and dry ingredients, mix until just combined (lumps are okay). 4. Heat a griddle or skillet over medium heat. 5. Pour 1/4 cup batter and cook until bubbles form. 6. Flip and cook until golden on both sides. 7. Repeat with remaining batter. 8. Serve warm with syrup and butter.',
    category: 'breakfast',
    difficulty: 'easy',
    servings: 4,
    prep_time: 10,
    cook_time: 20,
    is_public: true,
    photo_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
    ingredients: [
      { name: 'All-purpose flour', quantity: 2, unit: 'cup' },
      { name: 'Milk', quantity: 1.5, unit: 'cup' },
      { name: 'Eggs', quantity: 2, unit: '' },
      { name: 'Baking powder', quantity: 2, unit: 'tbsp' },
      { name: 'Sugar', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
      { name: 'Butter', quantity: 2, unit: 'tbsp' },
    ],
  },
];

async function addSampleRecipes() {
  try {
    console.log('🍳 Adding sample recipes to database...\n');

    // Get a valid user ID (using service key to bypass auth)
    const { data: users, error: userError } = await supabaseAdmin
      .from('users')
      .select('id')
      .limit(1);

    if (userError || !users || users.length === 0) {
      console.error('❌ No users found. Please create an account first.');
      process.exit(1);
    }

    const userId = users[0].id;
    console.log(`✓ Using user ID: ${userId}\n`);

    let recipeCount = 0;

    // Add each sample recipe
    for (const recipe of sampleRecipes) {
      const { ingredients, ...recipeData } = recipe;

      // Insert recipe
      const { data: newRecipe, error: recipeError } = await supabaseAdmin
        .from('recipes')
        .insert([
          {
            ...recipeData,
            user_id: userId,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (recipeError) {
        console.error(`❌ Error creating recipe "${recipe.title}":`, recipeError.message);
        continue;
      }

      console.log(`✓ Created recipe: ${recipe.title}`);

      // Insert ingredients
      if (ingredients && ingredients.length > 0) {
        const ingredientData = ingredients.map((ing) => ({
          recipe_id: newRecipe.id,
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
        }));

        const { error: ingredientError } = await supabaseAdmin
          .from('ingredients')
          .insert(ingredientData);

        if (ingredientError) {
          console.error(`  ⚠️  Error adding ingredients:`, ingredientError.message);
        } else {
          console.log(`  ✓ Added ${ingredients.length} ingredients`);
        }
      }

      recipeCount++;
    }

    console.log(`\n🎉 Successfully added ${recipeCount} sample recipes!\n`);
    console.log('You can now:');
    console.log('1. Visit https://deft-bombolone-5d4f6b.netlify.app/dashboard');
    console.log('2. View all the sample recipes');
    console.log('3. Leave reviews and ratings');
    console.log('4. Create your own recipes!');
    console.log('\n✨ Recipe system is ready to go!');
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
addSampleRecipes();
