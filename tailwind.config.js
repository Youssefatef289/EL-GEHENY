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
          50: '#faf6ec',
          100: '#f4ebd2',
          200: '#e9d5a5',
          300: '#dec07f',
          400: '#d4ad58',
          500: '#CAA13F',
          600: '#ad8833',
          700: '#8f6f28',
          800: '#71561f',
          900: '#543f16',
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
        signature: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        gold: '0 8px 24px -6px rgba(202, 161, 63, 0.55), inset 0 1px 0 rgba(255, 246, 213, 0.35)',
        'gold-sm': '0 4px 14px -4px rgba(202, 161, 63, 0.5), inset 0 1px 0 rgba(255, 246, 213, 0.4)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        // تدرّج ذهبي معدني — highlight أعلى يسار + bronze أسفل يمين
        'gold-metallic':
          'linear-gradient(145deg, #FFF6D5 0%, #F0D078 14%, #CAA13F 46%, #A67C22 78%, #7A5C18 100%)',
        'primary-gradient':
          'linear-gradient(145deg, #FFF6D5 0%, #F0D078 14%, #CAA13F 46%, #A67C22 78%, #7A5C18 100%)',
        'gold-text':
          'linear-gradient(145deg, #FFF6D5 0%, #F0D078 24%, #CAA13F 52%, #E8C56A 76%, #CAA13F 100%)',
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
