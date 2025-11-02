/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import './LandingSection.css';
import CustomerReviews from './CustomerReviews';

function LandingPage({ colorMode }) {
  const isLight = colorMode === 'Light';
  const landingHeader1Style = isLight ? 'landing-one-text-light' : 'landing-one-text-dark';
  const landingHeader2Style = landingHeader1Style;
  const landingOneImageStyle = isLight ? 'landing-one-image-light' : 'landing-one-image-dark';
  const signupButtonStyle = isLight ? 'btn-signup-light' : 'btn-signup-dark';

  const handleSignupClick = () => {
    // Replace with real navigation or modal trigger
    alert('Sign up clicked! Redirecting to signup page...');
    // Example: window.location.href = '/signup';
  };

  return (
    <div className="landing-page-wrapper pt-5">
      <div className="landing-one pt-5">
        <Container className="landing-container pt-5">
          <div className="spacer_medium" />
          <Row className="align-items-center g-4">
            <Col xs={12} md={6} className="landing-content-col">
              <header className="landing-header-group">
                <h1 className={`landing-header-1 ${landingHeader1Style}`}>Inventory Control</h1>
                <h2 className={`landing-header-1-inline ${landingHeader1Style}`}>Simplified</h2>
                <p className={`landing-header-2 ${landingHeader2Style}`}>
                  Take the guesswork out of inventory control and management. Repetitive tasks like
                  repurchase set points, inventory costing, JIT management are automatically
                  calculated by our software.
                </p>
              </header>
              <div className="landing-spacer" />
              <Button
                onClick={handleSignupClick}
                variant="danger"
                className={`landing-signup-btn ${signupButtonStyle}`}
                aria-label="Sign up for a free trial"
              >
                Sign Up Now and Start your Free Trial!
              </Button>
            </Col>
            <Col xs={12} md={6} className="landing-image-col">
              <figure className="landing-figure">
                <Image
                  className={`landing-hero-image ${landingOneImageStyle}`}
                  src="https://res.cloudinary.com/dv6keahg3/image/upload/v1689524251/ElectronicsInventory/frontend_ui_images/ei_1_pxgvpd.png"
                  alt="Inventory control illustration"
                  loading="lazy"
                  fluid
                />
              </figure>
            </Col>
          </Row>
          <div className="spacer_medium" />
        </Container>
      </div>
      <CustomerReviews />
    </div>
  );
}

LandingPage.propTypes = {
  colorMode: PropTypes.oneOf(['Light', 'Dark']),
};

LandingPage.defaultProps = {
  colorMode: 'Light',
};

export default LandingPage;
