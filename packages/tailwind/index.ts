import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    'src/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // river custom start
      fontSize: {
        sm: '0.923rem',
        base: '1rem',
        lg: '1.308rem',
        xl: '1.923rem',
        '2xl': '2.692rem',
      },
      fontFamily: {
        sans: ['var(--font-helvetica-neue)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // river custom end
      borderColor: {
        DEFAULT: 'hsl(var(--border) / <alpha-value>)',
      },
      colors: {
        // river custom start
        onyx: '#373737',
        'light-gray' : '#D2D2D2',
        'bright-gray': '#EEEEEE',
        'silver-sand': '#C2C2C2',
        'philippine-gray': '#8B8B8B',
        'sonic-silver': '#777777',
        'raisin-black': '#262626',
        // river custom end
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '80%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        'fade-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '80%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s',
        'fade-down': 'fade-down 0.5s',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
