import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scanne vos composants React
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#014d2e', // La couleur exacte du footer
      },
      fontFamily: {
        // Assurez-vous d'avoir une police serif comme 'Garamond', 'Times New Roman', etc.
        serif: ['Garamond', 'serif'], 
      },
    },
  },
  plugins: [],
} satisfies Config