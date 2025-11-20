import PublicFooter from "features/pages/PublicFooter";
import PublicHeader from "features/pages/PublicHeader";
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
