const { html } = require("common-tags");

function PageHeading({ heading, subheading }) {
  return html`
    <h1 class="mb-2 text-4xl font-heading sm:text-4xl md:mb-3 md:text-5xl">
      ${heading}
    </h1>

    <p class="prose text-green-100 prose-base md:prose-lg">
      ${subheading}
    </p>
  `;
}

module.exports = PageHeading;