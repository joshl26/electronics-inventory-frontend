import { useSelector } from "react-redux";
import { selectCurrentToken } from "../components/features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let isDemo = false;
  let isEmployee = false;
  let status = "";

  // Assign value to a key
  sessionStorage.setItem("token", token);

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");
    isEmployee = roles.includes("Employee");
    isDemo = roles.includes("Demo");

    if (isDemo) status = "Demo";
    if (isEmployee) status = "Employee";
    if (isAdmin) status = "Admin";
    if (isManager) status = "Manager";

    return { username, roles, status, isManager, isAdmin, isEmployee, isDemo };
  }

  return {
    username: "",
    roles: [],
    status,
    isManager,
    isAdmin,
    isEmployee,
    isDemo,
  };
};
export default useAuth;
