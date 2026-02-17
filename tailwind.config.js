/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1e40af',
          light: '#3b82f6',
        },
        success: {
          DEFAULT: '#16a34a',
          bg: '#dcfce7',
        },
        danger: {
          DEFAULT: '#dc2626',
          bg: '#fee2e2',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
