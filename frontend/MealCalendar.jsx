import React, { useState } from 'react';
import './MealCalendar.css';
import DaySelectionModal from '../components/DaySelectionModal';
import MealItem from '../components/MealItem';
import MealDropTarget from '../components/MealDropTarget';
import MealModal from './MealModal';

export default function MealCalendar({ mealData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [assignedMeals, setAssignedMeals] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );
  const [expandedDay, setExpandedDay] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showDayModal, setShowDayModal] = useState(false);
  const [mealToAdd, setMealToAdd] = useState(null);

  const filteredMeals = Object.keys(mealData).filter(meal =>
    meal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDrop = (day, meal) => {
    setAssignedMeals(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), meal]
    }));
  };

  const clearCalendar = () => {
    setAssignedMeals({});
  };

  const toggleDay = (day) => {
    setExpandedDay(prev => prev === day ? null : day);
  };

  return (
    <div className="calendar-container">
      <div className="meal-selection">
        <h2>Meal Library</h2>
        <div className="search-container">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="meal-search"
          />
        </div>
        <div className="meal-grid">
          {filteredMeals.map((meal, i) => (
            <div className="meal-card" key={i}>
              <img 
                src={`${mealData[meal]?.image}?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150`}
                alt={meal}
                className="meal-thumbnail"
                onClick={() => setSelectedMeal({name: meal, ...mealData[meal]})}
              />
              <div className="meal-info">
                <h4>{meal}</h4>
                <p>{mealData[meal]?.calories} kcal</p>
                <button 
                  className="add-to-calendar-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMealToAdd(meal);
                    setShowDayModal(true);
                  }}
                >
                  Add to Calendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMeal && (
        <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}

      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div className="day-card" key={day}>
            <div className="day-header">
              <h3>{day}</h3>
              <button 
                onClick={() => toggleDay(day)}
                className="day-toggle"
              >
                {expandedDay === day ? '−' : '+'}
              </button>
            </div>
            
            {expandedDay === day && (
              <div className="day-meals">
                {assignedMeals[day].length > 0 ? (
                  assignedMeals[day].map((meal, i) => (
                    <MealItem key={i} name={meal} onDrop={handleDrop} />
                  ))
                ) : (
                  <div className="empty-state">
                    <p>No meals planned</p>
                    <MealDropTarget day={day} onDrop={handleDrop} />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {showDayModal && (
        <DaySelectionModal
          meal={mealToAdd}
          onSelectDay={(day) => {
            handleDrop(day, mealToAdd);
            setShowDayModal(false);
          }}
          onClose={() => setShowDayModal(false)}
        />
      )}

      <div className="calendar-controls">
        <button onClick={clearCalendar} className="clear-btn">
          Reset Week
        </button>
      </div>
    </div>
  );
}
