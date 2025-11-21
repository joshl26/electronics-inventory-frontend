import PublicFooter from "components/layout/Footer/PublicFooter";
import PublicHeader from "components/layout/Header/PublicHeader";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <PublicHeader />
      {/* Use Bootstrap padding top utility class */}
      <div className="pt-5 min-vh-100">
        <Outlet />
      </div>
      <PublicFooter />
    </>
  );
};

export default PublicLayout;
