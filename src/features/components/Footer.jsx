import PropTypes from 'prop-types';
import './Footer.css';
import { SocialIcon } from 'react-social-icons';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from '../../svg/HamburgerMenu.json';

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'cs', label: 'Čeština' },
  { value: 'de', label: 'Deutsch' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'it', label: 'Italiano' },
  { value: 'hu', label: 'Magyar' },
  { value: 'nl', label: 'Nederlands' },
  { value: 'nb', label: 'Norsk (bokmål)' },
  { value: 'pl', label: 'Polski' },
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'fi', label: 'Suomi' },
  { value: 'sv', label: 'Svenska' },
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'tr', label: 'Türkçe' },
  { value: 'ru', label: 'Русский' },
  { value: 'uk', label: 'Українська' },
  { value: 'th', label: 'ภาษาไทย' },
  { value: 'zh-Hans', label: '中文 (简体)' },
  { value: 'zh-Hant', label: '中文 (繁體)' },
  { value: 'ja', label: '日本語' },
];

function Footer({ colorMode }) {
  const [language, setLanguage] = useState('en');
  const isLight = colorMode === 'Light';
  const footerClass = isLight ? 'login-footer-light' : 'login-footer-dark';
  const footerButtonClass = isLight ? 'footer-button-light' : 'footer-button-dark';
  const sectionBreakClass = isLight ? 'section-break-light' : 'section-break-dark';
  const currentYear = new Date().getFullYear();

  // Read language once on mount. Store as plain string for simplicity.
  useEffect(() => {
    try {
      const stored = localStorage.getItem('language');
      if (stored && typeof stored === 'string') {
        setLanguage(stored);
      } else {
        localStorage.setItem('language', 'en');
        setLanguage('en');
      }
    } catch (err) {
      // If access to localStorage fails for any reason, default to 'en'
      setLanguage('en');
    }
  }, []); // run once

  const onLanguageChangeHandler = (e) => {
    const languageChange = e.target.value;
    setLanguage(languageChange);
    try {
      localStorage.setItem('language', languageChange);
    } catch {
      // ignore localStorage errors
    }
  };

  return (
    <footer className={footerClass} role="contentinfo">
      <Container fluid className="footer-container">
        <div className="spacer-x-small" />

        <Row className="login-footer-button-row gx-2 gy-3 align-items-center">
          <Col xs={12} sm={6} md={3} lg={2} className="d-flex align-items-center">
            <Link to="/" aria-label="Home" className="footer-brand-link">
              <div className="footer-brand">
                <Lottie
                  className="footer-icon"
                  animationData={HamburgerMenu}
                  loop={false}
                  aria-hidden="true"
                />
                <span className="footer-icon-text" aria-hidden="true">
                  Ei
                </span>
              </div>
            </Link>
          </Col>

          <Col xs={12} sm={6} md={2} lg={2}>
            <Button as={Link} to="/about" className={footerButtonClass} variant="link">
              <div>
                <h3 className="footer-h4-text">About</h3>
                <p className="footer-p-text">What&apos;s behind the boards.</p>
              </div>
            </Button>
          </Col>

          <Col xs={12} sm={6} md={2} lg={2}>
            <Button as={Link} to="/jobs" className={footerButtonClass} variant="link">
              <div>
                <h3 className="footer-h4-text">Jobs</h3>
                <p className="footer-p-text">Learn about open roles on the Ei team.</p>
              </div>
            </Button>
          </Col>

          <Col xs={12} sm={6} md={2} lg={2}>
            <Button as={Link} to="/apps" className={footerButtonClass} variant="link">
              <div>
                <h3 className="footer-h4-text">Apps</h3>
                <p className="footer-p-text">
                  Download the Ei app for your Desktop or Mobile devices.
                </p>
              </div>
            </Button>
          </Col>

          <Col xs={12} sm={6} md={3} lg={2}>
            <Button as={Link} to="/contact" className={footerButtonClass} variant="link">
              <div>
                <h3 className="footer-h4-text">Contact Us</h3>
                <p className="footer-p-text">Get in touch with the Ei team.</p>
              </div>
            </Button>
          </Col>
        </Row>

        <div className={sectionBreakClass} />

        <Row className="footer-social-row align-items-center gy-3">
          <Col xs={12} md={2} className="d-flex align-items-center">
            <label htmlFor="language-select" className="footer-h4-text visually-hidden">
              Select language{' '}
              <div>
                <h4 className="footer-h4-text mb-1">Language</h4>
                <select
                  id="language-select"
                  name="language"
                  aria-label="Select a language"
                  data-testid="language-select"
                  onChange={onLanguageChangeHandler}
                  value={language}
                  className="footer-language-select"
                >
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </Col>

          <Col xs={12} md={2}>
            <Link to="/privacy" className="footer-link footer-p-text" aria-label="Privacy Policy">
              Privacy Policy
            </Link>
          </Col>

          <Col xs={12} md={1}>
            <Link to="/terms" className="footer-link footer-p-text" aria-label="Terms of service">
              Terms
            </Link>
          </Col>

          <Col xs={12} md={2}>
            <Link
              to="/cookies"
              className="footer-link footer-p-text-light"
              aria-label="Cookie settings"
            >
              Cookie Settings
            </Link>
          </Col>

          <Col xs={12} md={2}>
            <p className="footer-p-text mb-0">Copyright © {currentYear} BlackRock Design Haus</p>
          </Col>

          <Col xs="auto" className="ms-auto d-flex justify-content-end social-icons-col">
            <SocialIcon
              className="social-icon"
              url="https://www.linkedin.com/company/90619779/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            />
            <SocialIcon
              className="social-icon"
              url="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            />
            <SocialIcon
              className="social-icon"
              url="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            />
            <SocialIcon
              className="social-icon"
              url="https://google.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google"
            />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  colorMode: PropTypes.string,
};

Footer.defaultProps = {
  colorMode: 'Light',
};

export default Footer;
