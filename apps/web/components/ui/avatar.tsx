import { forwardRef } from "react";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
};

/**
 * Avatar component with fallback to initials.
 *
 * Used in member directory, author bylines, and user profiles.
 * Falls back to initials when image is not available.
 *
 * Accessibility:
 * - Image has proper alt text
 * - Initials have aria-label for screen readers
 * - High contrast verified
 *
 * Keyboard: Not interactive; content only.
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { src, alt = "Avatar", initials, name, size = "md", className, ...props },
    ref,
  ) => {
    const sizeClass = sizeMap[size];

    return (
      <div
        ref={ref}
        className={`
          ${sizeClass}
          rounded-full
          overflow-hidden
          flex items-center justify-center
          bg-parchment-200
          font-semibold
          text-fg-default
          flex-shrink-0
          ${className || ""}
        `.trim()}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span
            className="font-sans font-semibold"
            aria-label={name || initials}
          >
            {initials}
          </span>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";
