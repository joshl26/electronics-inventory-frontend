import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './CustomerGallery.css';

const LOGOS = [
  {
    src: 'https://res.cloudinary.com/dv6keahg3/image/upload/v1689541687/ElectronicsInventory/frontend_ui_images/Burton_tggtot.svg',
    alt: 'Burton logo',
  },
  {
    src: 'https://res.cloudinary.com/dv6keahg3/image/upload/v1689541687/ElectronicsInventory/frontend_ui_images/Apple_c7d7om.svg',
    alt: 'Apple logo',
  },
  {
    src: 'https://res.cloudinary.com/dv6keahg3/image/upload/v1689541687/ElectronicsInventory/frontend_ui_images/ATI_byzzxj.svg',
    alt: 'ATI logo',
  },
  {
    src: 'https://res.cloudinary.com/dv6keahg3/image/upload/v1689541690/ElectronicsInventory/frontend_ui_images/Nvidia_kkm9dn.svg',
    alt: 'NVIDIA logo',
  },
  {
    src: 'https://res.cloudinary.com/dv6keahg3/image/upload/v1689541689/ElectronicsInventory/frontend_ui_images/HP_xfdwmf.svg',
    alt: 'HP logo',
  },
  {
    src: 'https://res.cloudinary.com/dv6keahg3/image/upload/v1689541688/ElectronicsInventory/frontend_ui_images/GM_gyjz8x.svg',
    alt: 'GM logo',
  },
];

function CustomerGallery() {
  return (
    <section className="customer-gallery" aria-labelledby="trusted-by-heading">
      <Container className="customer-gallery-container">
        <div className="spacer" />
        <h2 id="trusted-by-heading" className="customer-header-text">
          These companies trust Ei:
        </h2>

        <div className="spacer-small" />

        <Row className="g-4 justify-content-center align-items-center">
          {LOGOS.map((logo) => (
            <Col
              key={logo.src}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              className="d-flex justify-content-center"
            >
              <figure className="customer-figure" aria-hidden={false}>
                <img
                  className="customer-icon"
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  width="300"
                  height="80"
                />
              </figure>
            </Col>
          ))}
        </Row>

        <div className="spacer-small" />
      </Container>
    </section>
  );
}

export default CustomerGallery;
