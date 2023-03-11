import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import { Container } from "react-bootstrap";
import "./DashLayout.scss";
import Cards from "./Cards";
import Cards2 from "./Cards2";
import AddRemoveLayout from "./AddRemoveLayout";

const DashLayout = () => {
  return (
    <div>
      <DashHeader />
      <div className="dash-container">
        <Outlet />
        <div className="dash-main-container">
          {/* <Cards /> */}
          <Cards2 />
          {/* <AddRemoveLayout /> */}
        </div>
      </div>
      <DashFooter />
    </div>
  );
};
export default DashLayout;
