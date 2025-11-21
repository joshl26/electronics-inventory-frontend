// A toggle button to switch between light and dark themes, persisting choice in localStorage.
// file: src/components/common/ThemeToggle/ThemeToggle.jsx

import React, { useEffect, useState } from "react";
import "./ThemeToggle.scss";
import { FaSun, FaMoon } from "react-icons/fa";

const STORAGE_KEY = "theme"; // "dark" | "light"

const ThemeToggle = () => {
  // null -> not yet initialized (avoids hydration mismatch)
  const [isDark, setIsDark] = useState(null);

  // initialize on mount only (client-safe)
  useEffect(() => {
    if (typeof window === "undefined") {
      setIsDark(false);
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        setIsDark(stored === "dark");
      } else {
        // fallback to existing document attribute or default to light
        const attr = document.documentElement.getAttribute("data-theme");
        setIsDark(attr === "dark");
      }
    } catch (err) {
      // localStorage may be blocked; fallback
      const attr = document.documentElement.getAttribute("data-theme");
      setIsDark(attr === "dark");
    }
  }, []);

  // sync to DOM and persist whenever isDark changes (skip initial null)
  useEffect(() => {
    if (isDark === null) return;
    try {
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
      );
      localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // ignore storage errors
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
      );
    }
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  // while initializing, render a visually-hidden placeholder or conservative UI
  // so markup stays stable between server and client.
  if (isDark === null) {
    return (
      <button
        type="button"
        className="theme-toggle"
        aria-pressed={false}
        aria-label="Toggle theme"
      >
        <span className="theme-toggle-track" aria-hidden="true">
          <span className="theme-toggle-thumb" role="img" aria-hidden="true">
            <FaSun className="theme-icon" />
          </span>
        </span>
        <span className="theme-toggle-label">Light</span>
      </button>
    );
  }

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
