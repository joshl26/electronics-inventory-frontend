import React from "react";
import "./SignupPage.scss";
import { Container, Row, Col, Button } from "react-bootstrap";
import { generateBreadcrumbs, seoData } from "data/seoData";
import SEO from "components/common/SEO/SEO";

const SignupPage = ({ colorMode }) => {
  const breadcrumbs = generateBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Sign Up", path: "/signup" },
  ]);

  const combinedStructuredData = [seoData.signup.structuredData, breadcrumbs];

  const signupSectionStlye =
    colorMode === "Light" ? "signup-section-light" : "signup-section-dark";

  const onEmailChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <main className={signupSectionStlye}>
      <SEO
        title={seoData.signup.title}
        description={seoData.signup.description}
        keywords={seoData.signup.keywords}
        structuredData={combinedStructuredData}
        canonicalUrl={`${window.location.origin}/signup`}
      />
      <div className="signup-spacer"></div>
      <Container>
        <Col>
          <Row>
            <h1 className="align-center">
              Havent tried Electronics Inventory before?
            </h1>
          </Row>
          <Row>
            <h4 className="align-center">
              Signup for free and join over 2M teams worldwide who <br /> are
              using Electronics Inventory to get more done.
            </h4>
          </Row>
          <Row>
            <div className="spacer-small"></div>
          </Row>
          <Row>
            <Col xs={0} sm={2} md={4}></Col>
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
            <Col xs={0} sm={3} md={2}></Col>
          </Row>
        </Col>
        <div className="signup-spacer"></div>
        <div className="signup-spacer"></div>
      </Container>
    </main>
  );
};

export default SignupPage;
