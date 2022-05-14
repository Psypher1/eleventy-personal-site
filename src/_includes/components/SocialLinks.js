const { html } = require("common-tags");

function SocialLink({ link, name }) {
  return html`
    <a href="${link}" class="">${name}</a>
  `;
}

module.exports = SocialLink;
