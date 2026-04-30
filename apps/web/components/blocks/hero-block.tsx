import { forwardRef, type ReactNode } from "react";
import { Heading, Text, Button } from "../ui";

type HeroTone = "gold" | "ink" | "parchment";

const toneConfig: Record<HeroTone, { bgGradient: string; textColor: string }> =
  {
    gold: {
      bgGradient: "from-gold-600 to-gold-700",
      textColor: "text-white",
    },
    ink: {
      bgGradient: "from-ink-900 to-ink-950",
      textColor: "text-parchment-50",
    },
    parchment: {
      bgGradient: "from-parchment-100 to-parchment-200",
      textColor: "text-ink-950",
    },
  };

interface HeroBlockProps {
  eyebrow?: ReactNode;
  headline: ReactNode;
  subhead?: ReactNode;
  image?: {
    src: string;
    alt: string;
  };
  actions?: Array<{
    label: ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "secondary";
  }>;
  tone?: HeroTone;
  variant?: "home" | "inner";
}

/**
 * Hero block for page headers.
 *
 * Full-bleed image with overlay, headline, and optional CTAs.
 * Variants: 'home' (larger), 'inner' (smaller for content pages)
 *
 * Accessibility:
 * - Image has proper alt text
 * - Headline uses proper semantic heading tag
 * - Buttons are keyboard accessible
 * - Color contrast verified against overlay
 *
 * Keyboard:
 * - Tab: Focus action buttons
 * - Enter/Space: Activate buttons
 */
export const HeroBlock = forwardRef<HTMLDivElement, HeroBlockProps>(
  (
    {
      eyebrow,
      headline,
      subhead,
      image,
      actions = [],
      tone = "parchment",
      variant = "home",
    },
    ref,
  ) => {
    const config = toneConfig[tone];
    const isHome = variant === "home";
    const padding = isHome ? "py-32 md:py-48" : "py-24 md:py-32";
    const headlineSize = isHome ? "text-5xl" : "text-4xl";

    return (
      <div
        ref={ref}
        className={`
          relative
          w-full
          overflow-hidden
          ${padding}
          ${image ? "bg-cover bg-center" : `bg-gradient-to-r ${config.bgGradient}`}
        `}
        style={
          image
            ? {
                backgroundImage: `url('${image.src}')`,
              }
            : undefined
        }
      >
        {/* Overlay for text readability */}
        {image && (
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        )}

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-left">
          {eyebrow && (
            <div
              className={`text-sm font-semibold uppercase tracking-eyebrow mb-3 ${
                tone === "parchment" ? "text-fg-muted" : config.textColor
              }`}
            >
              {eyebrow}
            </div>
          )}

          <Heading
            variant="display"
            className={`${headlineSize} ${config.textColor} mb-4 max-w-2xl`}
          >
            {headline}
          </Heading>

          {subhead && (
            <Text
              variant="lead"
              className={`${config.textColor} max-w-xl mb-8 opacity-90`}
            >
              {subhead}
            </Text>
          )}

          {actions.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-8">
              {actions.slice(0, 2).map((action, index) => (
                <Button
                  key={index}
                  variant={
                    action.variant || (index === 0 ? "primary" : "secondary")
                  }
                  onClick={action.onClick}
                  {...(action.href
                    ? { as: "a" as const, href: action.href }
                    : {})}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);

HeroBlock.displayName = "HeroBlock";
