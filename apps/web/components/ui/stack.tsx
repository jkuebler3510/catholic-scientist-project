import { forwardRef } from "react";

type StackGap =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "6"
  | "8"
  | "10"
  | "12"
  | "16"
  | "20"
  | "24"
  | "32";

const gapMap: Record<StackGap, string> = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "6": "gap-6",
  "8": "gap-8",
  "10": "gap-10",
  "12": "gap-12",
  "16": "gap-16",
  "20": "gap-20",
  "24": "gap-24",
  "32": "gap-32",
};

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: StackGap;
}

/**
 * Vertical stack component for spacing children.
 *
 * Accessibility:
 * - Structural layout component, no interactive behavior.
 * - Uses flexbox for consistent spacing.
 *
 * Keyboard: Not focusable.
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ gap = "4", className, ...props }, ref) => {
    const gapClass = gapMap[gap];

    return (
      <div
        ref={ref}
        className={`flex flex-col ${gapClass} ${className || ""}`.trim()}
        {...props}
      />
    );
  },
);

Stack.displayName = "Stack";

interface InlineProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: StackGap;
}

/**
 * Horizontal inline component for spacing children.
 *
 * Accessibility:
 * - Structural layout component, no interactive behavior.
 * - Uses flexbox for consistent spacing.
 *
 * Keyboard: Not focusable.
 */
export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  ({ gap = "4", className, ...props }, ref) => {
    const gapClass = gapMap[gap];

    return (
      <div
        ref={ref}
        className={`flex flex-row ${gapClass} ${className || ""}`.trim()}
        {...props}
      />
    );
  },
);

Inline.displayName = "Inline";
