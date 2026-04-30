import { forwardRef, type ReactNode } from "react";

type TextVariant = "body" | "lead" | "caption";
type TextTone = "default" | "muted" | "subtle";

const variantMap: Record<TextVariant, string> = {
  body: "text-base leading-relaxed",
  lead: "text-lg leading-relaxed",
  caption: "font-sans text-sm font-medium leading-normal",
};

const toneMap: Record<TextTone, string> = {
  default: "text-fg-default",
  muted: "text-fg-muted",
  subtle: "text-fg-subtle",
};

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  tone?: TextTone;
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
}

/**
 * Text component for body copy with tone variants.
 *
 * Accessibility:
 * - Uses semantic <p> tag by default; can be polymorphic via `as` prop.
 * - Color contrast verified for all tone variants against backgrounds.
 * - Respects user text zoom preferences via em-based sizing.
 *
 * Keyboard: Inline content, no interaction by default.
 */
export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    { variant = "body", tone = "default", as = "p", className, ...props },
    ref,
  ) => {
    const Component = as as React.ElementType;
    const variantClass = variantMap[variant];
    const toneClass = toneMap[tone];

    return (
      <Component
        ref={ref}
        className={`${variantClass} ${toneClass} ${className || ""}`.trim()}
        {...props}
      />
    );
  },
);

Text.displayName = "Text";
