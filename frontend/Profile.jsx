import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    joinDate: 'January 2023',
    mealsPlanned: 127,
    dietaryPreferences: ['Vegetarian', 'Nut-free', 'Lactose-free', 'Gluten-free'],
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYQkECjYxaNxAyDFPjU8Y2uoYuj4pmsPx3mw&s'
  });

  useEffect(() => {
    // Check login status from localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const savedProfile = localStorage.getItem('profile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    localStorage.setItem('profile', JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const togglePreference = (pref) => {
    setProfile(prev => {
      const newPrefs = prev.dietaryPreferences.includes(pref)
        ? prev.dietaryPreferences.filter(p => p !== pref)
        : [...prev.dietaryPreferences, pref];
      return { ...prev, dietaryPreferences: newPrefs };
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="profile-container">
        <div className="login-prompt">
          <h2>Please log in to view and edit your profile</h2>
          <div className="auth-links">
            <Link to="/login" className="auth-link">Login</Link>
            <span> or </span>
            <Link to="/signup" className="auth-link">Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src={profile.avatar} 
          alt="Profile" 
          className="profile-avatar"
        />
        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="profile-input"
              />
              <p>Member since: {profile.joinDate}</p>
              <p>Meals planned: {profile.mealsPlanned}</p>
              <button onClick={handleSave} className="save-button">
                Save Profile
              </button>
            </>
          ) : (
            <>
              <h1>{profile.name}</h1>
              <p>Member since: {profile.joinDate}</p>
              <p>Meals planned: {profile.mealsPlanned}</p>
              <button onClick={handleEdit} className="edit-button">
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      <div className="profile-section">
        <h2 className="section-title">Dietary Preferences</h2>
        <div className="preferences-grid">
          {['Vegetarian', 'Nut-free', 'Lactose-free', 'Gluten-free'].map(pref => (
            <div 
              key={pref}
              className={`preference-item ${profile.dietaryPreferences.includes(pref) ? 'selected' : ''}`}
              onClick={() => isEditing && togglePreference(pref)}
            >
              <span>
                {pref === 'Vegetarian' && '🌱'}
                {pref === 'Nut-free' && '🥜'}
                {pref === 'Lactose-free' && '🥛'}
                {pref === 'Gluten-free' && '🌾'}
              </span>
              {pref}
            </div>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h2 className="section-title">Recent Meals</h2>
        <p>Your meal history will appear here</p>
      </div>
    </div>
  );
}
