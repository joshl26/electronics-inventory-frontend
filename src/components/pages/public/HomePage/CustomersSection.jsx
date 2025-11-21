import { Container, Row, Col } from "react-bootstrap";
import "./CustomersSection.scss";

const customers = [
  {
    alt: "Burton",
    src: "https://res.cloudinary.com/dv6keahg3/image/upload/v1689541687/ElectronicsInventory/frontend_ui_images/Burton_tggtot.svg",
  },
  {
    alt: "Apple",
    src: "https://res.cloudinary.com/dv6keahg3/image/upload/v1689541687/ElectronicsInventory/frontend_ui_images/Apple_c7d7om.svg",
  },
  {
    alt: "ATI",
    src: "https://res.cloudinary.com/dv6keahg3/image/upload/v1689541687/ElectronicsInventory/frontend_ui_images/ATI_byzzxj.svg",
  },
  {
    alt: "Nvidia",
    src: "https://res.cloudinary.com/dv6keahg3/image/upload/v1689541690/ElectronicsInventory/frontend_ui_images/Nvidia_kkm9dn.svg",
  },
  {
    alt: "HP",
    src: "https://res.cloudinary.com/dv6keahg3/image/upload/v1689541689/ElectronicsInventory/frontend_ui_images/HP_xfdwmf.svg",
  },
  {
    alt: "GM",
    src: "https://res.cloudinary.com/dv6keahg3/image/upload/v1689541688/ElectronicsInventory/frontend_ui_images/GM_gyjz8x.svg",
  },
];

const CustomerGallery = () => {
  return (
    <section
      className="customer-gallery"
      aria-label="Companies that trust Electronics Inventory"
    >
      <Container className="customer-gallery-container">
        <h1 className="customer-header-text">These companies trust Ei:</h1>
        <Row>
          {customers.map(({ alt, src }) => (
            <Col key={alt} xs={12} md={4} className="customer-col">
              <img
                src={src}
                alt={alt}
                className="customer-icon"
                loading="lazy"
                width="300"
                height="auto"
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CustomerGallery;
