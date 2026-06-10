/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f6f8fb',
          100: '#e8edf5',
          200: '#d7dfeb',
          300: '#b5c2d4',
          400: '#8a9ab0',
          500: '#62748c',
          600: '#455469',
          700: '#2f3d4f',
          800: '#1c2432',
          900: '#0f1722',
          950: '#090f18',
        },
        primary: {
          50: '#f8f4ec',
          100: '#efe7d6',
          200: '#e1d2b4',
          300: '#d0ba8e',
          400: '#c5aa78',
          500: '#bd9a68',
          600: '#a88552',
          700: '#8a6c42',
          800: '#6d5635',
          900: '#4c3c25',
        },
        accent: {
          50: '#eff4fb',
          100: '#dfe9f5',
          200: '#c6d7ea',
          300: '#9fbad5',
          400: '#799bbe',
          500: '#587ea5',
          600: '#3f627f',
          700: '#2f475c',
          800: '#213143',
          900: '#121c2b',
        },
      },
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
        display: ['Tajawal', 'Cairo', 'serif'],
      },
      boxShadow: {
        gold: '0 10px 40px -10px rgba(189, 154, 104, 0.5)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #d6c096 0%, #bd9a68 50%, #a07c45 100%)',
        'accent-gradient': 'linear-gradient(135deg, #121c2b 0%, #213143 50%, #3f627f 100%)',
        'white-gradient': 'linear-gradient(160deg, #fffdf8 0%, #f8f2e7 60%, #f1e8d8 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        glow: 'glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
