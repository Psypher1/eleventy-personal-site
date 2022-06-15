const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");

// Shortcode Imports
const PageHeading = require("./src/_includes/components/PageHeading.js");
const PageSection = require("./src/_includes/components/PageSection.js");

module.exports = function(config) {
  // config.addPassthroughCopy("src/assets/css/**/*");
  config.addPassthroughCopy("src/assets/css/index.css");

  // Passthroughs
  config.addPassthroughCopy("src/assets/images/**/*");
  config.addPassthroughCopy("src/assets/seo/**/*");
  config.addPassthroughCopy("src/assets/icons");
  config.addPassthroughCopy({ "./src/_fonts": "/fonts" });
  config.addPassthroughCopy({ "./src/assets/resume.pdf": "/resume.pdf" });

  // SEO
  config.addPassthroughCopy({ "./src/assets/robots.txt": "/robots.txt" });

  // FOR SITEMAP
  config.addShortcode("currentDate", (date = DateTime.now()) => {
    return date;
  });

  config.addFilter("articleDate", dateObj => {
    return DateTime.fromJSDate(dateObj)
      .setLocale("uk")
      .toLocaleString(DateTime.DATE_MED);
  });

  // Page Ordering
  config.addCollection("page", function(collections) {
    return collections.getFilteredByTag("page").sort(function(a, b) {
      return a.data.order - b.data.order;
    });
  });

  // Component / Shortcodes
  config.addShortcode("PageHeading", PageHeading);
  config.addPairedNunjucksShortcode("PageSection", PageSection);

  // YEAR
  config.addShortcode("year", () => `${new Date().getFullYear()}`);

  // shortcode
  config.addPairedNunjucksShortcode("section", function(
    content,
    sectionHeading
  ) {
    return `<section class="mt-16">
    <h2 class="mb-4 font-headingAlt text-2xl font-semibold text-gray-100 md:text-3xl">${sectionHeading}</h2>
    ${content}
    </section>`;
  });

  return {
    dir: {
      input: "src",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};

// config.addPlugin(pluginTailwind, {
//   src: 'src/assets/css/*'
// });
