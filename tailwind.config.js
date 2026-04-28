/** @type {import('tailwindcss').Config} */
export default {
  content:[
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          900: '#050505', // Pitch black
          800: '#111111', // Very dark gray
          accent: '#E53935', // Classic theater red
          gold: '#D4AF37'    // Cinematic gold
        }
      },
      fontFamily: {
        display:['Syne', 'sans-serif'], // Bold, artistic
        story: ['Lora', 'serif'],        // Elegant, readable
      },
      backgroundImage: {
        'noise': "url('/noise.png')", // We will add CSS grain later
      }
    },
  },
  plugins:[],
}