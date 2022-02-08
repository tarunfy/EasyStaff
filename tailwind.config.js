module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
      },
      fontFamily: {
        'Ubuntu' : ['Ubuntu']
      },
      colors: {
          "primary": {
            "50": "#f5f6ff",
            "100": "#ebecff",
            "200": "#cdd0fe",
            "300": "#afb3fd",
            "400": "#737bfc",
            "500": "#3742fa",
            "600": "#323be1",
            "700": "#2932bc",
            "800": "#212896",
            "900": "#1b207b"
        },
          "secondary": {
            "50": "#f4f5f6",
            "100": "#eaeaed",
            "200": "#cacbd2",
            "300": "#aaabb7",
            "400": "#6b6d80",
            "500": "#2b2e4a",
            "600": "#272943",
            "700": "#202338",
            "800": "#1a1c2c",
            "900": "#151724"
        },
          "tertiary": {
            "50": "#feffff",
            "100": "#fefefe",
            "200": "#fcfdfd",
            "300": "#fbfbfb",
            "400": "#f7f8f9",
            "500": "#f4f5f6",
            "600": "#dcdddd",
            "700": "#b7b8b9",
            "800": "#929394",
            "900": "#787879"
        }
      }
    },
  },
  plugins: [],
}
