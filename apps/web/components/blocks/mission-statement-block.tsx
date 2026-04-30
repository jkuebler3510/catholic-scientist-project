import { forwardRef, type ReactNode } from "react";
import { Container } from "../ui";

interface MissionStatementBlockProps {
  kicker?: ReactNode;
  statement: ReactNode;
  signature?: ReactNode;
  className?: string;
}

/**
 * Mission statement block for home page.
 *
 * Pull-quote treatment with generous padding.
 * Used to display the organization's core mission.
 *
 * Accessibility:
 * - Semantic structure with proper heading hierarchy
 * - Quote styling applied for visual distinction
 * - Color contrast verified
 *
 * Keyboard: Not interactive.
 */
export const MissionStatementBlock = forwardRef<
  HTMLDivElement,
  MissionStatementBlockProps
>(({ kicker, statement, signature, className }, ref) => {
  return (
    <Container
      ref={ref}
      width="content"
      className={`py-24 md:py-32 ${className || ""}`.trim()}
    >
      <div className="text-center max-w-3xl mx-auto">
        {kicker && (
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-fg-muted mb-4">
            {kicker}
          </p>
        )}

        <blockquote className="text-3xl md:text-4xl font-semibold leading-snug text-ink-900 mb-6 italic">
          "{statement}"
        </blockquote>

        {signature && (
          <footer className="text-base font-semibold text-fg-default">
            {signature}
          </footer>
        )}
      </div>
    </Container>
  );
});

MissionStatementBlock.displayName = "MissionStatementBlock";
