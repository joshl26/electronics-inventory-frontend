/* eslint-disable no-console */
import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import Lottie from 'lottie-react';
import { Col, Container, Row } from 'react-bootstrap';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';

import usePersist from '../../hooks/usePersist';

import HamburgerMenu from '../../svg/HamburgerMenu.json';

import LoadingPage from '../../components/LoadingPage';
import './Login.css';

function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [persist, setPersist] = usePersist();
  const [continueBtn, setContinueBtn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // remove unused setter
  const colorMode = JSON.parse(localStorage.getItem('colorMode')) ?? 'Light';

  const loginContainerStyle =
    colorMode === 'Light' ? 'login-container-inner-light' : 'login-container-inner-dark';

  const sectionBreakStyle = colorMode === 'Light' ? 'section-break-light' : 'section-break-dark';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userRef?.current?.focus) userRef.current.focus();
  }, []);

  useEffect(() => {
    // clear error when user edits inputs
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      // store credentials via redux slice (slice may also persist to localStorage)
      dispatch(setCredentials({ accessToken }));
      // reset UI state
      setUsername('');
      setPassword('');
      navigate('/dash');
    } catch (err) {
      // Defensive error handling to avoid runtime throws when error shape differs
      const status =
        err?.status ??
        err?.originalStatus ??
        err?.data?.status ??
        (err && typeof err === 'object' && 'status' in err ? err.status : undefined);

      const serverMessage =
        err?.data?.message ?? // fetch-based responses
        err?.message ?? // Error.message
        (typeof err === 'string' ? err : undefined);

      if (!status) {
        setErrMsg('No Server Response');
      } else if (status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(serverMessage ?? 'Login failed');
      }

      // focus the visible error for accessibility if available
      if (errRef?.current?.focus) errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);
  const handleContinueBtnClick = () => {
    if ((username || '').trim().length > 0) {
      setContinueBtn(false);
      setShowPassword(true);
      setShowSignIn(true);
      setDisabled(true);
    }
  };

  const handleUsernameClick = () => {
    if (disabled === true) {
      setDisabled(false);
      setShowPassword(false);
      setContinueBtn(true);
      setShowSignIn(false);
    }
  };

  const errClass = errMsg ? 'errmsg' : 'offscreen';

  const loginStyle = colorMode === 'Light' ? 'login-light' : 'login-dark';

  if (isLoading) return <LoadingPage />;

  const content = (
    <div className={loginStyle}>
      <Container>
        <div className="spacer-extra=small" />
        <Row>
          <Col />
          <Col md={2} className="login-col-align-left">
            <Link to="/">
              <Lottie className="login-icon" animationData={HamburgerMenu} loop={false} />
            </Link>

            <h1 className="login-text">Ei</h1>
          </Col>
          <Col />
        </Row>
        <div className={loginContainerStyle}>
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>
          <form className="form" onSubmit={handleSubmit}>
            <h4 className="text-center login-header">Log in to Ei</h4>

            <div>
              <input
                className="form__input"
                type="text"
                id="username"
                ref={userRef}
                value={username}
                onChange={handleUserInput}
                onClick={handleUsernameClick}
                autoComplete="off"
                required
                placeholder="Enter Username"
                disabled={disabled}
                aria-label="Email"
                data-testid="username-input"
              />
            </div>

            {showPassword ? (
              <label htmlFor="password">
                Password:
                <input
                  className="form__input"
                  type="password"
                  id="password"
                  onChange={handlePwdInput}
                  value={password}
                  required
                  aria-label="Password"
                />
              </label>
            ) : null}

            {continueBtn ? (
              <button
                type="button"
                onClick={handleContinueBtnClick}
                className="form__submit-button"
                data-testid="continue-button"
              >
                Continue
              </button>
            ) : null}

            <div className="spacer-tiny" />

            {showSignIn ? (
              <>
                {/* Submit button - will trigger form submit */}
                <button className="form__submit-button" type="submit">
                  Sign In
                </button>

                <label htmlFor="persist" className="form__persist">
                  <input
                    type="checkbox"
                    className="form__checkbox"
                    id="persist"
                    onChange={handleToggle}
                    checked={persist}
                  />
                  Trust This Device
                </label>
              </>
            ) : null}
          </form>

          <div className="spacer-extra-small" />

          <form className="form" aria-label="third-party auth">
            <Row>
              <p className="text-center light">OR</p>
            </Row>
            <Row>
              <button
                type="button"
                onClick={handleContinueBtnClick}
                className="form__submit-button"
                aria-label="Continue with Google"
              >
                Continue with Google
                <img
                  className="login-button-icon"
                  alt="Google Login"
                  src="https://res.cloudinary.com/dv6keahg3/image/upload/v1689541688/ElectronicsInventory/frontend_ui_images/Google_color_edzwj2.svg"
                />
              </button>
            </Row>
            <Row>
              <button
                type="button"
                onClick={handleContinueBtnClick}
                className="form__submit-button"
                aria-label="Continue with Microsoft"
              >
                Continue with Microsoft
                <img
                  alt="Microsoft Login"
                  className="login-button-icon"
                  src="https://res.cloudinary.com/dv6keahg3/image/upload/v1689541690/ElectronicsInventory/frontend_ui_images/Microsoft_color_duzdcl.svg"
                />
              </button>
            </Row>
            <Row>
              <button
                type="button"
                onClick={handleContinueBtnClick}
                className="form__submit-button"
                aria-label="Continue with Apple"
              >
                Continue with Apple
                <img
                  alt="Apple Login"
                  className="login-button-icon"
                  src="https://res.cloudinary.com/dv6keahg3/image/upload/v1689541690/ElectronicsInventory/frontend_ui_images/Apple_color_ax7zu9.svg"
                />
              </button>
            </Row>
            <Row>
              <button
                type="button"
                onClick={handleContinueBtnClick}
                className="form__submit-button"
                aria-label="Continue with Slack"
              >
                Continue with Slack{' '}
                <img
                  alt="Slack Login"
                  className="login-button-icon"
                  src="https://res.cloudinary.com/dv6keahg3/image/upload/v1689541691/ElectronicsInventory/frontend_ui_images/Slack_color_gfgg0w.svg"
                />
              </button>
            </Row>
            <div className="spacer-extra-small" />
            <div className={sectionBreakStyle} />

            <Col>
              <Row className="text-center">
                <p>
                  <Link to="/help">Can&apos;t log in?</Link>{' '}
                  <span style={{ display: 'inline', color: ' white' }}> | </span>{' '}
                  <Link to="/register">Sign up for an account</Link>
                </p>
              </Row>
            </Col>
          </form>
        </div>

        <div className="spacer-extra-small" />

        <Col>
          <Row className="text-center">
            <p>
              <Link to="/privacy">Privacy Policy</Link>
              <span style={{ display: 'inline', color: ' white' }}> | </span>
              <Link to="/terms">Terms of Service</Link>
            </p>
          </Row>
        </Col>

        <div className="spacer-extra-small" />

        <Col className="text-center">
          <form
            className="LanguageSelectFormstyles__LanguageForm-sc-5xddw4-0 eSGOHD"
            aria-label="language selection"
          >
            <label htmlFor="language-select" className="sr-only">
              Select language{' '}
              <select
                id="language-select"
                aria-label="Select a language"
                data-testid="language-select"
              >
                {/* options omitted for brevity in this example but kept in your source */}
                <option value="en" data-uuid="en_language">
                  English
                </option>
                {/* ... */}
              </select>
            </label>
          </form>
        </Col>

        <div className="spacer-small" />
        <div className="spacer-extra-small" />
        <div className="spacer-extra-small" />
        <Col>
          <div className={sectionBreakStyle} />
        </Col>
        <div className="spacer-extra-small" />
        <div className="spacer-extra-small" />
        <Col>
          <h3 className="text-center">BlackRock Design Haus</h3>
        </Col>
        <div className="spacer-extra-small" />
        <Row>
          <Col>
            <Link to="/templates">
              <p className="login-footer-links">Templates</p>
            </Link>
          </Col>
          <Col>
            <Link to="/pricing">
              <p>Pricing</p>
            </Link>
          </Col>
          <Col>
            <Link to="/apps">
              <p>Apps</p>
            </Link>
          </Col>
          <Col>
            <Link to="/jobs">
              <p>Jobs</p>
            </Link>
          </Col>
          <Col>
            <Link to="/blog">
              <p>Blog</p>
            </Link>
          </Col>
          <Col>
            <Link to="/developers">
              <p>Developers</p>
            </Link>
          </Col>
          <Col>
            <Link to="/about">
              <p>About</p>
            </Link>
          </Col>
          <Col>
            <Link to="/help">
              <p>Help</p>
            </Link>
          </Col>
          <Col>
            <Link to="/cookie-settings">
              <p>Cookie Settings</p>
            </Link>
          </Col>
        </Row>
        <div className="spacer-extra-small" />
      </Container>
    </div>
  );

  return content;
}
export default Login;
