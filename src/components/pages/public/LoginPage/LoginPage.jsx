// src/components/pages/public/LoginPage/LoginPage.jsx

import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "components/features/auth/authSlice";
import { useLoginMutation } from "components/features/auth/authApiSlice";
import usePersist from "hooks/usePersist";
import Lottie from "lottie-react";
import HamburgerMenu from "svg/HamburgerMenu.json";
import { Col, Container, Row } from "react-bootstrap";
import LoadingPage from "components/pages/LoadingPage";
import "./LoginPage.css";

const LoginPage = () => {
  const userRef = useRef();
  const errRef = useRef();

  // Form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // Persist login state
  const [persist, setPersist] = usePersist();

  // UI state for login steps
  const [loginStep, setLoginStep] = useState("username"); // 'username' or 'password'

  // Disable username input after continue
  const isUsernameDisabled = loginStep === "password";

  // Show password and sign-in button only on password step
  const showPassword = loginStep === "password";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  // Focus username input on mount
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // Clear error message on input change
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  // Handlers
  const handleUsernameChange = useCallback(
    (e) => setUsername(e.target.value),
    []
  );
  const handlePasswordChange = useCallback(
    (e) => setPassword(e.target.value),
    []
  );
  const handleTogglePersist = useCallback(
    () => setPersist((prev) => !prev),
    [setPersist]
  );

  const handleContinueClick = useCallback(() => {
    if (username.trim()) {
      setLoginStep("password");
    }
  }, [username]);

  const handleUsernameClick = useCallback(() => {
    if (isUsernameDisabled) {
      setLoginStep("username");
      setPassword("");
    }
  }, [isUsernameDisabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      console.log("Login error:", err);
      if (!err.status) setErrMsg("No Server Response");
      else if (err.status === 400) setErrMsg("Missing Username or Password");
      else if (err.status === 401) setErrMsg("Unauthorized");
      else setErrMsg(err.data?.message || "Login Failed");
      errRef.current?.focus();
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div>
      <Container>
        <div className="spacer-extra-small" />
        <Row>
          <Col />
          <Col md={2} className="login-col-align-left">
            <Link to="/" aria-label="Home">
              <Lottie
                className="login-icon"
                animationData={HamburgerMenu}
                loop={false}
              />
            </Link>
            <h1 className="login-text">Ei</h1>
          </Col>
          <Col />
        </Row>

        <div>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
            aria-atomic="true"
            role="alert"
          >
            {errMsg}
          </p>

          <form className="form" onSubmit={handleSubmit} noValidate>
            <h4 className="text-center login-header">Log in to Ei</h4>

            <div
              onClick={handleUsernameClick}
              aria-label="Username input container"
            >
              <input
                className="form__input"
                type="text"
                id="username"
                ref={userRef}
                value={username}
                onChange={handleUsernameChange}
                autoComplete="off"
                required
                placeholder="Enter Username"
                disabled={isUsernameDisabled}
                aria-describedby={errMsg ? "error-message" : undefined}
                autoFocus
              />
            </div>

            {showPassword && (
              <>
                <label htmlFor="password">Password:</label>
                <input
                  className="form__input"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  autoComplete="current-password"
                />
              </>
            )}

            {loginStep === "username" && (
              <button
                type="button"
                onClick={handleContinueClick}
                className="form__submit-button"
                disabled={!username.trim()}
              >
                Continue
              </button>
            )}

            <div className="spacer-tiny" />

            {showPassword && (
              <>
                <button type="submit" className="form__submit-button">
                  Sign In
                </button>

                <label htmlFor="persist" className="form__persist">
                  <input
                    type="checkbox"
                    className="form__checkbox"
                    id="persist"
                    onChange={handleTogglePersist}
                    checked={persist}
                  />
                  Trust This Device
                </label>
              </>
            )}
          </form>

          <div className="spacer-extra-small" />

          {/* Alternative login options */}
          <form className="form" aria-label="Alternative login options">
            {/* Uncomment and implement alternative login buttons if needed */}
            {/* <Row>
              <p className="text-center light">OR</p>
            </Row> */}

            {/* {[
              { name: "Google", src: "https://res.cloudinary.com/dv6keahg3/image/upload/v1689541688/ElectronicsInventory/frontend_ui_images/Google_color_edzwj2.svg" },
              { name: "Microsoft", src: "https://res.cloudinary.com/dv6keahg3/image/upload/v1689541690/ElectronicsInventory/frontend_ui_images/Microsoft_color_duzdcl.svg" },
              { name: "Apple", src: "https://res.cloudinary.com/dv6keahg3/image/upload/v1689541690/ElectronicsInventory/frontend_ui_images/Apple_color_ax7zu9.svg" },
              { name: "Slack", src: "https://res.cloudinary.com/dv6keahg3/image/upload/v1689541691/ElectronicsInventory/frontend_ui_images/Slack_color_gfgg0w.svg" },
            ].map(({ name, src }) => (
              <Row key={name}>
                <button
                  type="button"
                  onClick={handleContinueClick}
                  className="form__submit-button"
                  aria-label={`Continue with ${name}`}
                >
                  Continue with {name}
                  <img alt={`${name} Login`} className="login-button-icon" src={src} />
                </button>
              </Row>
            ))} */}

            <div className="spacer-extra-small" />

            <Col>
              <Row className="text-center">
                <p>
                  Can't log in?
                  <span style={{ color: "white" }}> | </span>{" "}
                  <Link to="/signup" tabIndex={0}>
                    Sign up for an account
                  </Link>
                </p>
              </Row>
            </Col>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
