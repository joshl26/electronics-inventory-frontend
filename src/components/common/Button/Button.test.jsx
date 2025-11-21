/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button Component", () => {
  describe("Rendering", () => {
    it("renders with text content", () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: /click me/i })
      ).toBeInTheDocument();
    });

    it("renders with children elements", () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      );
      expect(screen.getByText("Icon")).toBeInTheDocument();
      expect(screen.getByText("Text")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Button className="custom-class">Button</Button>);
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });

    it("renders as button type by default", () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });
  });

  describe("Variants", () => {
    it("renders primary variant by default", () => {
      const { container } = render(<Button>Primary</Button>);
      expect(container.firstChild).toHaveClass("primary");
    });

    it("renders secondary variant", () => {
      const { container } = render(
        <Button variant="secondary">Secondary</Button>
      );
      expect(container.firstChild).toHaveClass("secondary");
    });

    it("renders success variant", () => {
      const { container } = render(<Button variant="success">Success</Button>);
      expect(container.firstChild).toHaveClass("success");
    });

    it("renders danger variant", () => {
      const { container } = render(<Button variant="danger">Danger</Button>);
      expect(container.firstChild).toHaveClass("danger");
    });

    it("renders warning variant", () => {
      const { container } = render(<Button variant="warning">Warning</Button>);
      expect(container.firstChild).toHaveClass("warning");
    });

    it("renders outline variant", () => {
      const { container } = render(<Button variant="outline">Outline</Button>);
      expect(container.firstChild).toHaveClass("outline");
    });
  });

  describe("Sizes", () => {
    it("renders medium size by default", () => {
      const { container } = render(<Button>Medium</Button>);
      expect(container.firstChild).toHaveClass("medium");
    });

    it("renders small size", () => {
      const { container } = render(<Button size="small">Small</Button>);
      expect(container.firstChild).toHaveClass("small");
    });

    it("renders large size", () => {
      const { container } = render(<Button size="large">Large</Button>);
      expect(container.firstChild).toHaveClass("large");
    });
  });

  describe("Button Types", () => {
    it("renders as submit type", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("renders as reset type", () => {
      render(<Button type="reset">Reset</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
    });
  });

  describe("Interactions", () => {
    it("calls onClick handler when clicked", async () => {
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Click me</Button>);
      await userEvent.click(screen.getByRole("button"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick with event object", async () => {
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Click me</Button>);
      await userEvent.click(screen.getByRole("button"));

      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });

    it("does not call onClick when disabled", async () => {
      const handleClick = jest.fn();

      render(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>
      );
      await userEvent.click(screen.getByRole("button"));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not call onClick when loading", async () => {
      const handleClick = jest.fn();

      render(
        <Button onClick={handleClick} loading>
          Click me
        </Button>
      );
      await userEvent.click(screen.getByRole("button"));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Disabled State", () => {
    it("is disabled when disabled prop is true", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("is not disabled by default", () => {
      render(<Button>Enabled</Button>);
      expect(screen.getByRole("button")).not.toBeDisabled();
    });

    it("applies disabled styles", () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      expect(container.firstChild).toBeDisabled();
    });
  });

  describe("Loading State", () => {
    it("shows loading text when loading", () => {
      render(<Button loading>Submit</Button>);
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it("disables button when loading", () => {
      render(<Button loading>Submit</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("applies loading class", () => {
      const { container } = render(<Button loading>Submit</Button>);
      expect(container.firstChild).toHaveClass("loading");
    });

    it("sets aria-busy attribute when loading", () => {
      render(<Button loading>Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });

    it("hides original children when loading", () => {
      render(<Button loading>Original Text</Button>);
      expect(screen.queryByText("Original Text")).not.toBeInTheDocument();
    });

    it("shows spinner when loading", () => {
      const { container } = render(<Button loading>Submit</Button>);
      expect(container.querySelector(".spinner")).toBeInTheDocument();
    });

    it("sets aria-busy to false when not loading", () => {
      render(<Button>Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "false");
    });
  });

  describe("Full Width", () => {
    it("applies fullWidth class when fullWidth prop is true", () => {
      const { container } = render(<Button fullWidth>Full Width</Button>);
      expect(container.firstChild).toHaveClass("fullWidth");
    });

    it("does not apply fullWidth class by default", () => {
      const { container } = render(<Button>Normal</Button>);
      expect(container.firstChild).not.toHaveClass("fullWidth");
    });
  });

  describe("Additional Props", () => {
    it("forwards additional props to button element", () => {
      render(
        <Button data-testid="custom-button" aria-label="Custom Label">
          Button
        </Button>
      );
      const button = screen.getByTestId("custom-button");
      expect(button).toHaveAttribute("aria-label", "Custom Label");
    });

    it("supports id attribute", () => {
      render(<Button id="my-button">Button</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("id", "my-button");
    });

    it("supports name attribute", () => {
      render(<Button name="submit-btn">Button</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("name", "submit-btn");
    });
  });

  describe("Accessibility", () => {
    it("has button role", () => {
      render(<Button>Accessible Button</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("is keyboard accessible", async () => {
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Press Enter</Button>);
      const button = screen.getByRole("button");
      button.focus();
      await userEvent.type(button, "{enter}");

      expect(handleClick).toHaveBeenCalled();
    });

    it("can be focused", () => {
      render(<Button>Focus Me</Button>);
      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });

    it("cannot be focused when disabled", () => {
      render(<Button disabled>Cannot Focus</Button>);
      const button = screen.getByRole("button");
      button.focus();
      expect(button).not.toHaveFocus();
    });
  });

  describe("Snapshot Tests", () => {
    it("matches snapshot for primary button", () => {
      const { container } = render(<Button>Primary Button</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for loading button", () => {
      const { container } = render(<Button loading>Loading</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for disabled button", () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for large success button", () => {
      const { container } = render(
        <Button variant="success" size="large">
          Large Success
        </Button>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe("Edge Cases", () => {
    it("handles multiple rapid clicks", async () => {
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole("button");

      await userEvent.click(button);
      await userEvent.click(button);
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it("handles undefined onClick gracefully", () => {
      render(<Button>Click me</Button>);

      // Should not throw error
      expect(() => {
        userEvent.click(screen.getByRole("button"));
      }).not.toThrow();
    });

    it("combines multiple classes correctly", () => {
      const { container } = render(
        <Button variant="success" size="large" fullWidth className="custom">
          Button
        </Button>
      );
      const button = container.firstChild;

      expect(button).toHaveClass("success");
      expect(button).toHaveClass("large");
      expect(button).toHaveClass("fullWidth");
      expect(button).toHaveClass("custom");
    });

    it("handles empty children", () => {
      render(<Button>{""}</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });
});
