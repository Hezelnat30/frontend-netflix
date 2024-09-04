/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        netflix: ["Netflix Sans", "sans-serif"],
      },
      colors: {
        red: {
          netflix: "#e50914",
        },
      },
      borderWidth: {
        1.5: "1.5px",
      },
    },
  },
  plugins: [require("daisyui")],
};
