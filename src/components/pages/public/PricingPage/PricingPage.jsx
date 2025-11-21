import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import features from "data/features.json";
import { arraySearch } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./PricingPage.scss";

const PricingPage = () => {
  const [population, setPopulation] = useState(features);
  const [enterpriseCost] = useState(23.5);
  const [totalCost, setTotalCost] = useState(23.5);
  const [standardCost] = useState(7.5);
  const [premiumCost] = useState(13.5);
  const [numberOfUsers, setNumberOfUsers] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce search input to avoid excessive calls
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchTerm.length > 2) {
        const search = await arraySearch(features, searchTerm);
        setPopulation(search);
      } else {
        setPopulation(features);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    let value = Number(e.target.value);
    if (isNaN(value)) return;
    value = Math.min(Math.max(value, 50), 5000);
    setNumberOfUsers(value);

    if (value > 250) {
      const cost =
        Math.round((50.2 + -4.82 * Math.log(value) + Number.EPSILON) * 100) /
        100;
      setTotalCost(cost);
    } else {
      setTotalCost(enterpriseCost);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <section>
        <div className="spacer" />
        <div className="spacer-small" />
        <Container>
          <h1 className="pricing-h1-text">Electronics Inventory YOUR WAY.</h1>
          <h4 className="pricing-h4-text">
            Trusted by millions, Electronics Inventory powers teams all around
            the world. Explore which option is right for you.
          </h4>
        </Container>
        <div className="spacer" />
        <Container>
          <Row className="pricing-table-row">
            <Col xs={11} sm={11} md={3} className="pricing-table-col-left">
              <div className="pricing-table-top">
                <Row>
                  <div className="spacer-x-small"></div>
                  <h4 className="top-table-title">FREE</h4>
                </Row>
                <Row>
                  <div className="spacer-x-small"></div>
                  <div>
                    <h1 className="inline-text amount-text">$0</h1>
                    <div className="inline-text text-spacer" />
                    <h1 className="inline-text currency-text">CAD</h1>
                  </div>
                </Row>
                <Row>
                  <p className="pricing-p-text">Free for your whole team</p>
                  <div className="spacer-x-small"></div>
                </Row>
                <Row>
                  <h4 className="top-table-title">
                    For individuals or teams looking to organize any project.
                  </h4>
                </Row>
                <div className="spacer-small"></div>
                <Row>
                  <div>
                    <Button>Get Started</Button>
                  </div>
                </Row>
              </div>
              <div>
                <div className="spacer-small"></div>
                <Row className="row-border-top">
                  <h4 className="top-table-title">INCLUDED IN FREE:</h4>
                </Row>
                <div className="spacer-x-small"></div>
                <Row className="row-border-top align-left">
                  <Col xs={1} sm={1} md={1} lg={1}>
                    <FontAwesomeIcon icon={faCheck} className="pricing-check" />
                  </Col>
                  <Col xs={11} sm={11} md={11} lg={11}>
                    <p className="pricing-p-text">Unlimited cards</p>
                  </Col>
                </Row>
                {/* Additional FREE features rows here */}
                {/* ... */}
              </div>
            </Col>

            <Col xs={11} sm={11} md={3} className="pricing-table-col-left">
              <div className="pricing-table-top">
                <Row>
                  <div className="spacer-x-small"></div>
                  <h4 className="top-table-title">STANDARD</h4>
                </Row>
                <Row>
                  <div className="spacer-x-small"></div>
                  <div>
                    <h1 className="inline-text amount-text">${standardCost}</h1>
                    <div className="inline-text text-spacer" />
                    <h1 className="inline-text currency-text">CAD</h1>
                  </div>
                </Row>
                <Row>
                  <p className="pricing-p-text">
                    Per user/month if billed annually <br /> ($
                    {standardCost * 1.2} billed monthly)
                  </p>
                  <div className="spacer-x-small"></div>
                </Row>
                <Row>
                  <h4 className="top-table-title">
                    For small teams that need to manage work and scale
                    collaboration.
                  </h4>
                </Row>
                <div className="spacer-small"></div>
                <Row>
                  <div>
                    <Button>Sign up now</Button>
                  </div>
                </Row>
              </div>
              <div className="spacer-small"></div>
              <Row className="row-border-top">
                <h4 className="top-table-title">EVERYTHING IN FREE, PLUS:</h4>
              </Row>
              <div className="spacer-x-small"></div>
              <Row className="row-border-top">
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FontAwesomeIcon icon={faCheck} className="pricing-check" />
                </Col>
                <Col xs={11} sm={11} md={11} lg={11}>
                  <p className="pricing-p-text">Unlimited boards</p>
                </Col>
              </Row>
              {/* Additional STANDARD features rows here */}
              {/* ... */}
            </Col>

            <Col xs={11} sm={11} md={3} className="pricing-table-col-special">
              <div className="pricing-table-top">
                <Row>
                  <div className="spacer-x-small"></div>
                  <h4 className="top-table-title">PREMIUM</h4>
                </Row>
                <Row>
                  <div className="spacer-x-small"></div>
                  <div>
                    <h1 className="inline-text amount-text">${premiumCost}</h1>
                    <div className="inline-text text-spacer" />
                    <h1 className="inline-text currency-text">CAD</h1>
                  </div>
                </Row>
                <Row>
                  <p className="pricing-p-text">
                    Per user/month if billed annually <br /> ($
                    {Math.round((premiumCost * 1.25 + Number.EPSILON) * 100) /
                      100}{" "}
                    billed monthly)
                  </p>
                  <div className="spacer-x-small"></div>
                </Row>
                <Row>
                  <h4 className="top-table-title">
                    For teams that need to track and visualize multiple projects
                    in several ways, including boards, timelines, calendars,
                    etc.
                  </h4>
                </Row>
                <div className="spacer-small"></div>
                <Row>
                  <div>
                    <Button className="premium-btn" variant="danger">
                      Try for free
                    </Button>
                  </div>
                </Row>
              </div>
              <div className="spacer-small"></div>
              <Row className="row-border-top">
                <h4 className="top-table-title">
                  EVERYTHING IN STANDARD, PLUS:
                </h4>
              </Row>
              <div className="spacer-x-small"></div>
              <Row className="row-border-top">
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FontAwesomeIcon icon={faCheck} className="pricing-check" />
                </Col>
                <Col xs={11} sm={11} md={11} lg={11}>
                  <p className="pricing-p-text">
                    Calendar, Timeline, Table, Dashboard
                  </p>
                </Col>
              </Row>
              {/* Additional PREMIUM features rows here */}
              {/* ... */}
            </Col>

            <Col xs={11} sm={11} md={3} className="pricing-table-col-right">
              <div className="pricing-table-top">
                <Row>
                  <div className="spacer-x-small"></div>
                  <h4 className="top-table-title">ENTERPRISE</h4>
                </Row>
                <Row>
                  <div className="spacer-x-small"></div>
                  <div>
                    <h1 className="inline-text amount-text">${totalCost}</h1>
                    <div className="inline-text text-spacer" />
                    <h1 className="inline-text currency-text">CAD</h1>
                  </div>
                </Row>
                <Row>
                  <p className="pricing-p-text">
                    Per user/month - billed annually <br /> ($
                    {Math.round((totalCost * 12 + Number.EPSILON) * 100) / 100}{" "}
                    annual price per user)
                  </p>
                  <div className="spacer-x-small"></div>
                </Row>
                <Row>
                  <h4 className="top-table-title">
                    For organizations that need to connect work across teams
                    with more security and controls.
                  </h4>
                </Row>
                <Row>
                  <p className="pricing-p-text">
                    Estimated cost for{" "}
                    <input
                      type="number"
                      min="50"
                      max="5000"
                      aria-label="Number of users"
                      value={numberOfUsers}
                      onChange={handleInputChange}
                      className="input-users-light"
                    />{" "}
                    users
                  </p>
                </Row>
                <Row>
                  <Container>
                    <input
                      className="input-slider"
                      min="50"
                      max="5000"
                      type="range"
                      value={numberOfUsers}
                      onChange={handleInputChange}
                      aria-label="Number of users slider"
                    />
                  </Container>
                </Row>
                {numberOfUsers >= 4999 && (
                  <Row>
                    <p>
                      For organizations with more than 5,000 users, please
                      contact sales for pricing.
                    </p>
                  </Row>
                )}
                <Row>
                  <div>
                    <Button>Contact Sales</Button>
                  </div>
                </Row>
              </div>
              <div className="spacer-small"></div>
              <Row className="row-border-top">
                <h4 className="top-table-title">
                  EVERYTHING IN PREMIUM, PLUS:
                </h4>
              </Row>
              <div className="spacer-x-small"></div>
              <Row className="row-border-top">
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FontAwesomeIcon icon={faCheck} className="pricing-check" />
                </Col>
                <Col xs={11} sm={11} md={11} lg={11}>
                  <p>Unlimited Workspaces</p>
                </Col>
              </Row>
              {/* Additional ENTERPRISE features rows here */}
              {/* ... */}
            </Col>
          </Row>
        </Container>

        <div className="spacer-small" />
        <Row>
          <Col className="col-align-center">
            <h1 className="pricing-h2-text">Compare our Plans</h1>
            <div className="spacer-x-small" />
            <input
              className="search-input"
              type="search"
              name="search"
              id="search"
              placeholder="Search Filter"
              aria-label="Search features"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
        </Row>
        <div className="spacer-small" />
        <Container>
          <Row className="table-top-row">
            <Col md={6}>
              <p className="table-p-bold">FEATURES</p>
            </Col>
            <Col className="align-center">
              <p className="table-p-bold">FREE</p>
            </Col>
            <Col className="align-center">
              <p className="table-p-bold">STANDARD</p>
            </Col>
            <Col className="align-center">
              <p className="table-p-bold">PREMIUM</p>
            </Col>
            <Col className="align-center">
              <p className="table-p-bold">ENTERPRISE</p>
            </Col>
          </Row>
          {population.map((feature, idx) => (
            <Row key={idx} className="pricing-table-row">
              <Col md={6} className="pricing-table-col">
                <p className="table-p-bold">{feature.col1}</p>
                {feature.col2 && <p className="table-p">{feature.col2}</p>}
                {feature.link && (
                  <Row>
                    <Link to={feature.linkUrl || "#"}>
                      <p className="table-p">{feature.link}</p>
                    </Link>
                  </Row>
                )}
              </Col>
              <Col className="pricing-table-col align-center">
                {feature.col3 === "✓" && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="pricing-check-table"
                  />
                )}
              </Col>
              <Col className="pricing-table-col align-center">
                {feature.col4 === "✓" && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="pricing-check-table"
                  />
                )}
              </Col>
              <Col className="pricing-table-col align-center align-vertical">
                {feature.col5 === "✓" && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="pricing-check-table"
                  />
                )}
              </Col>
              <Col className="pricing-table-col align-center">
                {feature.col6 === "✓" && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="pricing-check-table"
                  />
                )}
              </Col>
            </Row>
          ))}
        </Container>

        <div className="spacer" />
        <div className="spacer-x-small" />
      </section>
    </>
  );
};

export default PricingPage;
