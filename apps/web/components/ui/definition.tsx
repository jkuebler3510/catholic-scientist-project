import { forwardRef, type ReactNode } from "react";

interface DefinitionProps extends React.HTMLAttributes<HTMLDListElement> {
  items: Array<{
    term: ReactNode;
    definition: ReactNode;
  }>;
}

/**
 * Definition list component for glossary-style content.
 *
 * Used for FAQ entries, glossary definitions, and similar term-definition pairs.
 *
 * Accessibility:
 * - Semantic <dl>, <dt>, <dd> structure
 * - Screen readers announce term-definition relationships
 * - Proper visual spacing for scannability
 *
 * Keyboard: Not interactive; content only.
 */
export const Definition = forwardRef<HTMLDListElement, DefinitionProps>(
  ({ items, className, ...props }, ref) => {
    return (
      <dl
        ref={ref}
        className={`
          space-y-6
          ${className || ""}
        `.trim()}
        {...props}
      >
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <dt className="text-lg font-semibold text-fg-default">
              {item.term}
            </dt>
            <dd className="text-base leading-relaxed text-fg-muted ml-0">
              {item.definition}
            </dd>
          </div>
        ))}
      </dl>
    );
  },
);

Definition.displayName = "Definition";
