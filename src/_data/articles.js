require("dotenv").config();

const endpoint = `https://api.hashnode.com/`;

module.exports = async () => {
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

  console.log(articles);

  return articles.user.publication.posts;
};
