// src/features/auth/authSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      // return a new state object instead of mutating `state`
      return { ...state, token: accessToken };
    },
    logOut: (state) =>
      // no unused `action` parameter and no param reassignment
      ({ ...state, token: null }),
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
