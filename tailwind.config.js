// TODO tailwind.config
// text-red-primary -> hex value
// text-gray-base -> hex value
// bg-blue-medium -> hex value
// border-gray-primary -> hex value

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fill: (theme) => ({
      red: theme("colors.red.primary"),
    }),
    colors: {
      white: "#ffffff",
      blue: {
        medium: "#005c98",
      },
      black: {
        light: "#262626",
        faded: "#00000059",
        base: "#000000",
      },
      gray: {
        base: "#616161",
        background: "#fafafa",
        primary: "#dbdbdb",
      },
      red: {
        primary: "#ed4956",
      },
    },
    zIndex: { "-10": -10 },
    minHeight: {
      xl: "420px",
      xxl: "488px",
      xxxl: "520px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
  },
  variants: {
    display: ["group-hover"],
  },
  plugins: [],
};
