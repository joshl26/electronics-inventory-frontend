import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';

export default function useAuth() {
  const token = useSelector(selectCurrentToken);

  let isManager = false;
  let isAdmin = false;
  let status = 'Employee';
  let username = '';
  let roles = [];

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const { UserInfo = {} } = decoded;
      username = UserInfo.username || '';
      roles = Array.isArray(UserInfo.roles) ? UserInfo.roles : [];

      isManager = roles.includes('Manager');
      isAdmin = roles.includes('Admin');

      if (isAdmin) status = 'Admin';
      else if (isManager) status = 'Manager';

      // persist token for tests or other code that reads sessionStorage
      try {
        sessionStorage.setItem('token', token);
      } catch (err) {
        // ignore storage errors (e.g. SSR or private mode)
        /* noop */
      }
    } catch (err) {
      // invalid token; fall through to defaults
      /* noop */
    }
  }

  return {
    username,
    roles,
    status,
    isManager,
    isAdmin,
  };
}
