import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import MealCalendar from './pages/MealCalendar';
import RecipeDetails from './components/RecipeDetails';
import FavoriteRecipes from './pages/FavoriteRecipes';
import About from './pages/About';
import './App.css';

function App() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    profile: null
  });

  const handleLogin = (profileData) => {
    setUser({
      isLoggedIn: true,
      profile: profileData
    });
    localStorage.setItem('user', JSON.stringify({
      isLoggedIn: true,
      profile: profileData
    }));
  };

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      profile: null
    });
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    showToast(newTheme === 'dark' 
      ? '🌙 Switching to Night Mode. Stay cozy!' 
      : '☀️ Daylight activated! Let\'s get cooking!');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="navbar">
          <Link to="/" className="logo-link">
            <img src="https://r2.erweima.ai/i/4a1oV2N3Rc2sXFPAguCfFw.png" alt="Meal Mate" className="app-logo" />
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/login">Login</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/calendar">Meal Calendar</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="navbar-theme-toggle">
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
              </svg>
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
          <Link to="/profile" className="profile-pic-link">
            {user.isLoggedIn ? (
              user.profile?.avatar ? (
                <img 
                  src={user.profile.avatar} 
                  alt="User profile" 
                  className="profile-pic"
                />
              ) : (
                <div className="profile-initial">
                  {user.profile?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )
            ) : (
              <div className="empty-profile-pic">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"/>
                </svg>
              </div>
            )}
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<MealCalendar />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<FavoriteRecipes saved={[]} onSave={() => {}} />} />
          <Route path="/about" element={<About />} />
        </Routes>
        
        {toast && (
          <div className={`toast ${theme}`}>
            {toast}
          </div>
        )}
      </Router>
    </DndProvider>
  );
}

export default App;
