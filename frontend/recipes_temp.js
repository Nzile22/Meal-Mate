import API_URL from './config';
import axios from 'axios';

const DEV_MODE = process.env.NODE_ENV === 'development';

export const getRecipes = async (token) => {
  try {
    const config = (token || DEV_MODE) ? {
      headers: {
        'Authorization': token ? `Bearer ${token}` : 'DEV-SKIP-AUTH'
      }
    } : {};
    const response = await axios.get(`${API_URL}/api/recipes`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const getRecipeById = async (id, token) => {
  try {
    const config = (token || DEV_MODE) ? {
      headers: {
        'Authorization': token ? `Bearer ${token}` : 'DEV-SKIP-AUTH'
      }
    } : {};
    const response = await axios.get(`${API_URL}/api/recipes/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe ${id}:`, error);
    throw error;
  }
};

export const getFavoriteRecipes = async (userId, token) => {
  try {
    const config = (token || DEV_MODE) ? {
      headers: {
        'Authorization': token ? `Bearer ${token}` : 'DEV-SKIP-AUTH'
      }
    } : {};
    const response = await axios.get(`${API_URL}/api/users/${userId}/favorites`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};
