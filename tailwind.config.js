/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [
    function({addUtilities}){
      const newUtilities = { 
        ".scrollbar-thin":{
          scrollbarWidth: "thin",
          scrollbarColor: "red #fff",
          scrollbarWidth:18
        },
        ".scrollbar-webkit":{
          "&::-webkit_scrollbar":{
            width: "18px",
          },
          "&::-webkit-scrollbar-track":{
            background: "red",
          },
          "&::-webkit-scrollbar-thumb":{
            backgroundColor: "rgb(31 41 55)",
            borderRadius: "20px",
            border : "1px solid white",
          }
        }
      }

      addUtilities(newUtilities, ["responsive", "hover"])
    },
],
}

