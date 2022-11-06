/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440',
    },
    extend: {
      colors: {
        n4gDarkTeal: '#0d9488',
        n4gMediumTeal: '#14b8a6',
        n4gLightTeal: '#f0fdfa',
        n4gDarkGray: '#374151',
        n4gMediumGray: '#6b7280,',
        n4gLightGray: '#e5e7eb',
      },
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
