// desc: Component to restrict access to routes based on user roles.
// file: src/components/features/auth/RequireAuth.jsx

import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = useAuth();

  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  return content;
};

export default RequireAuth;
