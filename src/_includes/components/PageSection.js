const PageSection = (content, sectionHeading) => {
  return `<section role="section" class="mt-16">
    <h2 class="mb-4 font-headingAlt text-2xl font-semibold text-gray-100 md:text-3xl">${sectionHeading}</h2>
    ${content}
    </section>`;
};

module.exports = PageSection;
