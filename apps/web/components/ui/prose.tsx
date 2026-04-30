import { forwardRef, type ReactNode } from "react";

interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Prose wrapper for CMS-rendered Portable Text content.
 *
 * Applies long-form typography rules:
 * - Maximum width constraint for readability
 * - Proper heading rhythm and spacing
 * - Drop cap support via drop-cap CSS class
 * - Hyphenation for body text
 *
 * Accessibility:
 * - All semantic HTML from CMS respected
 * - Heading hierarchy maintained
 * - Link contrast verified
 * - Lists properly structured
 *
 * Keyboard: Inherited from children (links, etc).
 */
export const Prose = forwardRef<HTMLDivElement, ProseProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          prose
          max-w-prose
          mx-auto
          [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:mt-8 [&_h2]:mb-4
          [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:mt-6 [&_h3]:mb-3
          [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:leading-snug [&_h4]:mt-4 [&_h4]:mb-2
          [&_p]:text-base [&_p]:leading-relaxed [&_p]:max-w-prose [&_p]:hyphens-auto
          [&_ul]:ml-6 [&_ul]:space-y-2
          [&_ol]:ml-6 [&_ol]:space-y-2
          [&_li]:text-base [&_li]:leading-relaxed
          [&_blockquote]:border-l-4 [&_blockquote]:border-gold-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-fg-muted
          [&_a]:text-fg-link [&_a]:hover:text-fg-link-hover [&_a]:underline
          [&_code]:font-mono [&_code]:text-sm [&_code]:bg-parchment-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded
          [&_pre]:bg-ink-950 [&_pre]:text-parchment-50 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
          [&_table]:border-collapse [&_table]:w-full [&_table]:my-4
          [&_thead]:bg-parchment-100
          [&_tbody_tr:nth-child(2n)]:bg-parchment-50
          [&_th]:text-left [&_th]:px-4 [&_th]:py-2 [&_th]:font-semibold
          [&_td]:px-4 [&_td]:py-2 [&_td]:border [&_td]:border-border-default
          ${className || ""}
        `.trim()}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Prose.displayName = "Prose";
