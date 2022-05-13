module.exports = function(config) {
  // config.addPassthroughCopy("src/assets/css/**/*");
  config.addPassthroughCopy("src/assets/css/index.css");

  // images
  config.addPassthroughCopy("src/assets/images");

  // fonts pass
  config.addPassthroughCopy({ "./src/_fonts": "/fonts" });

  config.addCollection("page", function(collections) {
    return collections.getFilteredByTag("page").sort(function(a, b) {
      return a.data.order - b.data.order;
    });
  });

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
