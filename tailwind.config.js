module.exports = {
  content: ["./src/**/*.{njk,md}", "./src/**/*.svg", "./.eleventy.js"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Magic_Spell", "cursive"],
        headingAlt: ["MedievalSharp", "cursive"],
        body: ["Quattrocento", "serif"]
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp")
  ]
};
