const publishedDate = addFilter("pubDate", (date) => {
  const dateString = parseISO(date, "yyyy-MM-dd");
  const formattedDate = format(dateString, "dd MMM, yyyy");
  return `${formattedDate}`;
});

module.exports = publishedDate;
