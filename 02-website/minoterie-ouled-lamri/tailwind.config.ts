import type { Config } from 'tailwindcss';

/**
 * Colors read CSS variables defined in app/globals.css.
 * Values come from the official brand guidelines (Charte graphique 2026):
 *   Crème #F4ECDD · Brun meunier #3A2516 · Or blé #B5893E · Or profond #8A6524
 * Proportions: 60 cream / 30 brown / 10 gold. Gold is never running text.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
    extend: {
      colors: {
        primary: 'var(--gold)', // Or blé
        secondary: 'var(--brown)', // Brun meunier
        accent: 'var(--cream)', // Crème
        gold: { DEFAULT: 'var(--gold)', deep: 'var(--gold-deep)', soft: 'var(--gold-soft)', tint: 'var(--gold-tint)' },
        brown: { DEFAULT: 'var(--brown)', deep: 'var(--brown-deep)', 2: 'var(--brown-2)', 3: 'var(--brown-3)' },
        cream: 'var(--cream)',
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        'border-strong': 'var(--border-strong)',
        'accent-text': 'var(--accent-text)',
        whatsapp: { DEFAULT: 'var(--whatsapp)', hover: 'var(--whatsapp-hover)', on: 'var(--on-whatsapp)' },
        success: { DEFAULT: 'var(--success)', bg: 'var(--success-bg)' },
        error: { DEFAULT: 'var(--error)', bg: 'var(--error-bg)' },
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
        arabic: ['var(--font-arabic)'],
      },
      borderRadius: { sm: '4px', md: '8px', lg: '16px', pill: '999px' },
      boxShadow: { raised: 'var(--shadow-raised)' },
      maxWidth: { container: '1200px' },
      minHeight: { control: '48px', tap: '44px' },
    },
  },
  plugins: [],
};
export default config;
