import { Col, Row } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import "./DashFooter.css";

const DashFooter = () => {
  const { username, status } = useAuth();

  const content = (
    <Row className="dash-footer-row">
      <Row>
        <p className="dash-footer-paragraph">User: {username}</p>
      </Row>
      <Row>
        <p className="dash-footer-paragraph">Role: {status}</p>
      </Row>
    </Row>
  );
  return content;
};
export default DashFooter;
