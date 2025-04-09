import React from 'react';
import './MealItem.css';

export default function MealItem({ name, onDrop }) {
  return (
    <div 
      className="meal-item"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', name);
      }}
    >
      <span>{name}</span>
      <button 
        className="remove-btn"
        onClick={() => onDrop(name)}
      >
        ×
      </button>
    </div>
  );
}
