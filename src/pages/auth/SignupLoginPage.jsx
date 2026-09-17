import { useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "@/utils/toast";

import MetaComponent from "@/components/common/MetaComponent";
import Header5 from "@/components/headers/Header5";

import SignupForm from "@/components/auth/SignupForm";
import LoginForm from "@/components/auth/LoginForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { rememberEmail } from "@/auth/rememberMe";
import { AUTHENTICATED_ENTRY, REDIRECT_URL_KEY } from "@/configs/AppConfig";
import { signIn, signUp } from "@/store/slices/authSlice";

const metadata = {
  title: "Sign up / Login | Kande Nagoya",
  description: "Sign up or login to Kande Nagoya.",
};

const invokeThunk = async ({ dispatch, thunk, payload, successMessage, setLoading, setError }) => {
  setError("");
  setLoading(true);
  const result = await dispatch(thunk(payload));
  setLoading(false);

  if (thunk.fulfilled.match(result)) {
    showToast(successMessage, "success");
    return result.payload;
  }
  if (thunk.rejected.match(result)) {
    setError(result.payload || "Something went wrong");
  }
  return null;
};

const SignupLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isSignup, setIsSignup] = useState(false);

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  const handleLogin = async ({ email, password, rememberMe }) => {
    const user = await invokeThunk({
      dispatch,
      thunk: signIn,
      payload: { email, password },
      successMessage: "Logged in successfully!",
      setLoading: setLoginLoading,
      setError: setLoginError,
    });

    if (user) {
      rememberMe ? rememberEmail.save(email) : rememberEmail.clear();
      const redirectTo = searchParams.get(REDIRECT_URL_KEY) || AUTHENTICATED_ENTRY;
      navigate(redirectTo, { replace: true });
    }
  };

  const handleSignup = async (payload) => {
    const account = await invokeThunk({
      dispatch,
      thunk: signUp,
      payload,
      successMessage: "Account created successfully!",
      setLoading: setSignupLoading,
      setError: setSignupError,
    });

    if (account) {
      setIsSignup(false);
    }
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header5 />

      <section className="signup-login-page">
        <div className="signup-login-container">
          <div className="desktop-auth">
            <h2 className="signup-login-title">Sign up / Login</h2>

            <div className="signup-login-card">
              <div className="signup-section">
                <SignupForm
                  onSignIn={() => setIsSignup(false)}
                  onSubmit={handleSignup}
                  loading={signupLoading}
                  error={signupError}
                />
              </div>

              <div className="signup-login-divider">
                <img
                  src="/assets/images/auth/Divider.svg"
                  alt="Divider"
                  className="divider-line"
                />
                <span className="divider-text">or</span>
                <img
                  src="/assets/images/auth/Divider.svg"
                  alt="Divider"
                  className="divider-line"
                />
              </div>

              <div className="login-section">
                 <LoginForm
                  onSignUp={() => setIsSignup(true)}
                  onSubmit={handleLogin}
                  loading={loginLoading}
                  error={loginError}
                />
              </div>
            </div>
          </div>

          <div className="mobile-auth">
            <h2 className="signup-login-title">
              {isSignup ? "Sign up" : "Login"}
            </h2>

            {isSignup ? (
              <>
                <SignupForm
                  onSignIn={() => setIsSignup(false)}
                  onSubmit={handleSignup}
                  loading={signupLoading}
                  error={signupError}
                />

                <p className="switch-auth">
                  Already have an account?
                  <button type="button" onClick={() => setIsSignup(false)}>
                    Sign in
                  </button>
                </p>
              </>
            ) : (
              <>
                <LoginForm
                  onSignUp={() => setIsSignup(true)}
                  onSubmit={handleLogin}
                  loading={loginLoading}
                  error={loginError}
                />

                <p className="switch-auth">
                  Don't have an account?
                  <button type="button" onClick={() => setIsSignup(true)}>
                    Sign up
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupLoginPage;