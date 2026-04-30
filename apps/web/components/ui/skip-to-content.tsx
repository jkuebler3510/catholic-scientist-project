import { forwardRef } from "react";

interface SkipToContentProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

/**
 * Skip-to-content link for keyboard accessibility.
 *
 * This link is hidden by default and becomes visible on focus.
 * It's the first focusable element on every page and allows users
 * to jump directly to main content, skipping navigation.
 *
 * Accessibility:
 * - Always rendered first in the page
 * - Visible on focus only (not hidden off-screen)
 * - Links to `#main` by convention
 * - High contrast background
 *
 * Keyboard:
 * - Tab: Focus and reveal
 * - Enter: Navigate to main content
 */
export const SkipToContent = forwardRef<HTMLAnchorElement, SkipToContentProps>(
  ({ href = "#main", className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={`
        absolute
        -top-10
        left-0
        z-skip
        bg-gold-500
        px-4
        py-2
        text-sm
        font-semibold
        text-ink-950
        rounded-md
        focus-visible:static
        transition-all
        ${className || ""}
      `.trim()}
        {...props}
      >
        {children || "Skip to main content"}
      </a>
    );
  },
);

SkipToContent.displayName = "SkipToContent";
