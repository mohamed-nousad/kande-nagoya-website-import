import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithGoogle, signInWithApple } from "@/store/slices/authSlice";
import { showToast } from "@/utils/toast";
import { rememberEmail } from "@/auth/rememberMe";

const PasswordToggleIcon = ({ visible }) => {
  if (visible) {
    return (
      <svg width="11.025" height="11.025" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
        <path d="M10.5657 5.51252C10.5657 5.51252 8.72817 1.83752 5.51255 1.83752C2.29693 1.83752 0.459425 5.51252 0.459425 5.51252C0.459425 5.51252 2.29693 9.18752 5.51255 9.18752C8.72817 9.18752 10.5657 5.51252 10.5657 5.51252Z" stroke="#1E1E1E" strokeWidth="0.91875" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.51255 6.89065C4.75143 6.89065 4.13442 6.27364 4.13442 5.51252C4.13442 4.75141 4.75143 4.1344 5.51255 4.1344C6.27367 4.1344 6.89067 4.75141 6.89067 5.51252C6.89067 6.27364 6.27367 6.89065 5.51255 6.89065Z" stroke="#1E1E1E" strokeWidth="0.91875" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="1" y1="10" x2="10" y2="1" stroke="#1E1E1E" strokeWidth="0.91875" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="11.025" height="11.025" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <path d="M10.5657 5.51252C10.5657 5.51252 8.72817 1.83752 5.51255 1.83752C2.29693 1.83752 0.459425 5.51252 0.459425 5.51252C0.459425 5.51252 2.29693 9.18752 5.51255 9.18752C8.72817 9.18752 10.5657 5.51252 10.5657 5.51252Z" stroke="#1E1E1E" strokeWidth="0.91875" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.51255 6.89065C4.75143 6.89065 4.13442 6.27364 4.13442 5.51252C4.13442 4.75141 4.75143 4.1344 5.51255 4.1344C6.27367 4.1344 6.89067 4.75141 6.89067 5.51252C6.89067 6.27364 6.27367 6.89065 5.51255 6.89065Z" stroke="#1E1E1E" strokeWidth="0.91875" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const LoginForm = ({ onSignUp, onSubmit, loading, error  }) => {
 const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(!!rememberEmail.get());
  const [email, setEmail] = useState(rememberEmail.get());
  const [password, setPassword] = useState("");

  const handleRemember = (checked) => {
    setRememberMe(checked);
    if (!checked) rememberEmail.clear();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please fill all fields", "warning");
      return;
    }
    onSubmit({ email, password, rememberMe });
  };

  return (
    <div className="login-card">
      <h3 className="login-heading">Nice to see you again</h3>

      <form onSubmit={handleSubmit}>
        {error && (
          <p style={{ color: "#0096DB", fontSize: "13px", marginBottom: "8px" }}>
            {error}
          </p>
        )}

        <div className="login-form-group">
          <label>Login</label>

          <input
            type="text"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-form-group password-group">
          <label>Password</label>

          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <PasswordToggleIcon visible={showPassword} />
            </button>
          </div>
        </div>

        <div className="login-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => handleRemember(e.target.checked)}
            />

            <span className="toggle-slider"></span>

            <span className="remember-text">Remember me</span>
          </label>

          <a href="/" className="forgot-password">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="desktop-switch-auth">
          Don't have an account?
          <button type="button" onClick={onSignUp}>
            Sign up
          </button>
        </p>

        <div className="login-divider"></div>

        <button
          type="button"
          className="social-btn"
          onClick={() => dispatch(signInWithGoogle())}
        >
          <img src="/assets/images/auth/Google.svg" alt="Google" />
          <span>Sign in with Google</span>
        </button>

        <button
          type="button"
          className="social-btn"
          onClick={() => dispatch(signInWithApple())}
        >
          <img src="/assets/images/auth/Apple.svg" alt="Apple" />
          <span>Continue with Apple</span>
        </button>

        <button type="button" className="social-btn">
          <img src="/assets/images/auth/Email.svg" alt="Email" />
          <span>Continue with email</span>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;