/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JavaScript/TypeScript files in src folder
  ],
  theme: {
    extend: {
      // Extend default theme here if needed
      colors: {
        primary: '#1D4ED8', // Custom primary color example
        secondary: '#9333EA', // Custom secondary color example
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Set a custom font if needed
      },
    },
  },
  plugins: [
    // Add any plugins if required, e.g., forms, typography, etc.
    
    
  ],
};


