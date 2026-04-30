import { forwardRef } from "react";

type BadgeVariant =
  | "default"
  | "gold"
  | "claret"
  | "success"
  | "warning"
  | "info";

const variantMap: Record<BadgeVariant, string> = {
  default: "bg-parchment-200 text-fg-default",
  gold: "bg-gold-100 text-gold-950",
  claret: "bg-claret-100 text-claret-950",
  success: "bg-emerald-100 text-emerald-950",
  warning: "bg-amber-100 text-amber-950",
  info: "bg-blue-100 text-blue-950",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/**
 * Badge component for status pills and labels.
 *
 * Accessibility:
 * - Semantic <span> with appropriate ARIA roles if needed.
 * - Color contrast verified for all variants.
 * - Icon support recommended alongside color for non-color-blind distinction.
 * - Not focusable; content only.
 *
 * Keyboard: Not interactive.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", className, ...props }, ref) => {
    const variantClass = variantMap[variant];

    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center gap-1.5
          px-2.5 py-1
          text-xs font-semibold
          rounded-full
          ${variantClass}
          ${className || ""}
        `.trim()}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";
