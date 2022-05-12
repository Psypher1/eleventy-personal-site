module.exports = function(config) {
  config.addPassthroughCopy("src/assets/css/**/*");

  return {
    dir: {
      input: "src",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};

  // config.addPlugin(pluginTailwind, {
  //   src: 'src/assets/css/*'
  // });
