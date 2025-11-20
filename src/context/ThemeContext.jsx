// Complete Light/Dark Mode Implementation
// file: src/context/ThemeContext.jsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

const THEME_STORAGE_KEY = "ei-theme-preference";
const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored && Object.values(THEMES).includes(stored)) {
        return stored;
      }

      // Check system preference
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return THEMES.DARK;
      }

      return THEMES.LIGHT;
    } catch {
      return THEMES.LIGHT;
    }
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    // Remove both classes first
    root.classList.remove("theme-light", "theme-dark");

    // Add current theme class
    root.classList.add(`theme-${theme}`);

    // Set data attribute for CSS targeting
    root.setAttribute("data-theme", theme);

    // Save to localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.warn("Failed to save theme preference:", error);
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      const hasManualPreference = localStorage.getItem(THEME_STORAGE_KEY);
      if (!hasManualPreference) {
        setTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  }, []);

  const setLightTheme = useCallback(() => {
    setTheme(THEMES.LIGHT);
  }, []);

  const setDarkTheme = useCallback(() => {
    setTheme(THEMES.DARK);
  }, []);

  const value = {
    theme,
    isDark: theme === THEMES.DARK,
    isLight: theme === THEMES.LIGHT,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    THEMES,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
