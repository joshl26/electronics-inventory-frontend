import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Lottie from "lottie-react";
import HamburgerMenu from "../../svg/HamburgerMenu.json";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./LoginHeader.css";

const COLLAPSE_ID = "responsive-navbar-nav";

const LoginHeader = ({ colorMode, onChangeColorMode }) => {
  const [expanded, setExpanded] = useState(false);

  const navBarClass =
    colorMode === "Light"
      ? "navbar-login navbar-light nav-bg-light"
      : "navbar-login navbar-dark nav-bg-dark";

  const loginBtnClass = colorMode === "Light" ? "btn-login-light" : "btn-login-dark";
  const signupBtnClass = colorMode === "Light" ? "btn-signup-light" : "btn-signup-dark";

  const handleToggle = useCallback(() => {
    if (typeof onChangeColorMode === "function") onChangeColorMode();
  }, [onChangeColorMode]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  const closeNav = useCallback(() => setExpanded(false), []);

  return (
    <Navbar
      className={navBarClass}
      collapseOnSelect
      expand="lg"
      expanded={expanded}
      onToggle={(next) => setExpanded(next)}
      role="navigation"
    >
      <Container>
        <Lottie
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className="header_icon"
          animationData={HamburgerMenu}
          loop={false}
          role="button"
          tabIndex={0}
          aria-label="Toggle color mode"
        />

        <Navbar.Brand as={Link} to="/" onClick={closeNav} aria-label="Go to home">
          <h1 className="login_text">Ei</h1>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls={COLLAPSE_ID} />
        <Navbar.Collapse id={COLLAPSE_ID}>
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="nav-link" onClick={closeNav}>
                Inventory Tracker
              </Nav.Link>
            </Nav.Item>

            <NavDropdown title="Features" id="nav-dropdown-features">
              <NavDropdown.Item as={Link} to="/features/views" onClick={closeNav}>
                Views
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/features/automation" onClick={closeNav}>
                Automation
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/features/power-ups" onClick={closeNav}>
                Power-Ups
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/features/templates" onClick={closeNav}>
                Templates
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/features/integrations" onClick={closeNav}>
                Integrations
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Plans" id="nav-dropdown-plans">
              <NavDropdown.Item as={Link} to="/pricing#free" onClick={closeNav}>
                Free Tier
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/pricing#standard" onClick={closeNav}>
                Standard Tier
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/pricing#premium" onClick={closeNav}>
                Premium Tier
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/pricing#enterprise" onClick={closeNav}>
                Enterprise Tier
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Item>
              <Nav.Link as={Link} to="/pricing" className="nav-link" onClick={closeNav}>
                Pricing
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Nav>
            <Nav.Item>
              <Button
                as={Link}
                to="/login"
                title="Signup"
                className={signupBtnClass}
                variant="danger"
                aria-label="Sign up"
                onClick={closeNav}
              >
                Sign Up
              </Button>
            </Nav.Item>

            <Nav.Item className="ms-2">
              <Button
                as={Link}
                to="/login"
                title="Login"
                className={loginBtnClass}
                aria-label="Log in"
                onClick={closeNav}
              >
                Log In
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

LoginHeader.propTypes = {
  colorMode: PropTypes.string,
  onChangeColorMode: PropTypes.func,
};

LoginHeader.defaultProps = {
  colorMode: "Light",
  onChangeColorMode: () => {},
};

export default React.memo(LoginHeader);