import './Login.css'; // Reusing the same styles

export default function Signup({ onLogin }) {
  return (
    <div className="login-container">
      <img 
        src="https://r2.erweima.ai/i/4a1oV2N3Rc2sXFPAguCfFw.png" 
        alt="Meal Mate" 
        className="login-logo" 
      />
      <h1 className="login-title">Create Your Meal Mate Account</h1>
      <form className="login-form" onSubmit={(e) => {
        e.preventDefault();
        const mockProfile = {
          name: 'New User',
          email: formData.email,
          avatar: null
        };
        onLogin(mockProfile);
      }}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Create a password"
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Sign Up
        </button>
      </form>
      <p className="signup-link">
        Already have an account? <a href="/login">Sign in</a>
      </p>
    </div>
  );
}
