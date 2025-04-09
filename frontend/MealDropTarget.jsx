import React from 'react';
import './MealDropTarget.css';

export default function MealDropTarget({ day, onDrop }) {
  const handleDrop = (e) => {
    e.preventDefault();
    const meal = e.dataTransfer.getData('text/plain');
    onDrop(day, meal);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      className="drop-target"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      Drop meals here
    </div>
  );
}
