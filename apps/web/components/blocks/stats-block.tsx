import { forwardRef, type ReactNode } from "react";
import { Heading, Container } from "../ui";

interface Stat {
  label: ReactNode;
  value: ReactNode;
  note?: ReactNode;
}

interface StatsBlockProps {
  heading?: ReactNode;
  stats: Stat[];
  className?: string;
}

/**
 * Stats block for displaying key metrics.
 *
 * Displays 3-4 key statistics in a responsive grid.
 * Examples: "1,800+ members", "27 chapters", "9 annual conferences"
 *
 * Accessibility:
 * - Proper semantic headings
 * - Responsive layout for mobile
 * - High contrast numbers
 *
 * Keyboard: Not interactive.
 */
export const StatsBlock = forwardRef<HTMLDivElement, StatsBlockProps>(
  ({ heading, stats, className }, ref) => {
    return (
      <Container
        ref={ref}
        width="wide"
        className={`py-24 md:py-32 ${className || ""}`.trim()}
      >
        {heading && (
          <Heading variant="h2" className="text-center mb-12">
            {heading}
          </Heading>
        )}

        <div
          className={`
            grid
            gap-8
            md:gap-12
            ${stats.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-4"}
          `}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold-600 mb-2 font-serif">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-fg-default mb-1">
                {stat.label}
              </div>
              {stat.note && (
                <div className="text-sm text-fg-muted">{stat.note}</div>
              )}
            </div>
          ))}
        </div>
      </Container>
    );
  },
);

StatsBlock.displayName = "StatsBlock";
