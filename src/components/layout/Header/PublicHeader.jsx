// Updated LoginHeader with integrated theme toggle
// file: src/features/pages/LoginHeader.jsx

import React, { useMemo, useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Lottie from "lottie-react";
import HamburgerMenu from "svg/HamburgerMenu.json";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useTheme } from "context/ThemeContext";
import ThemeToggle from "components/common/ThemeToggle/ThemeToggle";
import "./PublicHeader.scss";

// const FEATURES_MENU = [
//   { to: "/features/views", label: "Views" },
//   { to: "/features/automation", label: "Automation" },
//   { to: "/features/power-ups", label: "Power-Ups" },
//   { to: "/features/templates", label: "Templates" },
//   { to: "/features/integrations", label: "Integrations" },
// ];

// const PLANS_MENU = [
//   { to: "/pricing#free", label: "Free Tier" },
//   { to: "/pricing#standard", label: "Standard Tier" },
//   { to: "/pricing#premium", label: "Premium Tier" },
//   { to: "/pricing#enterprise", label: "Enterprise Tier" },
// ];

const NAV_ITEMS = [
  // { to: "/", label: "Inventory Tracker", type: "link" },
  // { label: "Features", type: "dropdown", id: "features", items: FEATURES_MENU },
  // { label: "Plans", type: "dropdown", id: "plans", items: PLANS_MENU },
  { to: "/features", label: "Features", type: "link" },
  { to: "/pricing", label: "Pricing", type: "link" },
  { to: "/contact", label: "Contact", type: "link" },
];

const PublicHeader = () => {
  const { isDark } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const navBarClass = useMemo(() => {
    const base = "navbar-login";
    const theme = isDark ? "navbar-dark" : "navbar-light";
    const bg = isDark ? "nav-bg-dark" : "nav-bg-light";
    return `${base} ${theme} ${bg}`;
  }, [isDark]);

  const loginBtnClass = useMemo(
    () => (isDark ? "btn-login-dark" : "btn-login-light"),
    [isDark]
  );

  const signupBtnClass = useMemo(
    () => (isDark ? "btn-signup-dark" : "btn-signup-light"),
    [isDark]
  );

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
              <h1 className="login_text mb-0">Ei</h1>
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
                to="/login"
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
