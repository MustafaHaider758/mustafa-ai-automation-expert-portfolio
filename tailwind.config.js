/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:       '#f9f8f5',
        'bg-2':   '#f0eee8',
        'bg-card':'#ffffff',
        ink:      '#141412',
        muted:    '#6e6b62',
        accent:   '#ff7a18',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
      },
    },
  },
  plugins: [],
}
