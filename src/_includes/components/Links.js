const { html } = require("common-tags");

function Links({ link, name }) {
  return html`
    <a href="${link}">${name}</a>
  `;
}

module.exports = Links;
