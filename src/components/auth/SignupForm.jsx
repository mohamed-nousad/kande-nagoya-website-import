import React, { useState } from "react";
import { showToast } from "@/utils/toast";

const SignupForm = ({ onSubmit, onSignIn, loading, error }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeNewsletter, setAgreeNewsletter] = useState(false);
  const [notRobot, setNotRobot] = useState(false);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.confirmPassword) {
      showToast("Please fill all fields", "warning");
      return;
    }
    if (form.password !== form.confirmPassword) {
      showToast("Passwords do not match", "warning");
      return;
    }
    if (!agreeTerms) {
      showToast("Please agree to the Terms of Service", "warning");
      return;
    }
    if (!notRobot) {
      showToast("Please confirm you are not a robot", "warning");
      return;
    }

    onSubmit({
      userName: form.email.split("@")[0],
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      newsletter: agreeNewsletter,
    });
  };

  return (
    <div className="signup-card">
      <div className="signup-left">
        <form onSubmit={handleSubmit}>
          {error && (
            <p style={{ color: "#0096DB", fontSize: "13px", marginBottom: "8px" }}>
              {error}
            </p>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label>Re-Enter Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-Enter Password"
              value={form.confirmPassword}
              onChange={onChange}
            />
          </div>

          <div className="terms-box">
            <div className="checkbox-row">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span className="checkmark" aria-hidden="true"></span>
              </label>

              <span className="terms-text">
                I agree to <a href="/">Kan-de Terms of Service</a> and{" "}
                <a href="/">Kan-de Auction Terms of Service</a> and confirm{" "}
                <a href="/">Privacy Note</a>{" "}
                <span className="required">*Required</span>
              </span>
            </div>
          </div>

          <div className="checkbox-row newsletter">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={agreeNewsletter}
                onChange={(e) => setAgreeNewsletter(e.target.checked)}
              />
              <span className="checkmark" aria-hidden="true"></span>
            </label>

            <span>
              I agree to receive email newsletters tailored to my preferences from
              Kan-de.com.jp
            </span>
          </div>

          <ul className="signup-note">
            <li>
              Kan-de.com.jp does not offer its service to children less then
              eighteen (18) years of age.
            </li>
            <li>
              You can withdraw your consent at any time from "My Profile" Page.
            </li>
          </ul>

          <div className="captcha-title">
            reCAPTCHA <span>*Required</span>
          </div>

          <div className="captcha-box">
            <div className="captcha-left">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={notRobot}
                  onChange={(e) => setNotRobot(e.target.checked)}
                />
                <span className="checkmark" aria-hidden="true"></span>
              </label>

              <span>I'm not a robot</span>
            </div>

            <div className="captcha-right">
              <img src="/assets/images/auth/Capa_1.svg" alt="captcha" />
              <small>reCAPTCHA</small>
              <p>Privacy • Terms</p>
            </div>
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>

          <p className="desktop-switch-auth">
            Already have an account?
            <button type="button" onClick={onSignIn}>
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;