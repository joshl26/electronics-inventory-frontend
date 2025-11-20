import { Col, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import "./DashFooter.css";

const DashFooter = () => {
  const { username, status } = useAuth();

  return (
    <footer className="dash-footer" aria-label="Dashboard footer user info">
      <Row className="dash-footer-row">
        <Col>
          <p className="dash-footer-paragraph">User: {username}</p>
        </Col>
        <Col>
          <p className="dash-footer-paragraph">Role: {status}</p>
        </Col>
      </Row>
    </footer>
  );
};

export default DashFooter;
