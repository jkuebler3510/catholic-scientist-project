import { forwardRef } from "react";

type AlertVariant = "info" | "success" | "warning" | "error";

const variantConfig: Record<
  AlertVariant,
  { bg: string; border: string; text: string; icon: string }
> = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-900",
    icon: "text-blue-500",
  },
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-900",
    icon: "text-emerald-500",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-900",
    icon: "text-amber-500",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-900",
    icon: "text-red-500",
  },
};

const iconMap: Record<AlertVariant, string> = {
  info: "ℹ️",
  success: "✓",
  warning: "⚠",
  error: "✕",
};

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
}

/**
 * Alert component for inline messages.
 *
 * Accessibility:
 * - Semantic <div> with role="alert" for important messages.
 * - Icon always included to avoid color-only distinction.
 * - High color contrast verified for all variants.
 * - Screen reader announcements via role="alert".
 *
 * Keyboard: Not interactive; content only.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "info", title, className, children, ...props }, ref) => {
    const config = variantConfig[variant];
    const icon = iconMap[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={`
          ${config.bg}
          border-l-4 ${config.border}
          ${config.text}
          p-4
          rounded-md
          flex gap-3
          ${className || ""}
        `.trim()}
        {...props}
      >
        <div className={`flex-shrink-0 text-lg ${config.icon}`}>{icon}</div>
        <div className="flex-1">
          {title && <h3 className="font-semibold text-sm mb-1">{title}</h3>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    );
  },
);

Alert.displayName = "Alert";
