import React from 'react';
import './DaySelectionModal.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function DaySelectionModal({ meal, onSelectDay, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="day-selection-modal">
        <h3>Select a day for {meal}</h3>
        <div className="day-buttons">
          {daysOfWeek.map(day => (
            <button
              key={day}
              className="day-btn"
              onClick={() => onSelectDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
