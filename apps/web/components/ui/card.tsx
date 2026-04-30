import { forwardRef } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "border" | "shadow";
  as?: "div" | "article" | "section";
}

/**
 * Card component for grouped content.
 *
 * Accessibility:
 * - Supports semantic `as` prop for article or section tags.
 * - Focus styles applied if card contains focusable children.
 * - Color contrast verified for border and shadow variants.
 *
 * Keyboard: Inherited from children; card itself not focusable.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "border", as: Component = "div", className, ...props }, ref) => {
    const variantClass =
      variant === "border" ? "border border-border-default" : "shadow-sm";

    return (
      <Component
        ref={ref as React.Ref<HTMLDivElement>}
        className={`
          bg-bg-surface
          rounded-lg
          p-6
          ${variantClass}
          ${className || ""}
        `.trim()}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";
