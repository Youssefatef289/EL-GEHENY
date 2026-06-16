/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // اللون الأساسي للنصوص والأسطح — مبني على متغيّرات CSS لينعكس تلقائياً في الوضع الداكن
        navy: {
          50: 'rgb(var(--navy-50) / <alpha-value>)',
          100: 'rgb(var(--navy-100) / <alpha-value>)',
          200: 'rgb(var(--navy-200) / <alpha-value>)',
          300: 'rgb(var(--navy-300) / <alpha-value>)',
          400: 'rgb(var(--navy-400) / <alpha-value>)',
          500: 'rgb(var(--navy-500) / <alpha-value>)',
          600: 'rgb(var(--navy-600) / <alpha-value>)',
          700: 'rgb(var(--navy-700) / <alpha-value>)',
          800: 'rgb(var(--navy-800) / <alpha-value>)',
          900: 'rgb(var(--navy-900) / <alpha-value>)',
          950: 'rgb(var(--navy-950) / <alpha-value>)',
        },
        // خلفية الصفحة الأساسية والأسطح (البطاقات)
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        // لون داكن ثابت لطبقات التغميق فوق الفيديو/الصور (لا ينقلب في الوضع الداكن)
        ink: '#1D1D1B',
        primary: {
          50: '#FFF6C5',
          100: '#F9E27D',
          200: '#D4AF37',
          300: '#C89B3C',
          400: '#D4AF37',
          500: '#D4AF37',
          600: '#A67C00',
          700: '#A67C00',
          800: '#7A5C00',
          900: '#7A5C00',
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
        sans: ['Cairo', 'system-ui', 'sans-serif'],
        display: ['Cairo', 'system-ui', 'sans-serif'],
        signature: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        gold: '0 8px 24px -6px rgba(212, 175, 55, 0.45), inset 0 1px 0 rgba(255, 246, 197, 0.4)',
        'gold-sm': '0 4px 14px -4px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255, 246, 197, 0.35)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gold-metallic':
          'linear-gradient(145deg, #7A5C00 0%, #A67C00 15%, #C89B3C 30%, #F9E27D 45%, #FFF6C5 50%, #D4AF37 65%, #C89B3C 80%, #7A5C00 100%)',
        'primary-gradient':
          'linear-gradient(145deg, #7A5C00 0%, #A67C00 15%, #C89B3C 30%, #F9E27D 45%, #FFF6C5 50%, #D4AF37 65%, #C89B3C 80%, #7A5C00 100%)',
        'gold-text':
          'linear-gradient(145deg, #FFF6C5 0%, #F9E27D 28%, #D4AF37 52%, #F9E27D 78%, #FFF6C5 100%)',
        'accent-gradient': 'linear-gradient(135deg, #121c2b 0%, #213143 50%, #3f627f 100%)',
        'white-gradient': '#1D1D1B',
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
