import React, { useMemo, lazy, Suspense } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingPage.scss";

const CustomerReviews = lazy(() => import("../../shared/ui/CustomerReviews"));

const LandingPage = ({ colorMode = "Light" }) => {
  const landingHeader1Class = useMemo(
    () =>
      colorMode === "Light"
        ? "landing-one-text-light landing-header-1"
        : "landing-one-text-dark landing-header-1",
    [colorMode]
  );

  const landingHeader1InlineClass = useMemo(
    () =>
      colorMode === "Light"
        ? "landing-one-text-light landing-header-1-inline"
        : "landing-one-text-dark landing-header-1-inline",
    [colorMode]
  );

  const landingHeader2Class = useMemo(
    () =>
      colorMode === "Light"
        ? "landing-one-text-light landing-header-2"
        : "landing-one-text-dark landing-header-2",
    [colorMode]
  );

  const signupBtnClass = useMemo(
    () => (colorMode === "Light" ? "btn-signup-light" : "btn-signup-dark"),
    [colorMode]
  );

  return (
    <main>
      <section className="landing-one" aria-labelledby="landing-heading">
        <Container className="landing-inner">
          <div className="spacer_medium" />
          <Row className="align-items-center">
            <Col xs={12} md={6} lg={6} className="landing-one-col">
              <h1 id="landing-heading" className={landingHeader1Class}>
                Inventory Control
              </h1>
              <h3 className={landingHeader1InlineClass}>Simplified</h3>

              <h2 className={landingHeader2Class}>
                Take the guesswork out of inventory control and management.
                Repetitive tasks like reorder setpoints, inventory costing, and
                just-in-time management are automatically calculated by our
                software so you can focus on running the business.
              </h2>

              <div className="landing-spacer" />

              <Button
                as={Link}
                to="/signup"
                variant="danger"
                className={signupBtnClass}
                aria-label="Sign up and start free trial"
              >
                Sign up — Start your free trial
              </Button>
            </Col>

            <Col xs={12} md={6} lg={6} className="landing-one-col">
              <div className="spacer_small" />
              <div className="video-wrapper" aria-hidden="false">
                <iframe
                  title="Electronics Inventory demo"
                  src="https://www.youtube.com/embed/lDAWaOmSFIQ?si=U6czkvzBlWsdcS6_"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </Col>
          </Row>

          <div className="spacer_small" />
        </Container>
      </section>

      <Suspense fallback={<div className="spinner">Loading reviews…</div>}>
        <CustomerReviews />
      </Suspense>
    </main>
  );
};

export default LandingPage;