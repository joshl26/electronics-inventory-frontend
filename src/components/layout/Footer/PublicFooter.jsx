import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { SocialIcon } from "react-social-icons";
import "./PublicFooter.scss";

import HamburgerMenu from "svg/HamburgerMenu.json";

const FOOTER_LINKS = [
  { to: "/about", title: "About", description: "Learn more about Ei." },
  {
    to: "/privacy-policy",
    title: "Privacy",
    description: "Privacy practices and policies of Ei.",
  },
  {
    to: "/terms-of-service",
    title: "Terms",
    description: "Terms and conditions for using Ei.",
  },
  {
    to: "/contact",
    title: "Contact Us",
    description: "Get in touch with the Ei team.",
  },
];

const SOCIAL_LINKS = [
  { url: "https://www.linkedin.com/company/90619779/", label: "LinkedIn" },
  { url: "https://facebook.com/", label: "Facebook" },
  { url: "https://github.com/", label: "GitHub" },
  { url: "https://google.com/", label: "Google" },
];

const PublicFooter = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`login-footer ${isVisible ? "footer-visible" : ""}`}
      role="contentinfo"
      aria-label="Public site footer"
    >
      <div className="spacer-x-small" />

      <div className="social-container">
        <Container>
          <Row className="login-footer-button-row align-items-center">
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
                  <h1 className="footer-icon-text" aria-label="Ei">
                    Ei
                  </h1>
                </Col>
              </Row>
            </Col>

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
                  className="footer-button"
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

          <div className="section-break" role="separator" aria-hidden="true" />

          <Row className="footer-social-row align-items-center gy-2">
            <Col xs={12} md={2}>
              <p
                className="footer-p-text"
                aria-label={`Copyright ${currentYear} Ei`}
              >
                Copyright © {currentYear} Ei
              </p>
            </Col>

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

export default React.memo(PublicFooter);
