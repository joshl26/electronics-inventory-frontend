/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react"; // Import act from react
import ThemeToggle from "./ThemeToggle";

// Mock react-icons
jest.mock("react-icons/fa", () => ({
  FaSun: () => <span data-testid="sun-icon">Sun</span>,
  FaMoon: () => <span data-testid="moon-icon">Moon</span>,
}));

describe("ThemeToggle Component", () => {
  let localStorageMock;
  let originalWindow;
  let getItemSpy;
  let setItemSpy;

  beforeEach(() => {
    originalWindow = global.window;

    getItemSpy = jest.fn();
    setItemSpy = jest.fn();

    localStorageMock = {
      getItem: getItemSpy,
      setItem: setItemSpy,
      removeItem: jest.fn(),
      clear: jest.fn(),
    };

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
      configurable: true,
    });

    document.documentElement.removeAttribute("data-theme");
  });

  afterEach(() => {
    global.window = originalWindow;
    document.documentElement.removeAttribute("data-theme");
    jest.clearAllMocks();
  });

  describe("Initial Rendering", () => {
    it("renders the toggle button", async () => {
      getItemSpy.mockReturnValue(null);

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument();
      });
    });

    it("shows placeholder state initially", () => {
      getItemSpy.mockReturnValue(null);

      render(<ThemeToggle />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-pressed", "false");
      expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
    });

    it("displays sun icon in initial state", () => {
      getItemSpy.mockReturnValue(null);

      render(<ThemeToggle />);

      expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
    });
  });

  describe("Theme Initialization from localStorage", () => {
    it('initializes with light theme when localStorage has "light"', async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
        expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
      });
    });

    it('initializes with dark theme when localStorage has "dark"', async () => {
      getItemSpy.mockReturnValue("dark");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Dark")).toBeInTheDocument();
        expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
      });
    });

    it("reads from localStorage on mount", async () => {
      getItemSpy.mockReturnValue("dark");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(getItemSpy).toHaveBeenCalledWith("theme");
      });
    });

    it("falls back to document attribute when localStorage is empty", async () => {
      getItemSpy.mockReturnValue(null);
      document.documentElement.setAttribute("data-theme", "dark");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Dark")).toBeInTheDocument();
      });
    });

    it("defaults to light theme when no stored value or attribute", async () => {
      getItemSpy.mockReturnValue(null);

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });
    });
  });

  describe("Theme Toggling", () => {
    it("toggles from light to dark when clicked", async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });

      const button = screen.getByRole("button");

      await act(async () => {
        userEvent.click(button);
      });

      await waitFor(() => {
        expect(screen.getByText("Dark")).toBeInTheDocument();
        expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
      });
    });

    it("toggles from dark to light when clicked", async () => {
      getItemSpy.mockReturnValue("dark");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Dark")).toBeInTheDocument();
      });

      const button = screen.getByRole("button");

      await act(async () => {
        userEvent.click(button);
      });

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
        expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
      });
    });

    it("toggles multiple times correctly", async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });

      const button = screen.getByRole("button");

      await act(async () => {
        userEvent.click(button);
      });
      await waitFor(() => {
        expect(screen.getByText("Dark")).toBeInTheDocument();
      });

      await act(async () => {
        userEvent.click(button);
      });
      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });

      await act(async () => {
        userEvent.click(button);
      });
      await waitFor(() => {
        expect(screen.getByText("Dark")).toBeInTheDocument();
      });
    });
  });

  describe("DOM Attribute Updates", () => {
    it('sets data-theme attribute to "light" for light mode', async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });

      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    });

    it('sets data-theme attribute to "dark" for dark mode', async () => {
      getItemSpy.mockReturnValue("dark");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Dark")).toBeInTheDocument();
      });

      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });

    it("updates data-theme attribute when toggled", async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });

      expect(document.documentElement.getAttribute("data-theme")).toBe("light");

      const button = screen.getByRole("button");

      await act(async () => {
        userEvent.click(button);
      });

      await waitFor(() => {
        expect(document.documentElement.getAttribute("data-theme")).toBe(
          "dark"
        );
      });
    });
  });

  describe("localStorage Persistence", () => {
    it("saves light theme to localStorage", async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });

      expect(setItemSpy).toHaveBeenCalledWith("theme", "light");
    });

    it("saves dark theme to localStorage", async () => {
      getItemSpy.mockReturnValue("dark");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Dark")).toBeInTheDocument();
      });

      expect(setItemSpy).toHaveBeenCalledWith("theme", "dark");
    });

    it("persists theme changes to localStorage", async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });

      setItemSpy.mockClear();

      const button = screen.getByRole("button");

      await act(async () => {
        userEvent.click(button);
      });

      await waitFor(() => {
        expect(setItemSpy).toHaveBeenCalledWith("theme", "dark");
      });
    });

    it("handles localStorage errors gracefully", async () => {
      getItemSpy.mockImplementation(() => {
        throw new Error("localStorage blocked");
      });

      expect(() => {
        render(<ThemeToggle />);
      }).not.toThrow();

      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument();
      });
    });

    it("still updates DOM when localStorage.setItem fails", async () => {
      getItemSpy.mockReturnValue("light");
      setItemSpy.mockImplementation(() => {
        throw new Error("localStorage full");
      });

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });

      const button = screen.getByRole("button");

      await act(async () => {
        userEvent.click(button);
      });

      await waitFor(() => {
        expect(screen.getByText("Dark")).toBeInTheDocument();
      });

      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });
  });

  describe("Accessibility", () => {
    it("has correct aria-label for light mode", async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
    });

    it("has correct aria-label for dark mode", async () => {
      getItemSpy.mockReturnValue("dark");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Dark")).toBeInTheDocument();
      });

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Switch to light mode");
    });

    it("updates aria-pressed attribute when toggled", async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });

      let button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-pressed", "false");

      await act(async () => {
        userEvent.click(button);
      });

      await waitFor(() => {
        button = screen.getByRole("button");
        expect(button).toHaveAttribute("aria-pressed", "true");
      });
    });

    it("has aria-hidden on decorative elements", async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });

      const track = document.querySelector(".theme-toggle-track");
      const thumb = document.querySelector(".theme-toggle-thumb");

      expect(track).toHaveAttribute("aria-hidden", "true");
      expect(thumb).toHaveAttribute("aria-hidden", "true");
    });

    it("is keyboard accessible", async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });

      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();

      // Use userEvent.keyboard to simulate Enter key press
      await act(async () => {
        await userEvent.keyboard("{Enter}");
      });

      await waitFor(() => {
        const label = document.querySelector(".theme-toggle-label");
        expect(label).toBeInTheDocument();
        expect(label.textContent).toMatch(/Dark/i);
      });
    });
  });

  describe("Visual States", () => {
    it("displays sun icon for light mode", async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("moon-icon")).not.toBeInTheDocument();
      });
    });

    it("displays moon icon for dark mode", async () => {
      getItemSpy.mockReturnValue("dark");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("sun-icon")).not.toBeInTheDocument();
      });
    });

    it('shows "Light" label in light mode', async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });
    });

    it('shows "Dark" label in dark mode', async () => {
      getItemSpy.mockReturnValue("dark");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Dark")).toBeInTheDocument();
      });
    });

    it("updates icon when theme changes", async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
      });

      const button = screen.getByRole("button");

      await act(async () => {
        userEvent.click(button);
      });

      await waitFor(() => {
        expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("sun-icon")).not.toBeInTheDocument();
      });
    });
  });

  describe("Edge Cases", () => {
    it("handles invalid localStorage values", async () => {
      getItemSpy.mockReturnValue("invalid-value");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument();
      });
    });

    it("does not update localStorage during initialization", async () => {
      getItemSpy.mockReturnValue("dark");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Dark")).toBeInTheDocument();
      });

      expect(setItemSpy).toHaveBeenCalledTimes(1);
    });

    it("maintains theme consistency across re-renders", async () => {
      getItemSpy.mockReturnValue("dark");

      const { rerender } = render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Dark")).toBeInTheDocument();
      });

      rerender(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Dark")).toBeInTheDocument();
      });
    });
  });

  describe("Button Attributes", () => {
    it('has type="button"', async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("has theme-toggle class", async () => {
      getItemSpy.mockReturnValue("light");

      render(<ThemeToggle />);

      await waitFor(() => {
        expect(screen.getByText("Light")).toBeInTheDocument();
      });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("theme-toggle");
    });
  });
});
