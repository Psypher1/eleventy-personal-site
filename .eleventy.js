const { DateTime } = require("luxon");
const { parseISO, format } = require("date-fns");

// Shortcode Imports
const PageHeading = require("./src/_includes/components/PageHeading.js");
const PageSection = require("./src/_includes/components/PageSection.js");

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");

module.exports = function (config) {
  // SYNT
  config.addPlugin(syntaxHighlight);

  // Markdown
  // Add within your config module
  const md = new markdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: true,
  });

  config.addFilter("markdown", (content) => {
    return md.render(content);
  });

  // const markdownOptions = {
  //   html: true,
  //   breaks: false,
  //   linkify: true,
  //   typographer: true,
  // };

  // config.setLibrary("md", markdownIt(markdownOptions));

  // logic for article collection and filter
  config.addCollection("articlez", async () => {
    const endpoint = `https://api.hashnode.com/`;
    const { GraphQLClient, gql } = require("graphql-request");

    const client = new GraphQLClient(endpoint);

    const query = gql`
      {
        user(username: "Psypher1") {
          publication {
            posts {
              title
              coverImage
              brief
              slug
              dateAdded
              contentMarkdown
            }
          }
        }
      }
    `;

    const articles = await client.request(query);

    return articles.user.publication.posts;
  });

  config.addFilter("nextArticle", (articlez, page, modifier = 1) => {
    const parts = page.outputPath.split("/");
    parts.pop(); // get rid of `index.html`
    const slug = parts.pop();
    for (const [index, article] of articlez.entries()) {
      const target = index + modifier;
      if (article.slug === slug && target >= 0 && target < articlez.length) {
        return articlez[target];
      }
    }
  });

  // config.addPassthroughCopy("src/assets/css/**/*");
  config.addPassthroughCopy("src/assets/css/style.css");
  config.addPassthroughCopy("src/assets/js/app.js");

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

  config.addFilter("pubDate", (date) => {
    const dateString = parseISO(date, "yyyy-MM-dd");
    const formattedDate = format(dateString, "dd MMM, yyyy");
    return `${formattedDate}`;
  });

  config.addFilter("articleDate", (date) => {
    return DateTime.fromFormat(date, "yyyy-MM-dd").toFormat("dd MM, yyyy");
  });

  config.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // Page Ordering
  config.addCollection("page", function (collections) {
    return collections.getFilteredByTag("page").sort(function (a, b) {
      return a.data.order - b.data.order;
    });
  });

  // Component / Shortcodes
  config.addShortcode("PageHeading", PageHeading);
  config.addPairedNunjucksShortcode("PageSection", PageSection);

  // YEAR
  config.addShortcode("year", () => `${new Date().getFullYear()}`);

  // shortcode
  // config.addPairedNunjucksShortcode("section", function(
  //   content,
  //   sectionHeading
  // ) {
  //   return `<section class="mt-16">
  //   <h2 class="mb-4 font-headingAlt text-2xl font-semibold text-gray-100 md:text-3xl">${sectionHeading}</h2>
  //   ${content}
  //   </section>`;
  // });

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
