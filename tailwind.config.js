/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ef56ef",

          secondary: "#c1ff9b",

          accent: "#a98eed",

          neutral: "#382c3a",

          "base-100": "#2f2d49",
          // "base-300": "#2f2d49",

          info: "#20b0f3",

          success: "#17a17c",

          warning: "#b99804",

          error: "#f6415f",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
