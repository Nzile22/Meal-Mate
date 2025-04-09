import API_URL from './config';
import axios from 'axios';

// Mock data for development
const mockRecipes = {
  recipes: [
    {
      id: 1, 
      name: "Mock Recipe 1",
      ingredients: ["ing1", "ing2"],
      instructions: "Mix ingredients and bake",
      prepTime: "30 mins"
    },
    {
      id: 2,
      name: "Mock Recipe 2", 
      ingredients: ["ing3", "ing4"],
      instructions: "Combine and simmer",
      prepTime: "20 mins"
    }
  ]
};

const isDev = process.env.NODE_ENV === 'development';

export const getRecipes = async (token) => {
  if (isDev && !token) {
    console.warn('Development mode: Using mock recipes data');
    return Promise.resolve(mockRecipes);
  }

  try {
    const config = token ? {
      headers: { 'Authorization': `Bearer ${token}` }
    } : {};
    const response = await axios.get(`${API_URL}/api/recipes`, config);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    if (isDev) {
      console.warn('Development fallback: Using mock data');
      return mockRecipes;
    }
    throw error;
  }
};

// Similar implementations for getRecipeById and getFavoriteRecipes
export const getRecipeById = async (id, token) => {
  if (isDev && !token) {
    return Promise.resolve(mockRecipes.find(r => r.id === id) || mockRecipes[0]);
  }
  // ... actual implementation
};

export const getFavoriteRecipes = async (userId, token) => {
  if (isDev && !token) {
    return Promise.resolve(mockRecipes);
  }
  // ... actual implementation
};
