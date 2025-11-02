import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SignupPage.css';
import { Container, Row, Col, Button, Form, InputGroup, Spinner } from 'react-bootstrap';

function SignupPage({ colorMode, onSignup }) {
  const isLight = colorMode === 'Light';
  const signupSectionStyle = isLight ? 'signup-section-light' : 'signup-section-dark';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const validateEmail = (value) =>
    // simple, permissive email check
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (status.error) setStatus((s) => ({ ...s, error: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, error: '', success: '' });

    if (!email.trim()) {
      setStatus({ loading: false, error: 'Please enter your email address.', success: '' });
      return;
    }

    if (!validateEmail(email.trim())) {
      setStatus({ loading: false, error: 'Please enter a valid email address.', success: '' });
      return;
    }

    // start "signup"
    setStatus({ loading: true, error: '', success: '' });

    try {
      // If the consumer passed a real onSignup handler, call it and await response
      if (typeof onSignup === 'function') {
        await onSignup(email.trim());
      } else {
        // No-op simulated async request (replace with real API call)
        await new Promise((resolve) => {
          setTimeout(resolve, 700);
        });
      }

      setStatus({ loading: false, error: '', success: 'Signup successful — check your inbox!' });
      setEmail('');
    } catch (err) {
      setStatus({
        loading: false,
        error: err?.message || 'Something went wrong — please try again.',
        success: '',
      });
    }
  };

  return (
    <section className={signupSectionStyle} aria-labelledby="signup-heading">
      <Container>
        <div className="signup-spacer" />
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <h1 id="signup-heading" className="signup-title text-center">
              Haven&apos;t tried Electronics Inventory before?
            </h1>

            <p className="signup-subtitle text-center">
              Sign up for free and join over 2M teams worldwide who are using Electronics Inventory
              to get more done.
            </p>

            <Form onSubmit={handleSubmit} className="signup-form" noValidate>
              <Row className="align-items-center gx-2">
                <Col xs={12} md={7} className="mb-2 mb-md-0">
                  <InputGroup>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Email"
                      aria-label="Email"
                      autoComplete="email"
                      required
                      className="email-input"
                    />
                  </InputGroup>
                </Col>

                <Col xs={12} md={5} className="text-md-start text-center">
                  <Button
                    type="submit"
                    variant="danger"
                    className="signup-button"
                    disabled={status.loading}
                    aria-disabled={status.loading}
                  >
                    {status.loading ? (
                      <>
                        <Spinner animation="border" size="sm" role="status" aria-hidden="true" />{' '}
                        Signing up...
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <div
                    className="signup-messages"
                    aria-live="polite"
                    aria-atomic="true"
                    role="status"
                  >
                    {status.error && <p className="signup-error">{status.error}</p>}
                    {status.success && <p className="signup-success">{status.success}</p>}
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        <div className="signup-spacer" />
      </Container>
    </section>
  );
}

SignupPage.propTypes = {
  colorMode: PropTypes.oneOf(['Light', 'Dark']),
  // optional callback for performing signup; should return a Promise if async
  onSignup: PropTypes.func,
};

SignupPage.defaultProps = {
  colorMode: 'Light',
  onSignup: undefined,
};

export default SignupPage;
