/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        parchment: '#F5F0E6',
        parchmentAlt: '#E8DDC8',
        ink: '#25231F',
        mutedInk: '#625B50',
        peacockBlue: '#155E75',
        peacockDeep: '#0F3D4C',
        peacockTeal: '#167D82',
        peacockGreen: '#315C4C',
        peacockLeaf: '#527A5B',
        antiqueGold: '#B08A4A',
        mutedBronze: '#8C6A3F',
        terracotta: '#9A4F35',
        borderLight: '#CFC3AE',
        midnight: '#171512',
        midnightSurface: '#211E19',
        midnightCard: '#29251F',
        midnightText: '#E9E0D0',
        midnightMuted: '#B7AC9B',
        midnightBorder: '#494238'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Lora"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        manuscript: '0 18px 40px rgba(37, 35, 31, 0.08)'
      },
      backgroundImage: {
        manuscriptTexture: 'radial-gradient(circle at 20% 20%, rgba(176,138,74,0.08), transparent 30%), linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.02))'
      }
    }
  },
  plugins: []
};
