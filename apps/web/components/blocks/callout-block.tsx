import { forwardRef, type ReactNode } from "react";
import { Callout, Container } from "../ui";

interface CalloutBlockProps {
  tone?: "default" | "gold" | "claret" | "ink";
  eyebrow?: ReactNode;
  heading: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/**
 * Callout block for promotional content sections.
 *
 * Composes the Callout primitive within a Container.
 * Common uses: "Become a member", "Donate", "Register"
 *
 * Accessibility:
 * - Delegated to Callout component
 * - Proper button/link focus states
 *
 * Keyboard:
 * - Tab: Focus action element
 * - Enter/Space: Activate
 */
export const CalloutBlock = forwardRef<HTMLDivElement, CalloutBlockProps>(
  ({ tone = "gold", eyebrow, heading, body, action, className }, ref) => {
    return (
      <Container
        ref={ref}
        width="wide"
        className={`py-16 md:py-24 ${className || ""}`.trim()}
      >
        <Callout
          tone={tone}
          eyebrow={eyebrow}
          heading={heading}
          body={body}
          action={action}
        />
      </Container>
    );
  },
);

CalloutBlock.displayName = "CalloutBlock";
