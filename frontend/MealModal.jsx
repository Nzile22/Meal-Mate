import React from 'react';
import './MealModal.css';

const MealModal = ({ meal, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <img 
          src={`${meal.image}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80`} 
          alt={meal.name}
          className="modal-image"
        />
        <h2>{meal.name}</h2>
        <div className="nutrition-info">
          <div className="nutrition-item">
            <span className="nutrition-value">{meal.calories}</span>
            <span className="nutrition-label">Calories</span>
          </div>
          <div className="nutrition-item">
            <span className="nutrition-value">{meal.protein}g</span>
            <span className="nutrition-label">Protein</span>
          </div>
          <div className="nutrition-item">
            <span className="nutrition-value">{meal.carbs}g</span>
            <span className="nutrition-label">Carbs</span>
          </div>
          <div className="nutrition-item">
            <span className="nutrition-value">{meal.fat}g</span>
            <span className="nutrition-label">Fat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MealModal };
export default MealModal;
