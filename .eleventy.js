module.exports = function(config) {
  // config.addPlugin(pluginTailwind, {
  //   src: 'src/assets/css/*'
  // });
  config.addPassthroughCopy("src/assets/css/*");
  return {
    dir: {
      input: "src",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
