import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Lottie from "lottie-react";
import HamburgerMenu from "svg/HamburgerMenu.json";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ThemeToggle from "components/common/ThemeToggle/ThemeToggle";
import "./PublicHeader.scss";

const NAV_ITEMS = [
  { to: "/about", label: "About", type: "link" },
  { to: "/features", label: "Features", type: "link" },
  { to: "/pricing", label: "Pricing", type: "link" },
  { to: "/contact", label: "Contact", type: "link" },
];

const PublicHeader = () => {
  const [expanded, setExpanded] = useState(false);

  const navBarClass = "navbar-login";
  const loginBtnClass = "btn-login";
  const signupBtnClass = "btn-signup";

  const handleNavCollapse = useCallback(() => {
    setExpanded(false);
  }, []);

  const renderNavItem = useCallback(
    (item, index) => {
      if (item.type === "link") {
        return (
          <Nav.Item key={item.to || index}>
            <Nav.Link
              as={Link}
              to={item.to}
              className="nav-link"
              onClick={handleNavCollapse}
              aria-label={item.label}
            >
              {item.label}
            </Nav.Link>
          </Nav.Item>
        );
      }

      if (item.type === "dropdown") {
        return (
          <NavDropdown
            key={item.id}
            title={item.label}
            id={`nav-dropdown-${item.id}`}
            aria-label={`${item.label} menu`}
          >
            {item.items.map((subItem, idx) => (
              <React.Fragment key={subItem.to}>
                <NavDropdown.Item
                  as={Link}
                  to={subItem.to}
                  onClick={handleNavCollapse}
                  aria-label={subItem.label}
                >
                  {subItem.label}
                </NavDropdown.Item>
                {idx < item.items.length - 1 && <NavDropdown.Divider />}
              </React.Fragment>
            ))}
          </NavDropdown>
        );
      }

      return null;
    },
    [handleNavCollapse]
  );

  return (
    <Navbar
      className={navBarClass}
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      fixed="top"
      role="navigation"
      aria-label="Main navigation"
    >
      <Container>
        {/* Logo & Brand */}
        <div className="d-flex align-items-center">
          <Navbar.Brand as={Link} to="/" aria-label="Ei - Go to home page">
            <div className="d-flex align-items-center gap-2">
              <Lottie
                className="header_icon"
                animationData={HamburgerMenu}
                loop={false}
                role="img"
                aria-label="Ei logo"
              />
              <h1 className="header_icon_text mb-0">Ei</h1>
            </div>
          </Navbar.Brand>
        </div>

        {/* Mobile Toggle */}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          aria-label="Toggle navigation menu"
        />

        {/* Navigation */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">{NAV_ITEMS.map(renderNavItem)}</Nav>

          {/* Right Side: Theme Toggle & Auth Buttons */}
          <Nav className="align-items-center">
            {/* Theme Toggle */}
            <Nav.Item className="me-3">
              <ThemeToggle />
            </Nav.Item>

            {/* Auth Buttons */}
            <Nav.Item>
              <Button
                as={Link}
                to="/signup"
                className={signupBtnClass}
                variant="primary"
                onClick={handleNavCollapse}
                aria-label="Sign up for an account"
              >
                Sign Up
              </Button>
            </Nav.Item>

            <Nav.Item className="ms-2">
              <Button
                as={Link}
                to="/login"
                className={loginBtnClass}
                onClick={handleNavCollapse}
                aria-label="Log in to your account"
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

export default React.memo(PublicHeader);
