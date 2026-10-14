import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#071827',
          deep: '#0b2236',
          gold: '#ffb51b',
          ink: '#10243a',
          soft: '#f5f8fb',
        },
      },
      boxShadow: {
        hero: '0 18px 55px rgba(3, 15, 27, .28)',
        card: '0 8px 28px rgba(9, 31, 49, .08)',
      },
    },
  },
  plugins: [],
};

export default config;
