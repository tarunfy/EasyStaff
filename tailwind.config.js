module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        custom2:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;",
        custom3: "4px 4px 0px #212121",
      },
      height: {
        128: "32rem",
      },
      width: {
        128: "32rem",
      },
      colors: {
        primary: {
          50: "#f5f6ff",
          100: "#ebecff",
          200: "#cdd0fe",
          300: "#afb3fd",
          400: "#737bfc",
          500: "#3742fa",
          600: "#323be1",
          700: "#2932bc",
          800: "#212896",
          900: "#1b207b",
          1000: "#0B1121",
          1100: "#0C243A",
        },
        secondary: {
          50: "#f4f5f6",
          100: "#eaeaed",
          200: "#cacbd2",
          300: "#aaabb7",
          400: "#6b6d80",
          500: "#2b2e4a",
          600: "#272943",
          700: "#202338",
          800: "#1a1c2c",
          900: "#151724",
        },
        tertiary: {
          50: "#feffff",
          100: "#fefefe",
          200: "#fcfdfd",
          300: "#fbfbfb",
          400: "#f7f8f9",
          500: "#f4f5f6",
          600: "#dcdddd",
          700: "#b7b8b9",
          800: "#929394",
          900: "#787879",
        },
        quadtiary: {
          50: "#f6f2ff",
          100: "#ede6ff",
          200: "#d2bfff",
          300: "#b799ff",
          400: "#824dff",
          500: "#4c00ff",
          600: "#4400e6",
          700: "#3900bf",
          800: "#2e0099",
          900: "#25007d",
        },
      },
      animation: {
        "gradient-x": "gradient-x 6s ease-in-out infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};
