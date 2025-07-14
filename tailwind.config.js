/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#030014",
          200: "#0F0D23",
          300: "#151312",
          400: "#AB8BFF",
          500: "#9CA4AB",
          600: "#FAF9F7",
          700: "#D1C0FF",
          800: "#221F3D",
          900: "#A8B5DB"
        },
        secoundry: {
          100: "#D6C7FF",
          200: "#121212"
        }
      }
    },
  },
  plugins: [],
}

