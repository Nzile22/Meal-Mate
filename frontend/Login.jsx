import './Login.css';

export default function Login({ onLogin }) {
  return (
    <div className="login-container">
      <img 
        src="https://r2.erweima.ai/i/4a1oV2N3Rc2sXFPAguCfFw.png" 
        alt="Meal Mate" 
        className="login-logo" 
      />
      <h1 className="login-title">Welcome Back To Meal Mate</h1>
      <form className="login-form" onSubmit={(e) => {
        e.preventDefault();
        const mockProfile = {
          name: 'Demo User',
          email: formData.email,
          avatar: null
        };
        onLogin(mockProfile);
      }}>
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
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Sign In
        </button>
      </form>
      <p className="signup-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}
