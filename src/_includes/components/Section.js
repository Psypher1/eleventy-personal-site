const { html } = require("common-tags");

function Section({ content }) {
  return html`
    <section class="mt-16 border-gray-400 border">
      ${content}
    </section>
  `;
}

module.exports = Section;
