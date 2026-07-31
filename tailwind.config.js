/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* slate-700 */
        input: 'var(--color-input)', /* slate-700 */
        ring: 'var(--color-ring)', /* emerald-500 */
        background: 'var(--color-background)', /* slate-950 */
        foreground: 'var(--color-foreground)', /* slate-100 */
        primary: {
          DEFAULT: 'var(--color-primary)', /* emerald-500 */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* slate-800 */
          foreground: 'var(--color-secondary-foreground)', /* slate-200 */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-500 */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* slate-800 */
          foreground: 'var(--color-muted-foreground)', /* slate-400 */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* emerald-500 */
          foreground: 'var(--color-accent-foreground)', /* white */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* slate-800 */
          foreground: 'var(--color-popover-foreground)', /* slate-200 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* slate-900 */
          foreground: 'var(--color-card-foreground)', /* slate-300 */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* green-500 */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-500 */
          foreground: 'var(--color-warning-foreground)', /* black */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-500 */
          foreground: 'var(--color-error-foreground)', /* white */
        },
        surface: 'var(--color-surface)', /* slate-900 */
        'text-primary': 'var(--color-text-primary)', /* slate-50 */
        'text-secondary': 'var(--color-text-secondary)', /* slate-400 */
      },
      borderRadius: {
        lg: '14px',
        md: '10px',
        sm: '6px',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      transitionDuration: {
        '250': '250ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'fade-in': 'fade-in 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in': 'slide-in 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}