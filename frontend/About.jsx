import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <h1>About MealMate</h1>
      <div className="taglines">
        <p className="tagline">"Built for food lovers, by food lovers."</p>
        <p className="tagline">"MealMate helps you plan better, eat healthier, and save time."</p>
        <p className="tagline">"Your meal routine doesn't have to be boring. Let's make it exciting!"</p>
      </div>
      <div className="mission">
        <h2>Our Mission</h2>
        <p>
          MealMate was created to simplify meal planning and make healthy eating enjoyable.
          We believe good food should be accessible to everyone, regardless of cooking skills
          or time constraints.
        </p>
      </div>
    </div>
  );
}
