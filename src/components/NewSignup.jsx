/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import './NewSignup.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

function NewSignup({ colorMode }) {
  const signupSectionStlye = colorMode === 'Light' ? 'signup-section-light' : 'signup-section-dark';

  const onEmailChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className={signupSectionStlye}>
      <div className="signup-spacer" />
      <Container>
        <Col>
          <Row>
            <h1 className="align-center">Haven&apos;t tried Electronics Inventory before?</h1>
          </Row>
          <Row>
            <h4 className="align-center">
              Signup for free and join over 2M teams worldwide who <br /> are using Electronics
              Inventory to get more done.
            </h4>
          </Row>
          <Row>
            <div className="spacer-small" />
          </Row>
          <Row>
            <Col xs={0} sm={2} md={4} />
            <Col className="text-center" xs={12} sm={3} md={3}>
              <input
                autoComplete="true"
                name="email"
                className="email-input"
                type="email"
                placeholder="Email"
                onChange={onEmailChange}
              />
            </Col>
            <Col className="signup-btn" xs={12} sm={3} md={3}>
              <Button variant="danger">Sign Up</Button>
            </Col>
            <Col xs={0} sm={3} md={2} />
          </Row>
        </Col>
        <div className="signup-spacer" />
        <div className="signup-spacer" />
      </Container>
    </div>
  );
}

NewSignup.propTypes = {
  // prefer limiting to expected values; adjust if you use different strings
  colorMode: PropTypes.oneOf(['Light', 'Dark']),
};

NewSignup.defaultProps = {
  colorMode: 'Light',
};

export default NewSignup;
