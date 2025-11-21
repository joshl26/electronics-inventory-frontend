import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";
import authReducer from "../components/features/auth/authSlice";
import settingsReducer from "../app/settings/settingsSlice";
import partsReducer from "../components/features/parts/partsSlice";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        settings: settingsReducer,
        parts: partsReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return { children };
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Re-export everything
export * from "@testing-library/react";
export { renderWithProviders as render };
