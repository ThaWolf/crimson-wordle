/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        draconic: {
          red: '#DC2626',
          black: '#000000',
          gray: '#374151',
          'light-red': '#FEE2E2',
          gold: '#F59E0B',
        }
      },
      fontFamily: {
        'draconic': ['Cinzel', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'scale-in': 'scaleIn 0.3s ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
