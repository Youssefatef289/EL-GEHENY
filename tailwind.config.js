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
        ink: '#070d16',
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
        gold: '0 10px 40px -10px rgba(212, 175, 55, 0.5)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        // تدرّج ذهبي معدني فاخر
        'primary-gradient':
          'linear-gradient(135deg, #7A5C00 0%, #A67C00 15%, #C89B3C 30%, #F9E27D 45%, #FFF6C5 50%, #D4AF37 65%, #C89B3C 80%, #7A5C00 100%)',
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
