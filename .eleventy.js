const PageHeading = require("./src/_includes/components/PageHeading.js");
const Section = require("./src/_includes/components/Section.js");
const Links = require("./src/_includes/components/Links.js");

module.exports = function(config) {
  // config.addPassthroughCopy("src/assets/css/**/*");
  config.addPassthroughCopy("src/assets/css/index.css");

  // images
  config.addPassthroughCopy("src/assets/images");

  // fonts pass
  config.addPassthroughCopy({ "./src/_fonts": "/fonts" });

  // page ordering
  config.addCollection("page", function(collections) {
    return collections.getFilteredByTag("page").sort(function(a, b) {
      return a.data.order - b.data.order;
    });
  });

  // component
  config.addShortcode("PageHeading", PageHeading);
  config.addShortcode("Section", Section);
  config.addShortcode("Links", Links);

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
