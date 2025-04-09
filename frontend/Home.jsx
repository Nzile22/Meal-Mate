import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { 
  FaArrowRight, 
  FaCalendarAlt, 
  FaChartLine, 
  FaUtensils, 
  FaCoffee, 
  FaAppleAlt, 
  FaCookieBite,
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaPinterest 
} from 'react-icons/fa';

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.isLoggedIn) {
      navigate('/calendar');
    } else {
      navigate('/login');
    }
  };
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-image-container">
          <img 
            src="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" 
            alt="Delicious food"
            className="hero-image"
          />
          <div className="image-caption">
            <h2>Discover Culinary Delights</h2>
            <p>Plan, cook, and enjoy meals tailored just for you</p>
          </div>
        </div>
        <h1 className="hero-title">Meal Mate</h1>
        <p className="hero-subtitle">Your personal meal planning assistant, GOOD FOOD GOOD LIFE</p>
        <button onClick={handleGetStarted} className="cta-button">
          Get Started <FaArrowRight className="icon-right" />
        </button>
      </section>

      <div className="features">
        <div className="feature-image-container">
          <img
            src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"
            alt="Healthy food variety"
            className="additional-food-image"
          />
          <div className="image-caption">
            <h2>Nutrition Made Easy</h2>
            <p>Track your meals and achieve your health goals</p>
          </div>
        </div>
        <div className="feature-card">
          <img 
            src="https://luggageandlipstick.com/wp-content/uploads/2019/12/0-traditional-kenyan-food_patti-morrow_luggageandlipstick_1920.jpg" 
            alt="Healthy meal" 
            className="feature-image"
          />
          <div className="feature-content">
          <FaCalendarAlt className="feature-icon" />
          <h3 className="feature-title">Meal Planning</h3>
            <p className="feature-description">
              Plan your meals for the week with our intuitive calendar interface.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <img 
            src="https://media.istockphoto.com/id/2176917166/photo/kenyan-food-cuisines-foods-meals-dishes-dinner-supper-breakfast-snacks-yummy-delicious-lunch.jpg?s=612x612&w=0&k=20&c=xF9vXDDRtYRHqlv60nHtwKRML-rxcpepTsVF0rtnhFs=" 
            alt="Variety of foods" 
            className="feature-image"
          />
          <div className="feature-content">
          <FaChartLine className="feature-icon" />
          <h3 className="feature-title">Nutrition Tracking</h3>
            <p className="feature-description">
              Monitor your nutritional intake with our comprehensive tracking system.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <img 
            src="https://media.cafejavas.co.ug/productImages/1568193485.jpg" 
            alt="Meal prep" 
            className="feature-image"
          />
          <div className="feature-content">
          <FaUtensils className="feature-icon" />
          <h3 className="feature-title">Meal Prep</h3>
            <p className="feature-description">
              Get step-by-step guidance for preparing healthy meals in advance.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <img 
            src="https://media.cafejavas.co.ug/productImages/1574775624.jpg" 
            alt="Morning coffee" 
            className="feature-image"
          />
          <div className="feature-content">
          <FaCoffee className="feature-icon" />
          <h3 className="feature-title">Morning Boost</h3>
            <p className="feature-description">
              Start your day right with perfectly planned breakfasts.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <img 
            src="https://www.goodies4all.co.za/wp-content/uploads/2022/11/Goodies4all-Fresh-Fruit-Seasonal-Fruit-Combo-1.jpg" 
            alt="Fresh seasonal fruits" 
            className="feature-image"
          />
          <div className="feature-content">
          <FaAppleAlt className="feature-icon" />
          <h3 className="feature-title">Fresh Fruits</h3>
            <p className="feature-description">
              Enjoy seasonal fruits for a healthy boost.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnnzYTCXCWOBv2A-emXXKA_aTF0_aEjfm3DA&s" 
            alt="Healthy snacks" 
            className="feature-image"
          />
          <div className="feature-content">
          <FaCookieBite className="feature-icon" />
          <h3 className="feature-title">Healthy Snacks</h3>
            <p className="feature-description">
              Nutritious snacks to keep you energized.
            </p>
          </div>
        </div>
      </div>

      <div className="prep-section">
        <div className="prep-image-container">
          <img
            src="https://images.unsplash.com/photo-1603073163308-9654c3fb70b5?q=80&w=1454&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Food preparation"
            className="prep-image"
          />
          <div className="image-caption">
            <h2>Master Meal Prep</h2>
            <p>Save time with our expert preparation guides</p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>MealMate</h3>
            <p>MealMate is your ultimate companion for smart and simple meal planning. Designed with health-conscious individuals and busy households in mind, MealMate helps you discover, plan, and save your favorite recipes—all in one place.

Whether you're trying to stay on track with your diet, looking for fresh culinary inspiration, or just want to make grocery shopping easier, MealMate has you covered. Our intuitive interface allows you to search for recipes, view detailed ingredients and instructions, and save meals you love for quick access later..</p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/recipes">Recipes</a></li>
              <li><a href="/calendar">Meal Calendar</a></li>
              <li><a href="/favorites">Favorites</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-social">
          <a href="#" className="social-icon"><FaFacebook /></a>
          <a href="#" className="social-icon"><FaTwitter /></a>
          <a href="#" className="social-icon"><FaInstagram /></a>
          <a href="#" className="social-icon"><FaPinterest /></a>
        </div>
      </footer>
    </div>
  );
}
