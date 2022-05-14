const { html } = require("common-tags");

function Section({ content }) {
  return html`
    <section class="mt-16">
      ${content}
    </section>
  `;
}

module.exports = Section;
