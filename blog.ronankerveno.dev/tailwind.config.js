/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
        // Ajoutez d'autres variantes de police si nécessaire
      },
      height: {
        '15': '3.75rem',
        '21': '5.25rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}