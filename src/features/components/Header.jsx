import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import HamburgerMenu from '../../svg/HamburgerMenu.json';
import './Header.css';

function Header({ colorMode, onChangeColorMode }) {
  const isLight = colorMode === 'Light';

  const navBarClass = `navbar-login ${isLight ? 'navbar-light nav-bg-light' : 'navbar-dark nav-bg-dark'}`;
  const loginBtnClass = isLight ? 'btn-login-light' : 'btn-login-dark';
  const signupBtnClass = isLight ? 'btn-signup-light' : 'btn-signup-dark';
  const signupVariant = isLight ? 'primary' : 'outline-light';
  const loginVariant = isLight ? 'outline-primary' : 'dark';

  // toggle handler: flip between Light and Dark
  const handleToggleColor = () => {
    if (onChangeColorMode) {
      onChangeColorMode(isLight ? 'Dark' : 'Light');
    }
  };

  const handleKeyToggle = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleColor();
    }
  };

  return (
    <Navbar
      className={navBarClass}
      collapseOnSelect
      expand="lg"
      fixed="top"
      variant={isLight ? 'light' : 'dark'}
    >
      <Container fluid>
        <div
          className="header_icon_wrapper"
          role="button"
          tabIndex={0}
          aria-label="Toggle color mode"
          onClick={handleToggleColor}
          onKeyDown={handleKeyToggle}
          title={`Switch to ${isLight ? 'Dark' : 'Light'} mode`}
        >
          <Lottie className="header_icon" animationData={HamburgerMenu} loop={false} aria-hidden />
        </div>

        <Navbar.Brand as={Link} to="/" className="brand_link" aria-label="Home">
          <h1 className="login_text">Ei</h1>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" aria-label="Toggle navigation" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" role="navigation">
            <Nav.Item className="nav-item">
              <Nav.Link as={Link} to="/" className="nav-link link_text">
                Inventory Tracker
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="nav-item">
              <Nav.Link as={Link} to="/features" className="nav-link link_text">
                Features
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="nav-item">
              <Nav.Link as={Link} to="/plans" className="nav-link link_text">
                Plans
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="nav-item">
              <Nav.Link as={Link} to="/pricing" className="nav-link link_text">
                Pricing
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Nav className="align-items-center">
            <Button
              as={Link}
              to="/signup"
              title="Sign up"
              className={`me-2 ${signupBtnClass}`}
              variant={signupVariant}
              type="button"
            >
              Sign Up
            </Button>

            <Button
              as={Link}
              to="/login"
              title="Log in"
              className={`${loginBtnClass}`}
              variant={loginVariant}
              type="button"
            >
              Log In
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Header.propTypes = {
  colorMode: PropTypes.string,
  onChangeColorMode: PropTypes.func,
};

Header.defaultProps = {
  colorMode: 'Light',
  onChangeColorMode: undefined,
};

export default Header;
