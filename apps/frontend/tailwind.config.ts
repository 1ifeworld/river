import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-helvetica-neue)'],
      },
      fontSize: {
        sm: '0.923rem',
        base: '1rem',
        lg: '1.308rem',
        xl: '1.923rem',
        '2xl': '2.692rem',
      },
      colors: {
        onyx: '#373737',
        'bright-gray': '#EEEEEE',
        'silver-sand': '#C2C2C2',
        'philippine-gray': '#8B8B8B',
        'sonic-silver': '#777777',
        'raisin-black': '#262626'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
