/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F8F1EC',
          50: '#FDFCFB',
          100: '#F8F1EC',
          200: '#EDE2D7',
          300: '#E2D3C2',
        },
        blush: {
          DEFAULT: '#DDA6B2',
          light: '#F8E9ED',
          50: '#FAF0F2',
          100: '#F5E1E6',
          200: '#EEC2CC',
          300: '#E5A5B3',
          400: '#DDA6B2',
          500: '#CB8896',
          600: '#B66A7A',
        },
        sage: {
          DEFAULT: '#A7B9A0',
          light: '#EBF1EA',
          50: '#F3F6F2',
          100: '#E4ECE2',
          200: '#CCDCC8',
          300: '#B9CCB4',
          400: '#A7B9A0',
          500: '#8A9F82',
          600: '#6E8267',
        },
        berry: {
          DEFAULT: '#754D58',
          light: '#A37582',
          50: '#F5EEF0',
          100: '#E5D3D7',
          200: '#CCA8B1',
          300: '#B07E8C',
          400: '#955F6E',
          500: '#754D58',
          600: '#5A3842',
          700: '#432630',
        },
        sand: {
          DEFAULT: '#E8D9C5',
          light: '#F8F4EE',
          50: '#FBF9F6',
          100: '#F4ECE1',
          200: '#E8D9C5',
          300: '#D8C3A8',
          400: '#C7AC8B',
        },
        gold: {
          DEFAULT: '#CBB26B',
          light: '#F5ECCB',
          shimmer: '#DFCA88',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'romantic': '0 10px 30px -5px rgba(221, 166, 178, 0.25), 0 0 15px -3px rgba(167, 185, 160, 0.15)',
        'luxe': '0 20px 40px -10px rgba(117, 77, 88, 0.18)',
        'glow': '0 0 25px rgba(221, 166, 178, 0.45)',
        'soft': '0 4px 20px rgba(167, 185, 160, 0.15)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.88, transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
