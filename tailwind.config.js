/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBlue: "#00BFFF",
        black2: "#041226",
        black3: "#020c1b",
        blackLight1: "#1c4b91",
        blackLight2: "#173d77",
        veryDarkPink: "#9d174d",
        lightPink: "#f472b6",
        extraDarkPink: "#831843",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
