import { Link } from 'react-router-dom';
import placeholderImage from '../assets/meal-mate-logo.png';

export default function RecipeCard({ recipe, onSave, isSaved }) {
  return (
    <div className="recipe-card" aria-label={`Recipe: ${recipe.title}`}>
      <div className="recipe-image-container">
        <img 
          src={recipe.image || placeholderImage} 
          alt={recipe.title}
          className="recipe-image"
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
        />
        <div className="recipe-badge">
          {recipe.cookingTime && <span>{recipe.cookingTime} min</span>}
          {recipe.difficulty && <span>{recipe.difficulty}</span>}
        </div>
      </div>
      
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        <div className="recipe-meta">
          {recipe.country && <span className="country-flag">🌍 {recipe.country}</span>}
          {recipe.rating && <span className="recipe-rating">⭐ {recipe.rating}</span>}
        </div>
        
        <div className="recipe-actions">
          <Link 
            to={`/recipes/${recipe.id}`} 
            className="view-more-btn"
            aria-label={`View details of ${recipe.title}`}
          >
            View Details
          </Link>
          <button 
            onClick={() => onSave(recipe)}
            className={`save-btn ${isSaved ? 'saved' : ''}`}
            aria-label={isSaved ? "Remove from saved" : "Save recipe"}
          >
            {isSaved ? "❤️ Saved" : "🤍 Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
