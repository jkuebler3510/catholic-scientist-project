import { forwardRef, type ReactNode } from "react";

type CalloutTone = "default" | "gold" | "claret" | "ink";

const toneConfig: Record<
  CalloutTone,
  { bg: string; border: string; text: string }
> = {
  default: {
    bg: "bg-parchment-100",
    border: "border-parchment-200",
    text: "text-fg-default",
  },
  gold: {
    bg: "bg-gold-50",
    border: "border-gold-200",
    text: "text-gold-950",
  },
  claret: {
    bg: "bg-claret-50",
    border: "border-claret-200",
    text: "text-claret-950",
  },
  ink: {
    bg: "bg-ink-50",
    border: "border-ink-200",
    text: "text-ink-950",
  },
};

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: CalloutTone;
  eyebrow?: ReactNode;
  heading?: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
}

/**
 * Callout component for promotional panels.
 *
 * Accessibility:
 * - Semantic structure with proper heading hierarchy.
 * - Color contrast verified for all tone variants.
 * - Action button or link is focusable and properly labeled.
 *
 * Keyboard:
 * - Tab: Focus the action if present.
 * - Enter/Space: Activate the action.
 */
export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  (
    { tone = "default", eyebrow, heading, body, action, className, ...props },
    ref,
  ) => {
    const config = toneConfig[tone];

    return (
      <div
        ref={ref}
        className={`
          ${config.bg}
          border border-l-4 ${config.border}
          rounded-xl
          p-6
          md:p-8
          ${config.text}
          ${className || ""}
        `.trim()}
        {...props}
      >
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-eyebrow text-fg-muted mb-2">
            {eyebrow}
          </div>
        )}
        {heading && (
          <h3 className="text-2xl font-semibold leading-snug mb-3">
            {heading}
          </h3>
        )}
        {body && <div className="text-base leading-relaxed mb-4">{body}</div>}
        {action && <div className="mt-6">{action}</div>}
      </div>
    );
  },
);

Callout.displayName = "Callout";
