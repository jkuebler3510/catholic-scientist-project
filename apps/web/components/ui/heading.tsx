import { forwardRef, type ReactNode } from "react";

type HeadingVariant = "display" | "h1" | "h2" | "h3" | "h4" | "eyebrow";

const variantMap: Record<HeadingVariant, string> = {
  display: "text-5xl font-semibold leading-tight tracking-tight",
  h1: "text-4xl font-semibold leading-tight tracking-tight",
  h2: "text-3xl font-semibold leading-snug tracking-normal",
  h3: "text-2xl font-semibold leading-snug tracking-normal",
  h4: "text-xl font-semibold leading-snug tracking-normal",
  eyebrow:
    "font-sans text-xs font-semibold uppercase leading-normal tracking-eyebrow text-fg-muted",
};

const tagMap: Record<HeadingVariant, keyof JSX.IntrinsicElements> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  eyebrow: "p",
};

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: HeadingVariant;
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
}

/**
 * Heading component with polymorphic semantics.
 *
 * Accessibility:
 * - Always renders the semantically correct HTML tag (h1–h6) unless overridden with `as`.
 * - Maintains proper heading hierarchy.
 * - Focus visible state applies default ring style.
 *
 * Keyboard: Focusable if inside an interactive context.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ variant = "h2", as, className, ...props }, ref) => {
    const Component = (as || tagMap[variant]) as React.ElementType;
    const variantClass = variantMap[variant];

    return (
      <Component
        ref={ref}
        className={`${variantClass} ${className || ""}`.trim()}
        {...props}
      />
    );
  },
);

Heading.displayName = "Heading";
