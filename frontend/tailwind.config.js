/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c9b067', // Champagne gold
          glow: '#d4af37',
          light: '#ffd700',
          dark: '#735c00',
        },
        surface: {
          DEFAULT: '#14171d', // Slate surface
          dim: '#0f1116',
          bright: '#1f242e',
          lowest: '#08090b', // Obsidian black
          low: '#0d0f12',
          container: '#1e232e',
          high: '#272d3a',
          highest: '#303746',
        },
        secondary: {
          DEFAULT: '#a2a7af', // Titanium grey
          text: '#82878f',
        },
        obsidian: '#08090b',
        platinum: '#f8f9fa',
        titanium: '#a2a7af',
        champagne: '#c9b067',
        slateSurface: '#14171d',
        gold: '#c9b067',
        luxuryBlack: '#08090b',
      },
      fontFamily: {
        serif: ['Tenor Sans', 'sans-serif'], // Map Tenor Sans to serif classes for seamless font swap
        sans: ['Inter', 'sans-serif'],       // Map Inter to sans classes
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-up': 'scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 1.5s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.04)',
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
