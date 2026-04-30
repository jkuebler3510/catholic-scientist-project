import type { Config } from 'tailwindcss';

const preset: Partial<Config> = {
  theme: {
    extend: {
      // Color primitives (HSL-based)
      colors: {
        // Brand colors
        gold: {
          '50': 'hsl(42, 70%, 96%)',
          '100': 'hsl(42, 70%, 90%)',
          '200': 'hsl(41, 70%, 80%)',
          '300': 'hsl(40, 70%, 70%)',
          '400': 'hsl(40, 70%, 60%)',
          '500': 'hsl(40, 70%, 48%)', // brand
          '600': 'hsl(39, 72%, 42%)',
          '700': 'hsl(36, 75%, 36%)',
          '800': 'hsl(33, 77%, 26%)',
          '900': 'hsl(30, 70%, 20%)',
          '950': 'hsl(30, 60%, 14%)',
        },
        // Body text + UI
        ink: {
          '50': 'hsl(220, 18%, 97%)',
          '100': 'hsl(220, 16%, 94%)',
          '200': 'hsl(220, 15%, 88%)',
          '300': 'hsl(220, 14%, 80%)',
          '400': 'hsl(220, 14%, 60%)',
          '500': 'hsl(220, 14%, 32%)',
          '600': 'hsl(220, 16%, 26%)',
          '700': 'hsl(220, 18%, 18%)',
          '800': 'hsl(220, 20%, 14%)',
          '900': 'hsl(220, 22%, 12%)', // body
          '950': 'hsl(220, 24%, 6%)', // display
        },
        // Surface
        parchment: {
          '50': 'hsl(40, 35%, 99%)', // page bg
          '100': 'hsl(38, 28%, 96%)',
          '200': 'hsl(36, 20%, 91%)', // borders, dividers
          '300': 'hsl(34, 18%, 85%)',
          '400': 'hsl(32, 16%, 75%)',
          '500': 'hsl(30, 14%, 60%)',
        },
        // Sacred accent
        claret: {
          '50': 'hsl(355, 70%, 96%)',
          '100': 'hsl(355, 65%, 90%)',
          '200': 'hsl(355, 60%, 80%)',
          '300': 'hsl(355, 55%, 70%)',
          '400': 'hsl(355, 50%, 50%)',
          '500': 'hsl(355, 50%, 36%)',
          '600': 'hsl(355, 52%, 32%)',
          '700': 'hsl(355, 55%, 26%)',
          '800': 'hsl(355, 58%, 20%)',
          '900': 'hsl(355, 60%, 14%)',
          '950': 'hsl(355, 62%, 8%)',
        },
        // Semantic colors (map to primitives) - use CSS variables for consistency
        'bg-canvas': 'var(--color-bg-canvas, hsl(40, 35%, 99%))',
        'bg-surface': 'var(--color-bg-surface, #ffffff)',
        'bg-surface-muted': 'var(--color-bg-surface-muted, hsl(38, 28%, 96%))',
        'bg-inverse': 'var(--color-bg-inverse, hsl(220, 24%, 6%))',
        'fg-default': 'var(--color-fg-default, hsl(220, 22%, 12%))',
        'fg-muted': 'var(--color-fg-muted, hsl(220, 14%, 32%))',
        'fg-subtle': 'var(--color-fg-subtle, hsl(220, 10%, 45%))',
        'fg-on-inverse': 'var(--color-fg-on-inverse, hsl(40, 35%, 99%))',
        'fg-link': 'var(--color-fg-link, hsl(36, 75%, 36%))',
        'fg-link-hover': 'var(--color-fg-link-hover, hsl(30, 60%, 14%))',
        'fg-sacred': 'var(--color-fg-sacred, hsl(355, 55%, 26%))',
        'border-default': 'var(--color-border-default, hsl(36, 20%, 91%))',
        'border-strong': 'var(--color-border-strong, hsl(220, 15%, 88%))',
        'border-focus': 'var(--color-border-focus, hsl(40, 70%, 48%))',
      },

      // Typography scale (fluid)
      fontSize: {
        xs: 'clamp(0.75rem, 0.6vw + 0.7rem, 0.8125rem)',
        sm: 'clamp(0.875rem, 0.7vw + 0.8rem, 0.9375rem)',
        base: 'clamp(1rem, 0.9vw + 0.9rem, 1.125rem)',
        lg: 'clamp(1.125rem, 1vw + 1rem, 1.25rem)',
        xl: 'clamp(1.375rem, 1.2vw + 1.2rem, 1.625rem)',
        '2xl': 'clamp(1.625rem, 1.4vw + 1.4rem, 2rem)',
        '3xl': 'clamp(2rem, 1.8vw + 1.6rem, 2.75rem)',
        '4xl': 'clamp(2.5rem, 2.2vw + 2rem, 3.5rem)',
        '5xl': 'clamp(3rem, 2.8vw + 2.4rem, 4.5rem)',
      },

      // Line heights
      lineHeight: {
        tight: '1.1',
        snug: '1.25',
        normal: '1.5',
        relaxed: '1.65',
      },

      // Letter spacing (tracking)
      letterSpacing: {
        tight: '-0.02em',
        snug: '-0.015em',
        normal: '0',
        display: '-0.015em',
        eyebrow: '0.08em',
      },

      // Font families
      fontFamily: {
        serif: 'var(--font-serif)',
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },

      // Border radius
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '10px',
        xl: '16px',
        full: '9999px',
      },

      // Shadows
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
        DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        md: '0 4px 6px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.04)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.04)',
      },

      // Motion / transitions
      transitionDuration: {
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
      },
      transitionTimingFunction: {
        'ease-out-quad': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      // Z-index scale
      zIndex: {
        base: '0',
        elevated: '10',
        overlay: '50',
        toast: '60',
        tooltip: '70',
        skip: '80',
      },

      // Container widths
      maxWidth: {
        prose: '65ch',
        content: '760px',
        wide: '1024px',
        full: '1280px',
      },
    },
  },
  plugins: [],
};

export default preset;
