import { useState, useEffect } from 'react';
import ModernRecipeCard from '../components/ModernRecipeCard';
import './FavoriteRecipes.css';
import { getFavoriteRecipes } from '../api/recipes_service_v2';

export default function FavoriteRecipes() {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // TODO: Replace with actual user ID when auth is implemented
        const data = await getFavoriteRecipes('current-user');
        setSaved(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleSave = (recipe) => {
    setSaved(prev =>
      prev.find(r => r.id === recipe.id)
        ? prev.filter(r => r.id !== recipe.id)
        : [...prev, recipe]
    );
  };
  if (loading) return <div className="favorites-container">Loading...</div>;
  if (error) return <div className="favorites-container">Error: {error}</div>;

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Your Favorite Recipes</h2>
      {!saved || saved.length === 0 ? (
        <div className="empty-state">
          <p>You haven't saved any recipes yet!</p>
          <p>Start saving recipes to see them here.</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {saved.map(recipe => (
            <ModernRecipeCard
              key={recipe.id}
              recipe={recipe}
              onSave={onSave}
              isSaved={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
