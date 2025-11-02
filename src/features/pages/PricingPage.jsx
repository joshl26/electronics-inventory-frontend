import React, { useEffect, useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import arraySearch from '../../utils';
import features from '../../mock_data/features.json';
import './PricingPage.css';

function safeLocalStorageGet(key, fallback) {
  try {
    const v = window.localStorage.getItem(key);
    return v === null ? fallback : JSON.parse(v);
  } catch {
    return fallback;
  }
}
function safeLocalStorageSet(key, val) {
  try {
    window.localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // ignore
  }
}

function formatMoney(n) {
  return Number.isFinite(n)
    ? n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '0.00';
}

function Pricing({ initialColorMode = 'Light' }) {
  // feature list (searchable)
  const [population, setPopulation] = useState(features);

  // pricing numbers
  const standardCost = useMemo(() => 7.5, []);
  const premiumCost = useMemo(() => 13.5, []);
  const enterpriseBase = useMemo(() => 23.5, []);

  // users and total cost
  const [numberOfUsers, setNumberOfUsers] = useState(50);
  const [totalCost, setTotalCost] = useState(enterpriseBase);

  // color mode (read from localStorage if present)
  const [colorMode] = useState(() => safeLocalStorageGet('colorMode', initialColorMode));

  // search state + debounce
  const [searchTerm, setSearchTerm] = useState('');
  const searchTimer = useRef(null);

  // keep localStorage in sync if value changes externally
  useEffect(() => {
    safeLocalStorageSet('colorMode', colorMode);
  }, [colorMode]);

  // Debounced search: only run arraySearch when user stops typing for 300ms
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (!searchTerm || searchTerm.length <= 2) {
      // restore full list
      searchTimer.current = setTimeout(() => {
        setPopulation(features);
      }, 200);
      return () => clearTimeout(searchTimer.current);
    }

    searchTimer.current = setTimeout(async () => {
      try {
        const results = await arraySearch(features, searchTerm);
        setPopulation(results || []);
      } catch {
        setPopulation(features);
      }
    }, 300);

    return () => clearTimeout(searchTimer.current);
  }, [searchTerm]);

  // Pricing formula: simple heuristic that transitions to enterpriseBase for small numbers
  useEffect(() => {
    const n = Number(numberOfUsers) || 0;
    const clamped = Math.max(1, Math.min(5000, Math.floor(n)));
    if (clamped <= 250) {
      setTotalCost(enterpriseBase);
    } else {
      // example formula from original code, kept but sanitized
      const cost = 50.2 + -4.82 * Math.log(clamped);
      setTotalCost(Math.round((cost + Number.EPSILON) * 100) / 100);
    }
  }, [numberOfUsers, enterpriseBase]);

  const displayColormode = (base) => (colorMode === 'Light' ? `${base}-light` : `${base}-dark`);

  // handers
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleUsersInput = (e) => {
    const v = Number(e.target.value);
    if (Number.isNaN(v)) return;
    setNumberOfUsers(Math.max(1, Math.min(5000, Math.floor(v))));
  };

  const handleSliderChange = (e) => {
    const v = Number(e.target.value);
    setNumberOfUsers(Math.max(1, Math.min(5000, Math.floor(v))));
  };

  // accessible live text for screen readers showing the formatted price
  const formattedTotal = useMemo(() => formatMoney(totalCost), [totalCost]);

  return (
    <section className={displayColormode('pricing')} aria-labelledby="pricing-heading">
      <div className={displayColormode('header-transition')}>
        <div className="spacer" />
        <div className="spacer-small" />
        <Container>
          <h1 id="pricing-heading" className="pricing-h1-text">
            Electronics Inventory YOUR WAY.
          </h1>
          <h4 className="pricing-h4-text">
            Trusted by millions, Electronics Inventory powers teams all around the world. Explore
            which option is right for you.
          </h4>
        </Container>
      </div>

      <div className="spacer" />

      <Container>
        <Row className="pricing-table-row">
          {/* FREE */}
          <Col
            xs={11}
            sm={11}
            md={3}
            className="pricing-table-col-left"
            role="region"
            aria-label="Free plan"
          >
            <div className="pricing-table-top">
              <Row>
                <div className="spacer-x-small" />
                <h4 className="top-table-title">FREE</h4>
              </Row>
              <Row>
                <div className="spacer-x-small" />
                <div>
                  <h1 className="inline-text amount-text">$0</h1>
                  <div className="inline-text text-spacer" />
                  <h1 className="inline-text currency-text">CAD</h1>
                </div>
              </Row>
              <Row>
                <p className="pricing-p-text">Free for your whole team</p>
                <div className="spacer-x-small" />
              </Row>
              <Row>
                <h4 className="top-table-title">
                  For individuals or teams looking to organize any project.
                </h4>
              </Row>
              <div className="spacer-small" />
              <Row>
                <Button type="button" variant="primary" aria-label="Get started with free">
                  Get Started
                </Button>
              </Row>
            </div>

            <div>
              <div className="spacer-small" />
              <Row className="row-border-top">
                <h4 className="top-table-title">INCLUDED IN FREE:</h4>
              </Row>
              <div className="spacer-x-small" />
              <Row className="row-border-top align-left">
                <Col className="col-auto-width" xs={1}>
                  <FontAwesomeIcon icon={faCheck} className="pricing-check" />
                </Col>
                <Col xs={11}>
                  <p className="pricing-p-text">Unlimited cards</p>
                </Col>
              </Row>
              <Row className="row-border-top">
                <Col>
                  <a href="/pricing/free" className="pricing-p-text">
                    Learn More About Free
                  </a>
                </Col>
              </Row>
            </div>
          </Col>

          {/* STANDARD */}
          <Col
            xs={11}
            sm={11}
            md={3}
            className="pricing-table-col-left"
            role="region"
            aria-label="Standard plan"
          >
            <div className="pricing-table-top">
              <Row>
                <div className="spacer-x-small" />
                <h4 className="top-table-title">STANDARD</h4>
              </Row>
              <Row>
                <div className="spacer-x-small" />
                <div>
                  <h1 className="inline-text amount-text">${formatMoney(standardCost)}</h1>
                  <div className="inline-text text-spacer" />
                  <h1 className="inline-text currency-text">CAD</h1>
                </div>
              </Row>
              <Row>
                <p className="pricing-p-text">
                  Per user/month if billed annually <br /> (${Math.round(standardCost * 1.2)} billed
                  monthly)
                </p>
                <div className="spacer-x-small" />
              </Row>
              <Row>
                <h4 className="top-table-title">
                  For small teams that need to manage work and scale collaboration.
                </h4>
              </Row>
              <div className="spacer-small" />
              <Row>
                <Button type="button" aria-label="Sign up for standard">
                  Sign up now
                </Button>
              </Row>
            </div>

            <div className="spacer-small" />
            <Row className="row-border-top">
              <h4 className="top-table-title">EVERYTHING IN FREE, PLUS:</h4>
            </Row>
            <div className="spacer-x-small" />
            <Row className="row-border-top">
              <Col xs={1}>
                <FontAwesomeIcon icon={faCheck} className="pricing-check" />
              </Col>
              <Col xs={11}>
                <p className="pricing-p-text">Unlimited boards</p>
              </Col>
            </Row>
            <Row className="row-border-top">
              <Col>
                <a href="/pricing/standard" className="pricing-p-text">
                  Learn More About Standard
                </a>
              </Col>
            </Row>
          </Col>

          {/* PREMIUM */}
          <Col
            xs={11}
            sm={11}
            md={3}
            className="pricing-table-col-special"
            role="region"
            aria-label="Premium plan"
          >
            <div className="pricing-table-top">
              <Row>
                <div className="spacer-x-small" />
                <h4 className="top-table-title">PREMIUM</h4>
              </Row>
              <Row>
                <div className="spacer-x-small" />
                <div>
                  <h1 className="inline-text amount-text">${formatMoney(premiumCost)}</h1>
                  <div className="inline-text text-spacer" />
                  <h1 className="inline-text currency-text">CAD</h1>
                </div>
              </Row>
              <Row>
                <p className="pricing-p-text">
                  Per user/month if billed annually <br /> ($
                  {Math.round((premiumCost * 1.25 + Number.EPSILON) * 100) / 100} billed monthly)
                </p>
                <div className="spacer-x-small" />
              </Row>
              <Row>
                <h4 className="top-table-title">
                  For teams that need to track and visualize multiple projects.
                </h4>
              </Row>
              <div className="spacer-small" />
              <Row>
                <Button
                  type="button"
                  className="premium-btn"
                  variant="danger"
                  aria-label="Try premium for free"
                >
                  Try for free
                </Button>
              </Row>
            </div>

            <div className="spacer-small" />
            <Row className="row-border-top">
              <h4 className="top-table-title">EVERYTHING IN STANDARD, PLUS:</h4>
            </Row>
            <Row className="row-border-top">
              <Col xs={1}>
                <FontAwesomeIcon icon={faCheck} className="pricing-check" />
              </Col>
              <Col xs={11}>
                <p className="pricing-p-text">Calendar, Timeline, Table, Dashboard</p>
              </Col>
            </Row>
            <Row className="row-border-top">
              <Col>
                <a href="/pricing/premium" className="pricing-p-text">
                  Learn More About Premium
                </a>
              </Col>
            </Row>
          </Col>

          {/* ENTERPRISE */}
          <Col
            xs={11}
            sm={11}
            md={3}
            className="pricing-table-col-right"
            role="region"
            aria-label="Enterprise plan"
          >
            <div className="pricing-table-top">
              <Row>
                <div className="spacer-x-small" />
                <h4 className="top-table-title">ENTERPRISE</h4>
              </Row>
              <Row>
                <div className="spacer-x-small" />
                <div>
                  <h1 className="inline-text amount-text">${formatMoney(totalCost)}</h1>
                  <div className="inline-text text-spacer" />
                  <h1 className="inline-text currency-text">CAD</h1>
                </div>
              </Row>
              <Row>
                <p className="pricing-p-text">
                  Per user/month - billed annually <br /> (${formatMoney(totalCost * 12)} annual
                  price per user)
                </p>
                <div className="spacer-x-small" />
              </Row>
              <Row>
                <h4 className="top-table-title">
                  For organizations that need to connect work across teams with more security and
                  controls.
                </h4>
              </Row>

              <Row>
                <p className="pricing-p-text">
                  Estimated cost for{' '}
                  <input
                    className={displayColormode('input-users')}
                    min="50"
                    max="5000"
                    onChange={handleUsersInput}
                    value={numberOfUsers}
                    aria-label="Number of users"
                    inputMode="numeric"
                    type="number"
                  />{' '}
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
                    onChange={handleSliderChange}
                    aria-label="Users slider"
                  />
                </Container>
              </Row>

              <Row>
                {numberOfUsers >= 5000 ? (
                  <p className="pricing-p-text">
                    For organizations with 5,000+ users, please contact sales for pricing
                  </p>
                ) : (
                  <p aria-hidden className="pricing-p-text">
                    &nbsp;
                  </p>
                )}
              </Row>

              <Row>
                <Button type="button" aria-label="Contact sales">
                  Contact Sales
                </Button>
              </Row>
            </div>

            <div className="spacer-small" />
            <Row className="row-border-top">
              <h4 className="top-table-title">EVERYTHING IN PREMIUM, PLUS:</h4>
            </Row>

            <Row className="row-border-top">
              <Col xs={1}>
                <FontAwesomeIcon icon={faCheck} className="pricing-check" />
              </Col>
              <Col xs={11}>
                <p className="pricing-p-text">Unlimited Workspaces</p>
              </Col>
            </Row>

            <Row className="row-border-top">
              <Col>
                <a href="/pricing/enterprise" className="pricing-p-text">
                  Learn More About Enterprise
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <div className="spacer-small" />

      <Row>
        <Col className="col-align-center">
          <h2 className="pricing-h2-text">Compare our Plans</h2>
          <div className="spacer-x-small" />
          <input
            className="search-input"
            type="text"
            name="search"
            id="search"
            placeholder="Search features"
            onChange={handleSearchChange}
            aria-label="Search features"
            value={searchTerm}
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

        {/* feature rows */}
        {population.map((feature) => (
          <Row key={feature.col1} className="pricing-table-row" role="row">
            <Col md={6} className="pricing-table-col" role="cell">
              <p className="table-p-bold">{feature.col1}</p>
              {feature.col2 && <p className="table-p">{feature.col2}</p>}
              {feature.link ? (
                <Row>
                  <Col>
                    <span className="table-p">{feature.link}</span>
                  </Col>
                </Row>
              ) : null}
            </Col>

            <Col className="pricing-table-col align-center" role="cell">
              {feature.col3 === '✓' ? (
                <FontAwesomeIcon icon={faCheck} className="pricing-check-table" />
              ) : null}
            </Col>

            <Col className="pricing-table-col align-center" role="cell">
              {feature.col4 === '✓' ? (
                <FontAwesomeIcon icon={faCheck} className="pricing-check-table" />
              ) : null}
            </Col>

            <Col className="pricing-table-col align-center align-vertical" role="cell">
              {feature.col5 === '✓' ? (
                <FontAwesomeIcon icon={faCheck} className="pricing-check-table" />
              ) : null}
            </Col>

            <Col className="pricing-table-col align-center" role="cell">
              {feature.col6 === '✓' ? (
                <FontAwesomeIcon icon={faCheck} className="pricing-check-table" />
              ) : null}
            </Col>
          </Row>
        ))}
      </Container>

      {/* visual live region for screen readers */}
      <div className="visually-hidden" aria-live="polite">
        Estimated enterprise cost per user: ${formattedTotal} CAD
      </div>

      <div className={displayColormode('footer-transition')}>
        <div className="spacer" />
        <div className="spacer-x-small" />
      </div>
    </section>
  );
}

Pricing.propTypes = {
  initialColorMode: PropTypes.oneOf(['Light', 'Dark']),
};

Pricing.defaultProps = {
  initialColorMode: 'Light',
};

export default Pricing;
