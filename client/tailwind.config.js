module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        indigo: { A700_19: "#0042fc19", A700: "#0042fc", A100_01: "#96a3fe", A100: "#96a3fe" },
        blue: { 800: "#1a48d3", A700: "#2761ff", A700_10: "#2761ff" },
        white: { A700: "#ffffff", A700_99: "#ffffff99", A700_12: "#ffffff" },
        green: { A700: "#00ff00", A700_99: "#00ff0099", A700_12: "#00ff0012" },
        black: {
          "900_99": "#00000099",
          "900_60": "#00000060",
          "900_dd": "#000000dd",
          "900_1e": "#0000001e",
          "900_99_10": "#00000099",
          "900_dd_10": "#000000dd",
          "900_60_12": "#00000060",
        },
        gray: { 200: "#f0f0f0", 300: "#e0e0e0", 500: "#9f9f9f", 700: "#6a6a6a", 900: "#262626", "900_01": "#161c26" },
        blue_gray: { 100: "#d9d9d9", "900_19": "#2b2b2b19", "900_19_12": "#2b2b2b19", "900_19_11": "#2b2b2b19" },
        deep_purple: { 900: "#0000c0", "900_03": "#0000c0" },
        green: { 700: "#2a8d36", "700_03": "#2a8d36" },
        red: { 900: "#b00020", "900_03": "#b00020" },
        colors: "#ffff",
        colors1: "#",
        colors2: "#417505",
      },
      boxShadow: {
        xs: "0px 0px  3px 0px #0000002b",
        sm: "0px 0px  3px 0px #0000002b",
        md: "-1px 0px  2px 0px #00000026",
        lg: "-4px -4px  35px 0px #00000011",
        xl: "4px 4px  35px 0px #00000011",
      },
      fontFamily: {
        inter: "Inter",
        roboto: "Roboto",
        robotoflex: "Roboto Flex",
        urbanist: "Urbanist",
        montserrat: "Montserrat",
      },
      backgroundImage: { gradient: "linear-gradient(180deg, #ffffff00,#000000)" },
      opacity: { 0.7: 0.7, 0.5: 0.5 },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};