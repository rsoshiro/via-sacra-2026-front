/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Cores oficiais da paleta.md
        paroquia: {
          purple: '#8E24AA',      // Roxo Títulos
          teal: '#009688',        // Verde Água (Acento)
          dark: '#4A148C',        // Roxo Escuro
          pink: '#E040FB',        // Rosa/Magenta
          bgDark: '#1a052d',      // Um roxo quase preto para o modo Dark
        },
        sepia: {
          50: '#fbf9f5',
          100: '#f7f3eb',
          200: '#efe6d6',
          300: '#e5d4b8',
          800: '#5c4d37',
          900: '#4e4030',
        }
      }
    },
  },
  plugins: [],
}