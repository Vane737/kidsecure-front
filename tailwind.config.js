/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#12CDD4',
        secondary: '#FFED1A',
        customPink: '#FF6EB0',
        customGreen: '#1BDBB9',
        firstop: '#D5FCFD', // Puedes definir nombres significativos para tus colores personalizados
        customDark: '#555555', // Puedes definir nombres significativos para tus colores personalizados
      },
    },
  },
  plugins: [],
}

