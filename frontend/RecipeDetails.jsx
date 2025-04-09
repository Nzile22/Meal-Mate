import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRecipeById } from '../api/recipes_service_v2';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <div className="recipe-details">Loading...</div>;
  if (error) return <div className="recipe-details">Error: {error}</div>;
  if (!recipe) return (
    <div className="recipe-details">
      <h1>Recipe Not Found</h1>
      <p>The requested recipe could not be found.</p>
    </div>
  );

  return (
    <div className="recipe-details">
      <button 
        onClick={() => navigate(-1)}
        className="back-button"
      >
        &larr; Back to Recipes
      </button>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p><strong>Country:</strong> {recipe.country}</p>
      <h4>Ingredients</h4>
      <ul>{recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
      <h4>Steps</h4>
      <ol>{recipe.steps.map((s, idx) => <li key={idx}>{s}</li>)}</ol>
    </div>
  );
}
