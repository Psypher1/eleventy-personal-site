require("dotenv").config();

module.exports = async () => {
  const { GraphQLClient, gql } = require("graphql-request");

  const client = new GraphQLClient(process.env.HASHNODE_ENDPOINT);

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
};
