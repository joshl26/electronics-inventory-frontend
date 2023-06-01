import "./LoginHeader.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Lottie from "lottie-react";
import HamburgerMenu from "../../svg/HamburgerMenu.json";
import LightToDarkButton from "../../svg/minimal_light_dark_toggle_button_2.json";
import DarkToLightButton from "../../svg/minimal_light_dark_toggle_button_1.json";
import { useEffect } from "react";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const LoginHeader = ({ colorMode, onChangeColorMode }) => {
  const NavBarStyle =
    colorMode === "Light"
      ? "navbar-login navbar-light nav-bg-light"
      : "navbar-login navbar-dark nav-bg-dark";

  const LoginButtonStyle =
    colorMode === "Light" ? "btn-login-light" : "btn-login-dark";

  const SignupButtonStyle =
    colorMode === "Light" ? "btn-signup-light" : "btn-signup-dark";

  return (
    <Navbar className={NavBarStyle} collapseOnSelect expand="lg">
      <Container>
        <Lottie
          onClick={() => onChangeColorMode(colorMode)}
          className="header_icon"
          animationData={HamburgerMenu}
          loop={false}
        />
        <Navbar.Brand>
          <h1 className="login_text">Ei</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <div className="nav-item">
              <Link className="nav-link" to="/">
                Inventory Tracker
              </Link>
            </div>
            <NavDropdown title="Features" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/">Views</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Automation</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Power-Ups</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Templates</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Integrations</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Plans" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/pricing">Free Tier</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/pricing">Creator Tier</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/pricing">
                Corporate Tier
              </NavDropdown.Item>
            </NavDropdown>
            <div className="nav-item">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </div>
          </Nav>
          {/* <Nav>
            <Lottie
              className="header_icon"
              animationData={
                colorMode == "Light" ? LightToDarkButton : DarkToLightButton
              }
              loop={false}
            />
          </Nav> */}

          <Nav>
            <Link className="nav-link" to="/signup">
              <Button className={SignupButtonStyle} variant="danger">
                Signup
              </Button>
            </Link>
            <Link className="nav-link" to="/login">
              <Button className={LoginButtonStyle}>Log In</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LoginHeader;
