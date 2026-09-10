/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E00600',
        ink: {
          DEFAULT: '#15171C',
          soft: '#2A2D3A',
        },
        paper: {
          DEFAULT: '#F5F3EE',
          dim: '#ECE9DF',
        },
        muted: '#5B5F6B',
        indigo: {
          DEFAULT: '#3F5EFF',
          dim: '#E7EBFF',
        },
        violet: '#8B5CF6',
        teal: {
          DEFAULT: '#00C2A8',
          dim: '#DFF7F2',
        },
        line: {
          DEFAULT: '#DAD6C9',
          dark: 'rgba(245, 243, 238, 0.16)',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'grad-brand': 'linear-gradient(135deg, #3F5EFF 0%, #8B5CF6 55%, #00C2A8 100%)',
      },
      keyframes: {
        'marquee-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'cta-rotate': {
          'to': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'cta-drift': {
          '0%, 100%': { transform: 'translate(-54%, -52%) scale(1)' },
          '50%': { transform: 'translate(-46%, -48%) scale(1.12)' },
        }
      },
      animation: {
        'marquee-scroll': 'marquee-scroll 32s linear infinite',
        'cta-rotate': 'cta-rotate 18s linear infinite',
        'cta-drift': 'cta-drift 9s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
