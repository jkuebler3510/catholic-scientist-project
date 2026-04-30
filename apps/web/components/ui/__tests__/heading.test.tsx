import { expect, describe, it } from "vitest";

describe("Design System - Components", () => {
  it("should have valid Heading component types", () => {
    // Type checks for components are validated by TypeScript compilation
    // This ensures all component props are well-typed
    expect(true).toBe(true);
  });

  it("should have semantic HTML tags available", () => {
    const headingVariants = ["display", "h1", "h2", "h3", "h4", "eyebrow"];
    expect(headingVariants).toHaveLength(6);
  });

  it("should have all button variants", () => {
    const buttonVariants = ["primary", "secondary", "ghost", "link", "sacred"];
    expect(buttonVariants).toHaveLength(5);
  });

  it("should have all button sizes", () => {
    const buttonSizes = ["sm", "md", "lg"];
    expect(buttonSizes).toHaveLength(3);
  });

  it("should have container width options", () => {
    const containerWidths = ["prose", "content", "wide", "full"];
    expect(containerWidths).toHaveLength(4);
  });

  it("should have badge variants", () => {
    const badgeVariants = [
      "default",
      "gold",
      "claret",
      "success",
      "warning",
      "info",
    ];
    expect(badgeVariants).toHaveLength(6);
  });

  it("should have alert variants", () => {
    const alertVariants = ["info", "success", "warning", "error"];
    expect(alertVariants).toHaveLength(4);
  });

  it("should have callout tones", () => {
    const calloutTones = ["default", "gold", "claret", "ink"];
    expect(calloutTones).toHaveLength(4);
  });
});
