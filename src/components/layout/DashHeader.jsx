import { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { FaArrowRight, FaCog } from "react-icons/fa";

import Lottie from "lottie-react";
import HamburgerMenu from "../../svg/HamburgerMenu.json";
import useAuth from "../../hooks/useAuth";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./DashHeader.css";
import { Col, Row } from "react-bootstrap";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { username, status } = useAuth();

  const { id } = useParams();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onSettingsClicked = () => navigate(`/dash/users/${id}settings`);

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  const userInfo = (
    <Row className="dash-header-row">
      <Col>
        <p className="dash-header-paragraph">User: {username}</p>
      </Col>
      <Col md={7}>
        <p className="dash-header-paragraph">Role: {status}</p>
      </Col>
    </Row>
  );

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout}>
      <FaArrowRight />
    </button>
  );

  const settingsButton = (
    <button
      className="icon-button"
      title="Settings"
      onClick={onSettingsClicked}
    >
      <FaCog />
    </button>
  );

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>;
  } else {
    buttonContent = (
      <>
        {userInfo}
        {settingsButton}
        {logoutButton}
      </>
    );
  }

  const content = (
    <header className={`dheader_textash-header__container ${dashClass}`}>
      {error ? <p className={errClass}>{error?.data?.message}</p> : ""}
      <Navbar collapseOnSelect expand="lg" className="navbar-dash">
        <a href="/dash" className="dash-header__nav hero-link">
          <Lottie
            className="header_icon"
            animationData={HamburgerMenu}
            loop={false}
          />
        </a>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              className="dash-nav-link"
              title="Inventory"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">
                View Inventory
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">
                Add New Inventory
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">
                Edit Inventory
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Inventory Transactions
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Purchasing" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Purchase Order
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">
                Inventory Levels
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">
                Cost Reports
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Engineering" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Engineering BOM
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item href="#action/3.2">Datasheets</NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item href="#action/3.3">
                MSDA Sheets
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {buttonContent}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );

  return content;
};
export default DashHeader;
