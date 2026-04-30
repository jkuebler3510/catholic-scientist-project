import { forwardRef } from "react";

type ContainerWidth = "prose" | "content" | "wide" | "full";

const widthMap: Record<ContainerWidth, string> = {
  prose: "max-w-prose",
  content: "max-w-content",
  wide: "max-w-wide",
  full: "max-w-full",
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
}

/**
 * Container component for constraining content width.
 *
 * Accessibility:
 * - Structural element, no interactive behavior.
 * - Responsive padding applied automatically.
 *
 * Keyboard: Not focusable.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ width = "content", className, ...props }, ref) => {
    const widthClass = widthMap[width];

    return (
      <div
        ref={ref}
        className={`mx-auto px-4 ${widthClass} ${className || ""}`.trim()}
        {...props}
      />
    );
  },
);

Container.displayName = "Container";
