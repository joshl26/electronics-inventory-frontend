import React, { useEffect, useState } from "react";
import "./ThemeToggle.css";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.getAttribute("data-theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb" role="img" aria-hidden="true">
          {isDark ? (
            <FaMoon className="theme-icon" />
          ) : (
            <FaSun className="theme-icon" />
          )}
        </span>
      </span>
      <span className="theme-toggle-label">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
};

export default ThemeToggle;
