/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003049', // Define your custom color here
        primaryhover: '#284757',
        secondary: '#FFCB05', // Optional: You can add more colors if needed
        danger: '#dc3545',
        third: '#FFF0D6',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

