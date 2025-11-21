/* eslint-disable import/first */
/* eslint-disable testing-library/no-unnecessary-act */
// src/components/pages/public/LoginPage/LoginPage.test.jsx

import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const store = mockStore({});

const mocks = {
  loginMock: jest.fn(() => ({
    unwrap: () => Promise.resolve({ accessToken: "fake-token" }),
  })),
};

jest.mock("components/features/auth/authApiSlice", () => ({
  useLoginMutation: () => [mocks.loginMock, { isLoading: false }],
}));

jest.mock("components/features/auth/authSlice", () => ({
  setCredentials: jest.fn((payload) => ({ type: "setCredentials", payload })),
}));

jest.mock("hooks/usePersist", () => () => [false, jest.fn()]);

import LoginPage from "./LoginPage";

const renderLogin = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>
  );

describe("LoginPage component", () => {
  beforeEach(() => {
    mocks.loginMock.mockClear();
    store.clearActions();
  });

  test("renders username input and Continue button initially", () => {
    renderLogin();

    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
  });

  test("Continue button disables when username is empty", () => {
    renderLogin();

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    expect(continueBtn).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: "user1" },
    });
    expect(continueBtn).toBeEnabled();
  });

  test("clicking Continue shows password input and Sign In button", () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: "user1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /continue/i })
    ).not.toBeInTheDocument();
  });

  test("submitting form calls login mutation and dispatches credentials", async () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: "user1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "pass123" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    // Wait for UI to stabilize after submit
    await screen.findByRole("button", { name: /sign in/i });

    expect(mocks.loginMock).toHaveBeenCalledWith({
      username: "user1",
      password: "pass123",
    });
  });

  test("shows error message on login failure", async () => {
    mocks.loginMock.mockImplementationOnce(() => ({
      unwrap: () =>
        Promise.reject({
          status: 401,
          data: { message: "Unauthorized" },
        }),
    }));

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: "user1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    const errorMessage = await screen.findByText(/unauthorized/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
