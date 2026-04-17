/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981', // emerald-500
          dark: '#059669',    // emerald-600
        },
        success: '#22c55e',
        muted: '#64748b',
        foreground: '#0f172a',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        '3d': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 5px 15px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.01)',
        '3d-primary': '0 20px 40px -10px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
}

