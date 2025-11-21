/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { renderHook, act } from "@testing-library/react";
import { apiSlice } from "app/api/apiSlice";
import {
  authApiSlice,
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} from "./authApiSlice";
import { logOut, setCredentials } from "./authSlice";

describe("authApiSlice RTK Query hooks", () => {
  const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  it("useLoginMutation returns a mutation function", () => {
    const { result } = renderHook(() => useLoginMutation(), { wrapper });
    expect(typeof result.current[0]).toBe("function");
  });

  it("useSendLogoutMutation returns a mutation function", () => {
    const { result } = renderHook(() => useSendLogoutMutation(), { wrapper });
    expect(typeof result.current[0]).toBe("function");
  });

  it("useRefreshMutation returns a mutation function", () => {
    const { result } = renderHook(() => useRefreshMutation(), { wrapper });
    expect(typeof result.current[0]).toBe("function");
  });

  // You can add more tests with mocked API responses using MSW or jest mocks if needed
});
