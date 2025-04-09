import API_URL from './config';
import axios from 'axios';

// Mock data for development
const mockRecipes = [
  {
    id: 1, 
    name: "Pasta Carbonara",
    ingredients: ["400g spaghetti", "200g pancetta", "4 eggs", "50g parmesan"],
    instructions: "1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Combine all",
    prepTime: "20 mins",
    cookTime: "15 mins",
    servings: 4,
    difficulty: "Medium",
    category: "Italian",
    image: "/placeholder-food.jpg",
    tags: ["pasta", "dinner", "italian"]
  },
  {
    id: 2,
    name: "Vegetable Stir Fry", 
    ingredients: ["1 broccoli", "2 carrots", "1 bell pepper", "2 tbsp soy sauce"],
    instructions: "1. Chop vegetables\n2. Heat oil\n3. Stir fry for 5 mins\n4. Add sauce",
    prepTime: "15 mins",
    cookTime: "10 mins", 
    servings: 2,
    difficulty: "Easy",
    category: "Asian",
    image: "/placeholder-food.jpg",
    tags: ["vegetarian", "quick", "healthy"]
  }
];

const isDev = process.env.NODE_ENV === 'development';

export async function getRecipes(token) {
  if (isDev && !token) {
    console.warn('Development mode: Using mock recipes data');
    return { recipes: mockRecipes };
  }

  try {
    const config = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    const res = await axios.get(`${API_URL}/api/recipes`, config);
    return res.data;
  } catch (error) {
    console.error('API Error:', error);
    if (isDev) {
      console.warn('Development fallback: Using mock data');
      return { recipes: mockRecipes };
    }
    throw error;
  }
}

export async function getRecipeById(id, token) {
  if (isDev && !token) {
    console.warn('Development mode: Using mock recipe data');
    return { recipe: mockRecipes.find(r => r.id === id) || mockRecipes[0] };
  }

  try {
    const config = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    const res = await axios.get(`${API_URL}/api/recipes/${id}`, config);
    return res.data;
  } catch (error) {
    console.error(`Error fetching recipe ${id}:`, error);
    if (isDev) {
      return { recipe: mockRecipes[0] };
    }
    throw error;
  }
}

export async function getFavoriteRecipes(userId, token) {
  if (isDev && !token) {
    console.warn('Development mode: Using mock favorites data');
    return { recipes: mockRecipes };
  }

  try {
    const config = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    const res = await axios.get(`${API_URL}/api/users/${userId}/favorites`, config);
    return res.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    if (isDev) {
      return { recipes: mockRecipes };
    }
    throw error;
  }
}
