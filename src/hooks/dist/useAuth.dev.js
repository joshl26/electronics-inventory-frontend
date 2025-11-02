// src/hooks/useAuth.js
import { useSelector } from 'react-redux';

import jwtDecode from 'jwt-decode';
import { selectCurrentToken } from '../../features/auth/authSlice';

export default function useAuth() {
  const token = useSelector(selectCurrentToken);

  let username = '';
  let roles = [];
  let isManager = false;
  let isAdmin = false;
  let status = 'Employee';

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const userInfo = decoded && decoded.UserInfo ? decoded.UserInfo : {};

      username = userInfo.username || '';
      roles = Array.isArray(userInfo.roles) ? userInfo.roles : [];

      isManager = roles.includes('Manager');
      isAdmin = roles.includes('Admin');

      if (isAdmin) status = 'Admin';
      else if (isManager) status = 'Manager';

      try {
        sessionStorage.setItem('token', token);
      } catch (err) {
        // ignore sessionStorage errors (e.g. SSR or private mode)
      }
    } catch (err) {
      // invalid token — keep defaults
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
