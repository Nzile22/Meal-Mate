import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-taglines">
        <p>"Built for food lovers, by food lovers."</p>
        <p>"MealMate helps you plan better, eat healthier, and save time."</p>
        <p>"Your meal routine doesn't have to be boring. Let's make it exciting!"</p>
      </div>
      <div className="footer-links">
        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/recipes">Recipes</a>
        <a href="/calendar">Meal Planner</a>
        <a href="/favorites">Favorites</a>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} MealMate. All rights reserved.
      </div>
    </footer>
  );
}
