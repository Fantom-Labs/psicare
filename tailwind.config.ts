import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#5B4CF5',
          secondary: '#7C6FF7',
        },
        'bg-base': '#F8F7FF',
        'mood-1': '#EF4444',
        'mood-2': '#F97316',
        'mood-3': '#F59E0B',
        'mood-4': '#22C55E',
        'mood-5': '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 30px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.08)',
        'mood-selected': '0 4px 30px rgba(91, 76, 245, 0.25)',
        'purple-card': '0 4px 20px rgba(91, 76, 245, 0.08)',
        'check-done': '0 2px 8px rgba(91, 76, 245, 0.4)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config
