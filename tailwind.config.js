/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Existing colors (maintained for app compatibility)
        primary: '#1a4d2e',
        'primary-dark': '#0f2e1c',

        // New Editorial Palette
        emerald: {
          50: '#F0FDF4',       // Lightest for badges
          100: '#DCFCE7',      // Light border
          200: '#BBF7D0',      // Soft accent
          midnight: '#0A2E23', // Darkest backgrounds
          sacred: '#1B4D3E',   // Primary sections
          forest: '#2D5F4F',   // Mid-tones
          sage: '#4A7C6B',     // Lighter accents
        },
        gold: {
          DEFAULT: '#d4af37',
          antique: '#B8860B',  // Old-world richness
          lantern: '#D4AF37',  // Primary accent
          amber: '#F4A460',    // Glow effects
          highlight: '#FFD700',// Emphasis
          light: '#f0e6d2',
          bronze: '#C59237',   // Bronze-ish Gold
        },
        neutral: {
          moonlight: '#F5F3EE', // Text backgrounds
          pearl: '#FDFBF7',     // Lightest elements
          charcoal: '#1F1F1F',  // Deep text
          ivory: '#E8E6DF',     // Dividers
        },

        // Aliases for existing app components
        cream: '#faf8f3',
        'cream-dark': '#f5f1e8',
        'gold-bright': '#FFD700',
        'gold-highlight': '#FFF9C4',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'], // App UI
        serif: ['Cormorant Garamond', 'serif'], // App Headings
        brand: ['Cinzel', 'serif'], // App Logo
        script: ['Great Vibes', 'cursive'], // App Accents

        // Landing Page Typography
        'landing-heading': ['Playfair Display', 'serif'],
        'landing-subhead': ['Lora', 'serif'],
        'landing-body': ['Source Serif 4', 'serif'],
        'landing-accent': ['Montserrat', 'sans-serif'],

        // Arabic Fonts
        'arabic-calligraphy': ['"Amiri"', 'serif'],
        'arabic-text': ['"Amiri"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shine': 'shine 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shine: {
          '0%': { left: '-100%', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { left: '100%', opacity: '0' },
        }
      }
    },
  },
  safelist: [
    'animate-fade-in',
    'animate-slide-up',
    'animate-pulse-slow',
    'animate-shimmer',
    'animate-float',
    'animate-scale-in',
    'animate-shine',
    'text-gold',
    'text-primary',
    'bg-primary',
    'bg-gold'
  ],
  plugins: [],
}