import PropTypes from 'prop-types';
import './LoginFooter.css';
import { SocialIcon } from 'react-social-icons';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';
import HamburgerMenu from '../../svg/HamburgerMenu.json';

function LoginFooter({ colorMode }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const stored = localStorage.getItem('language');
    try {
      const parsed = stored ? JSON.parse(stored) : null;
      if (parsed === null) {
        localStorage.setItem('language', JSON.stringify('en'));
        setLanguage('en');
      } else {
        setLanguage(parsed);
      }
    } catch {
      // if parse fails, reset to 'en'
      localStorage.setItem('language', JSON.stringify('en'));
      setLanguage('en');
    }
  }, [colorMode]);

  const onLanguageChangeHandler = (e) => {
    const languageChange = e.target.value;
    setLanguage(languageChange);
    localStorage.setItem('language', JSON.stringify(languageChange));
  };

  const LoginFooterStyle = colorMode === 'Light' ? 'login-footer-light' : 'login-footer-dark';
  const footerButtonStyle =
    colorMode === 'Light' ? 'footer-button-light align-left' : 'footer-button-dark align-left';
  const sectionBreakStyle = colorMode === 'Light' ? 'section-break-light' : 'section-break-dark';

  return (
    <div className={LoginFooterStyle}>
      <div className="spacer-x-small" />
      <div className="social-container">
        <Container>
          <Row className="login-footer-button-row">
            <Col xs={12} sm={12} md={2} lg={2}>
              <Row className="footer-row">
                <Col className="footer-col">
                  <a href="/" aria-label="Home">
                    <Lottie className="footer-icon" animationData={HamburgerMenu} loop={false} />
                  </a>
                </Col>
                <Col>
                  <h1 className="footer-icon-text">Ei</h1>
                </Col>
              </Row>
            </Col>

            <Col xs={12} sm={12} md={2} lg={2}>
              <Button href="/about" className={footerButtonStyle}>
                <Row>
                  <h4 className="footer-h4-text">About</h4>
                </Row>
                <Row>
                  <p className="footer-p-text">What&apos;s behind the boards.</p>
                </Row>
              </Button>
            </Col>

            <Col xs={12} sm={12} md={2} lg={2}>
              <Button className={footerButtonStyle} href="/jobs">
                <Row>
                  <h4 className="footer-h4-text">Jobs</h4>
                </Row>
                <Row>
                  <p className="footer-p-text">Learn about open roles on the Ei team.</p>
                </Row>
              </Button>
            </Col>

            <Col xs={12} sm={12} md={2} lg={2}>
              <Button className={footerButtonStyle} href="/apps">
                <Row>
                  <h4 className="footer-h4-text">Apps</h4>
                </Row>
                <Row>
                  <p className="footer-p-text">
                    Download the Ei app for your Desktop or Mobile devices.
                  </p>
                </Row>
              </Button>
            </Col>

            <Col xs={12} sm={12} md={2} lg={2}>
              <Button className={footerButtonStyle} href="/contact">
                <Row>
                  <h4 className="footer-h4-text">Contact Us</h4>
                </Row>
                <Row>
                  <p className="footer-p-text">Get in touch with the Ei team.</p>
                </Row>
              </Button>
            </Col>
          </Row>

          <div className={sectionBreakStyle} />

          <Row className="footer-social-row">
            <Col xs={12} md={1}>
              <h4 className="footer-h4-text">Language</h4>
            </Col>

            <Col xs={12} md={2}>
              <form className="footer-p-text" onSubmit={(e) => e.preventDefault()}>
                <label className="sr-only" htmlFor="language-select">
                  Select language{' '}
                  <select
                    id="language-select"
                    name="language"
                    aria-label="Select a language"
                    data-testid="language-select"
                    onChange={onLanguageChangeHandler}
                    value={language}
                  >
                    <option value="en" data-uuid="en_language">
                      English
                    </option>
                    <option value="cs" data-uuid="cs_language">
                      Čeština
                    </option>
                    <option value="de" data-uuid="de_language">
                      Deutsch
                    </option>
                    <option value="es" data-uuid="es_language">
                      Español
                    </option>
                    <option value="fr" data-uuid="fr_language">
                      Français
                    </option>
                    <option value="it" data-uuid="it_language">
                      Italiano
                    </option>
                    <option value="hu" data-uuid="hu_language">
                      Magyar
                    </option>
                    <option value="nl" data-uuid="nl_language">
                      Nederlands
                    </option>
                    <option value="nb" data-uuid="nb_language">
                      Norsk (bokmål)
                    </option>
                    <option value="pl" data-uuid="pl_language">
                      Polski
                    </option>
                    <option value="pt-BR" data-uuid="pt-BR_language">
                      Português (Brasil)
                    </option>
                    <option value="fi" data-uuid="fi_language">
                      Suomi
                    </option>
                    <option value="sv" data-uuid="sv_language">
                      Svenska
                    </option>
                    <option value="vi" data-uuid="vi_language">
                      Tiếng Việt
                    </option>
                    <option value="tr" data-uuid="tr_language">
                      Türkçe
                    </option>
                    <option value="ru" data-uuid="ru_language">
                      Русский
                    </option>
                    <option value="uk" data-uuid="uk_language">
                      Українська
                    </option>
                    <option value="th" data-uuid="th_language">
                      ภาษาไทย
                    </option>
                    <option value="zh-Hans" data-uuid="zh-Hans_language">
                      中文 (简体)
                    </option>
                    <option value="zh-Hant" data-uuid="zh-Hant_language">
                      中文 (繁體)
                    </option>
                    <option value="ja" data-uuid="ja_language">
                      日本語
                    </option>
                  </select>
                </label>
              </form>
            </Col>

            <Col xs={12} md={1}>
              <a href="/privacy" className="footer-p-text">
                <p className="footer-p-text">Privacy Policy</p>
              </a>
            </Col>

            <Col xs={12} md={1}>
              <a href="/terms" className="footer-p-text">
                <p className="footer-p-text">Terms</p>
              </a>
            </Col>

            <Col xs={12} md={1}>
              <a href="/cookies" className="footer-p-text-light">
                <p className="footer-p-text-light">Cookie Settings</p>
              </a>
            </Col>

            <Col xs={12} md={2}>
              <p className="footer-p-text">Copyright © 2023 BlackRock Design Haus</p>
            </Col>

            <Col className="col-auto-width" xs={12} sm={6} md={1}>
              <SocialIcon
                className="social-icon"
                url="https://www.linkedin.com/company/90619779/"
                target="_blank"
                rel="noopener noreferrer"
              />
            </Col>

            <Col className="col-auto-width" xs={6} sm={6} md={1}>
              <SocialIcon
                className="social-icon"
                url="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              />
            </Col>

            <Col className="col-auto-width" xs={6} sm={6} md={1}>
              <SocialIcon
                className="social-icon"
                url="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
              />
            </Col>

            <Col className="col-auto-width" xs={6} sm={6} md={1}>
              <SocialIcon
                className="social-icon"
                url="https://google.com/"
                target="_blank"
                rel="noopener noreferrer"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

LoginFooter.propTypes = {
  colorMode: PropTypes.string,
};

LoginFooter.defaultProps = {
  colorMode: 'Light',
};

export default LoginFooter;
