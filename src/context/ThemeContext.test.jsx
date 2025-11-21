/* eslint-disable no-unused-vars */
// src/context/ThemeContext.test.jsx

import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, useTheme, THEMES } from "./ThemeContext";

const TestComponent = () => {
  const { theme } = useTheme();
  return <div>Current theme: {theme}</div>;
};

test("renders without crashing", () => {
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
});
