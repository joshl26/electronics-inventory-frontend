import PropTypes from 'prop-types';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import './LandingPage.scss';

import CustomerReviews from '../../components/CustomerReviews';

function LandingPage({ colorMode }) {
  const landingHeader1Style =
    colorMode === 'Light'
      ? 'landing-one-text-light landing-header-1'
      : 'landing-one-text-dark landing-header-1 light';

  const landingHeader1InlineStyle =
    colorMode === 'Light'
      ? 'landing-one-text-light landing-header-1-inline'
      : 'landing-one-text-dark landing-header-1-inline';

  const landingHeader2Style =
    colorMode === 'Light'
      ? 'landing-one-text-light landing-header-2'
      : 'landing-one-text-dark landing-header-2';

  const landingOneImageStyle =
    colorMode === 'Light' ? 'landing-one-image-light' : 'landing-one-image-dark';

  const SignupButtonStyle = colorMode === 'Light' ? 'btn-signup-light' : 'btn-signup-dark';

  return (
    <div>
      <div className="background-image" />
      <div className="landing-one">
        <Container>
          <div className="spacer_medium" />
          <Row>
            <Col className="landing_one_row" xs={12} md={6} lg={6}>
              <h1 data-testid="app-title" className={landingHeader1Style}>
                Inventory Control
              </h1>
              <h3 className={landingHeader1InlineStyle}>Simplified</h3>
              <h2 className={landingHeader2Style}>
                Take the guesswork out of inventory control and management. Repetitive tasks like
                repurchase set points, inventory costing, JIT management are automatically
                calculated by our software.
              </h2>
              <div className="landing-spacer" />
              <Button
                type="button"
                variant="danger"
                className={SignupButtonStyle}
                aria-label="Sign up"
              >
                Sign Up Now and Start your Free Trial!
              </Button>
            </Col>
            <Col className="landing_one_row" xs={12} md={6} lg={6}>
              <div className="spacer_small" />
              <div>
                <Image
                  className={landingOneImageStyle}
                  src="https://res.cloudinary.com/dv6keahg3/image/upload/v1689524251/ElectronicsInventory/frontend_ui_images/ei_1_pxgvpd.png"
                  alt="Inventory control illustration"
                />
              </div>
            </Col>
          </Row>
          <div className="spacer_small" />
        </Container>
      </div>
      <CustomerReviews />
    </div>
  );
}

LandingPage.propTypes = {
  colorMode: PropTypes.string,
};

LandingPage.defaultProps = {
  colorMode: 'Light',
};

export default LandingPage;
