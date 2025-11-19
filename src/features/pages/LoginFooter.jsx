import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Button,
  Form
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { SocialIcon } from "react-social-icons";

import HamburgerMenu from "../../svg/HamburgerMenu.json";
import "./LoginFooter.scss";

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "cs", label: "Čeština" },
  { value: "de", label: "Deutsch" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "it", label: "Italiano" },
  { value: "hu", label: "Magyar" },
  { value: "nl", label: "Nederlands" },
  { value: "nb", label: "Norsk (bokmål)" },
  { value: "pl", label: "Polski" },
  { value: "pt-BR", label: "Português (Brasil)" },
  { value: "fi", label: "Suomi" },
  { value: "sv", label: "Svenska" },
  { value: "vi", label: "Tiếng Việt" },
  { value: "tr", label: "Türkçe" },
  { value: "ru", label: "Русский" },
  { value: "uk", label: "Українська" },
  { value: "th", label: "ภาษาไทย" },
  { value: "zh-Hans", label: "中文 (简体)" },
  { value: "zh-Hant", label: "中文 (繁體)" },
  { value: "ja", label: "日本語" }
];

const FOOTER_LINKS = [
  {
    to: "/about",
    title: "About",
    description: "What's behind the boards."
  },
  {
    to: "/jobs",
    title: "Jobs",
    description: "Learn about open roles on the Ei team."
  },
  {
    to: "/apps",
    title: "Apps",
    description: "Download the Ei app for Desktop & Mobile."
  },
  {
    to: "/contact",
    title: "Contact Us",
    description: "Get in touch with the Ei team."
  }
];

const SOCIAL_LINKS = [
  {
    url: "https://www.linkedin.com/company/90619779/",
    label: "LinkedIn"
  },
  {
    url: "https://facebook.com/",
    label: "Facebook"
  },
  {
    url: "https://github.com/",
    label: "GitHub"
  },
  {
    url: "https://google.com/",
    label: "Google"
  }
];

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms" },
  { to: "/cookies", label: "Cookie Settings" }
];

const STORAGE_KEY = "language";

const LoginFooter = ({ colorMode }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : "en";
    } catch {
      return "en";
    }
  });

  const [isVisible, setIsVisible] = useState(false);

  // Fade in animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Initialize localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(language));
      }
    } catch {
      // ignore localStorage errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLanguageChangeHandler = useCallback((e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLang));
    } catch {
      // ignore
    }
  }, []);

  const loginFooterClass = useMemo(
    () => `login-footer-${colorMode.toLowerCase()} ${isVisible ? 'footer-visible' : ''}`,
    [colorMode, isVisible]
  );

  const footerButtonClass = useMemo(
    () => `footer-button-${colorMode.toLowerCase()} align-left`,
    [colorMode]
  );

  const sectionBreakClass = useMemo(
    () => `section-break-${colorMode.toLowerCase()}`,
    [colorMode]
  );

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={loginFooterClass} aria-label="Public site footer">
      <div className="spacer-x-small" />

      <div className="social-container">
        <Container>
          {/* Main Navigation Section */}
          <Row className="login-footer-button-row align-items-center">
            {/* Logo */}
            <Col xs={12} sm={12} md={2} lg={2} className="mb-3 mb-md-0">
              <Row className="footer-row align-items-center">
                <Col className="footer-col-auto">
                  <Link to="/" aria-label="Go to home page">
                    <Lottie
                      className="footer-icon"
                      animationData={HamburgerMenu}
                      loop={false}
                      role="img"
                      aria-label="Ei logo"
                    />
                  </Link>
                </Col>
                <Col>
                  <h1 className="footer-icon-text" aria-label="Ei">Ei</h1>
                </Col>
              </Row>
            </Col>

            {/* Footer Links */}
            {FOOTER_LINKS.map((link) => (
              <Col 
                key={link.to}
                xs={12} 
                sm={12} 
                md={2} 
                lg={2} 
                className="mb-2 mb-md-0"
              >
                <Button 
                  as={Link} 
                  to={link.to} 
                  className={footerButtonClass} 
                  variant="link"
                  aria-label={`${link.title}: ${link.description}`}
                >
                  <div>
                    <h4 className="footer-h4-text">{link.title}</h4>
                    <p className="footer-p-text">{link.description}</p>
                  </div>
                </Button>
              </Col>
            ))}
          </Row>

          {/* Divider */}
          <div className={sectionBreakClass} role="separator" aria-hidden="true" />

          {/* Bottom Section: Language, Legal, Social */}
          <Row className="footer-social-row align-items-center gy-2">
            {/* Language Selector */}
            <Col xs={12} md={1}>
              <h4 className="footer-h4-text">Language</h4>
            </Col>

            <Col xs={12} md={2}>
              <Form>
                <Form.Select
                  name="language"
                  aria-label="Select a language"
                  data-testid="language-select"
                  onChange={onLanguageChangeHandler}
                  value={language}
                >
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <option 
                      key={opt.value} 
                      value={opt.value} 
                      data-uuid={`${opt.value}_language`}
                    >
                      {opt.label}
                    </option>
                  ))}
                </Form.Select>
              </Form>
            </Col>

            {/* Legal Links */}
            {LEGAL_LINKS.map((link) => (
              <Col key={link.to} xs={12} md={1}>
                <Link 
                  to={link.to} 
                  className="text-decoration-none"
                  aria-label={link.label}
                >
                  <p className={link.to === "/cookies" ? "footer-p-text-light" : "footer-p-text"}>
                    {link.label}
                  </p>
                </Link>
              </Col>
            ))}

            {/* Copyright */}
            <Col xs={12} md={2}>
              <p className="footer-p-text" aria-label={`Copyright ${currentYear} Ei`}>
                Copyright © {currentYear} Ei
              </p>
            </Col>

            {/* Social Icons */}
            {SOCIAL_LINKS.map((social) => (
              <Col 
                key={social.url}
                className="col-auto-width" 
                xs={6} 
                sm={6} 
                md={1}
              >
                <SocialIcon
                  className="social-icon"
                  url={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.label} page`}
                  fgColor="currentColor"
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </footer>
  );
};

LoginFooter.propTypes = {
  colorMode: PropTypes.oneOf(["Light", "Dark"])
};

LoginFooter.defaultProps = {
  colorMode: "Light"
};

export default React.memo(LoginFooter);