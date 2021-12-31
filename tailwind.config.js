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
        light: "#113CFC",
        extraLight: "#A2D2FF",
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
        light: "#C9CCD5",
        extraLight: "#E6E6E6",
      },
      red: {
        primary: "#ed4956",
      },
    },
    zIndex: { "-10": -10 },
    minHeight: {
      x: "300px",
      xl: "420px",
      xxl: "488px",
      xxxl: "520px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      extraLg: "1200px",
    },
    minWidth: {
      xl: "420px",
      xxl: "488px",
      xxxl: "520px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      450: "450px",
    },
    maxHeight: {
      1200: "1200px",
    },
    maxWidth: {
      450: "450px",
    },
    boxShadow: {
      base: "3px 6px 6px rgba(0,0,0,0.1)",
      primary: "2px 4px 4px rgba(0,0,0,0.1)",
    },
    height: {
      65: "65vh",
      70: "70vh",
      80: "80vh",
      85: "85vh",
    },
    width: {
      70: "70%",
      60: "60%",
      95: "95%",
    },
  },
  variants: {
    display: ["group-hover"],
  },
  plugins: [],
};
