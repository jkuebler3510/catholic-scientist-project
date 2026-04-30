import { forwardRef, type ReactNode } from "react";

interface QuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  citation?: ReactNode;
  children: ReactNode;
}

/**
 * Pull-quote component for highlighted testimonials or citations.
 *
 * Accessibility:
 * - Semantic <blockquote> element.
 * - Citation included as proper attribution.
 * - Italic styling applied for distinction.
 * - Color contrast verified.
 *
 * Keyboard: Not interactive; content only.
 */
export const Quote = forwardRef<HTMLQuoteElement, QuoteProps>(
  ({ citation, className, children, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={`
          border-l-4 border-gold-500
          pl-6
          py-4
          italic
          text-lg
          leading-relaxed
          text-fg-muted
          ${className || ""}
        `.trim()}
        {...props}
      >
        <p>{children}</p>
        {citation && (
          <footer className="mt-4 not-italic text-sm font-semibold text-fg-default">
            — {citation}
          </footer>
        )}
      </blockquote>
    );
  },
);

Quote.displayName = "Quote";
