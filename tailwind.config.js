/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        n4gDarkTeal: '#0d9488',
        //n4gMediumTeal: '#14b8a6',
        n4gMediumTeal: '#24a1ba',
        //n4gLightTeal: '#f0fdfa',
        n4gLightTeal: '#bbd2d6',
        n4gDarkGray: '#374151',
        n4gMediumGray: '#6b7280,',
        n4gLightGray: '#e5e7eb',
        n4gRed: '#cc3835',
        n4gOrange: '#e5a144',
        n4gGray: '#d7dedb',
        n4gWhite: '#ffffff',
        n4gBlack: '#000000',
        n4gGreen: '#107942',
      },
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  safelist: [{
    pattern: /bg-+/, //
  }]
}
