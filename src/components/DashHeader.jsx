import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { FaArrowRight, FaCog } from 'react-icons/fa';
import Lottie from 'lottie-react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HamburgerMenu from '../svg/HamburgerMenu.json';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import './DashHeader.scss';

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

function DashHeader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  const onSettingsClicked = () => {
    // navigate to settings for the current user id; fallback to /dash/users if id missing
    if (id) navigate(`/dash/users/${id}/settings`);
    else navigate('/dash/users');
  };

  let dashClass = '';
  if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
    dashClass = 'dash-header__container--small';
  }

  const logoutButton = (
    <button type="button" className="icon-button" title="Logout" onClick={sendLogout}>
      <FaArrowRight />
    </button>
  );

  const settingsButton = (
    <button type="button" className="icon-button" title="Settings" onClick={onSettingsClicked}>
      <FaCog />
    </button>
  );

  const errClass = isError ? 'errmsg' : 'offscreen';

  const buttonContent = isLoading ? (
    <p>Logging Out...</p>
  ) : (
    <>
      {settingsButton}
      {logoutButton}
    </>
  );

  const content = (
    <header className={`dash-header__container ${dashClass}`}>
      {error ? <p className={errClass}>{error?.data?.message}</p> : null}
      <Navbar collapseOnSelect expand="lg" className="navbar-dash">
        <a href="/dash" className="dash-header__nav hero-link" aria-label="Dashboard home">
          <Lottie className="header_icon" animationData={HamburgerMenu} loop={false} />
        </a>
        <Navbar.Brand href="/dash" />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown className="dash-nav-link" title="Inventory" id="inventory-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">View Inventory</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">Add New Inventory</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">Edit Inventory</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Inventory Transactions</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Purchasing" id="purchasing-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Purchase Order</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">Inventory Levels</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">Cost Reports</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Engineering" id="engineering-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Engineering BOM</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">Datasheets</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">MSDA Sheets</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {buttonContent}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );

  return content;
}

export default DashHeader;
