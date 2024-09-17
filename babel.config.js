module.exports = {
  presets: [
    [
      "@vue/app",
      {
        useBuiltIns: "entry",
        targets: {
          browsers: ["> 1%", "last 2 versions"]
        }
      }
    ]
  ],
  plugins: ["@babel/plugin-proposal-optional-chaining"]
};
