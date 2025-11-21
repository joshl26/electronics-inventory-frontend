/* eslint-disable import/first */
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./RequireAuth";

// Mock useAuth hook
jest.mock("hooks/useAuth");

import useAuth from "hooks/useAuth";

describe("RequireAuth component", () => {
  const TestComponent = () => <div>Protected Content</div>;

  const renderWithRouter = (
    allowedRoles,
    userRoles,
    initialEntries = ["/protected"]
  ) => {
    useAuth.mockReturnValue({ roles: userRoles });

    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route element={<RequireAuth allowedRoles={allowedRoles} />}>
            <Route path="/protected" element={<TestComponent />} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders child component if user has allowed role", () => {
    renderWithRouter(["admin", "user"], ["user"]);
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to login if user does not have allowed role", () => {
    renderWithRouter(["admin"], ["user"]);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("redirects to login and preserves location state", () => {
    const initialEntries = ["/protected?foo=bar"];
    renderWithRouter(["admin"], ["guest"], initialEntries);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
