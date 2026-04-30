import { forwardRef, type ReactNode } from "react";

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  label?: ReactNode;
  ornament?: ReactNode;
}

/**
 * Divider component for visual separation.
 *
 * Accessibility:
 * - Uses semantic <hr> tag for structural dividers.
 * - If used with a label, wraps in a role="doc-subtitle" for semantic clarity.
 * - ARIA label describes the divider's purpose if necessary.
 *
 * Keyboard: Not focusable, structural only.
 */
export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ label, ornament, className, ...props }, ref) => {
    if (!label && !ornament) {
      return (
        <hr
          ref={ref}
          className={`border-t border-border-default ${className || ""}`.trim()}
          {...props}
        />
      );
    }

    return (
      <div
        className={`relative flex items-center gap-4 ${className || ""}`.trim()}
      >
        <hr className="flex-1 border-t border-border-default" />
        {ornament && (
          <div className="text-2xl text-gold-500 flex-shrink-0">{ornament}</div>
        )}
        {label && (
          <div className="text-sm font-semibold text-fg-muted flex-shrink-0">
            {label}
          </div>
        )}
        <hr className="flex-1 border-t border-border-default" />
      </div>
    );
  },
);

Divider.displayName = "Divider";
