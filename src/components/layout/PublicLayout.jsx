import PublicFooter from "components/layout/Footer/PublicFooter";
import PublicHeader from "components/layout/Header/PublicHeader";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <PublicHeader />
      <Outlet />
      <PublicFooter />
    </>
  );
};
export default PublicLayout;
