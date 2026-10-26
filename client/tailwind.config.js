/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm Floral Palette — from uploaded image
        ivory: {
          DEFAULT: '#FDF5E4',
          50:  '#FFFDF7',
          100: '#FDF5E4',
          200: '#F5E6C8',
          300: '#EDD9A8',
        },
        // Golden Amber (was blush)
        blush: {
          DEFAULT: '#E8A020',
          light: '#FDF0D0',
          50:  '#FEF8E8',
          100: '#FDEEC0',
          200: '#F9D878',
          300: '#F0BB40',
          400: '#E8A020',
          500: '#D08A10',
          600: '#B07208',
        },
        // Burnt Orange (was sage)
        sage: {
          DEFAULT: '#C8581A',
          light: '#FAE8D8',
          50:  '#FDF0E8',
          100: '#F9D8C0',
          200: '#F0A878',
          300: '#E07840',
          400: '#C8581A',
          500: '#A84010',
          600: '#882808',
        },
        // Deep Crimson (was berry)
        berry: {
          DEFAULT: '#8B1A2A',
          light: '#C84060',
          50:  '#F5E8EA',
          100: '#E8C0C8',
          200: '#D08090',
          300: '#C04060',
          400: '#A82840',
          500: '#8B1A2A',
          600: '#6A1020',
          700: '#480810',
        },
        // Warm Cream/Sand (stays as background tones)
        sand: {
          DEFAULT: '#F0C878',
          light: '#FDF5E4',
          50:  '#FFFBF0',
          100: '#FDF0CC',
          200: '#F8D898',
          300: '#F0C060',
          400: '#E8A830',
        },
        // Coral Pink accent
        coral: {
          DEFAULT: '#E07070',
          light: '#FAE0E0',
          50:  '#FDF0F0',
          100: '#F8D0D0',
          200: '#F0A0A0',
          300: '#E87878',
          400: '#E07070',
          500: '#C85050',
          600: '#A83838',
        },
        gold: {
          DEFAULT: '#D4901A',
          light: '#FDF0C8',
          shimmer: '#E8B040',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'romantic': '0 10px 30px -5px rgba(200, 88, 26, 0.22), 0 0 15px -3px rgba(232, 160, 32, 0.15)',
        'luxe':     '0 20px 40px -10px rgba(139, 26, 42, 0.20)',
        'glow':     '0 0 25px rgba(232, 160, 32, 0.40)',
        'soft':     '0 4px 20px rgba(200, 88, 26, 0.12)',
      },
      animation: {
        'float-slow':   'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-soft':   'pulseSoft 3s ease-in-out infinite',
        'shimmer':      'shimmer 2.5s infinite',
        'fade-in':      'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up':     'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'blossom':      'blossom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'petal-fall':   'petalFall linear infinite',
        'petal-sway':   'petalSway ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-12px) rotate(3deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%':      { opacity: 0.88, transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%':   { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        blossom: {
          '0%':   { opacity: 0, transform: 'scale(0) rotate(-20deg)' },
          '60%':  { opacity: 1, transform: 'scale(1.1) rotate(5deg)' },
          '100%': { opacity: 1, transform: 'scale(1) rotate(0deg)' },
        },
        petalFall: {
          '0%':   { transform: 'translateY(-120px) rotate(0deg)',   opacity: 0 },
          '10%':  { opacity: 1 },
          '90%':  { opacity: 0.6 },
          '100%': { transform: 'translateY(110vh) rotate(540deg)', opacity: 0 },
        },
        petalSway: {
          '0%':   { marginLeft: '0px' },
          '100%': { marginLeft: '60px' },
        },
      }
    },
  },
  plugins: [],
}
