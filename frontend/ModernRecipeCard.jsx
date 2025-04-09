import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ModernRecipeCard({ recipe, onSave, isSaved }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="modern-recipe-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image-container">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className={`card-image ${isHovered ? 'zoomed' : ''}`}
        />
        <button
          className={`save-button ${isSaved ? 'saved' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onSave(recipe);
          }}
        >
          {isSaved ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="card-content">
        <div className="badges">
          <span className="category-badge">{recipe.category}</span>
          <span className="country-badge">{recipe.country}</span>
        </div>
        <h3 className="card-title">{recipe.title}</h3>
        <p className="card-description">{recipe.description}</p>
        <Link to={`/recipes/${recipe.id}`} className="view-button">
          View Recipe
        </Link>
      </div>
    </div>
  );
}
