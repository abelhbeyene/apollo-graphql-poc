const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')

const data = [
    {
        id: "1",
        authorID: "1",
        product: 4,
        body: "Love it!"
    },
    {
        id: "2",
        authorID: "12",
        product: 4,
        body: "Too expensive."
    }
];

const typeDefs = gql`

  type Review {
      id: ID!
      authorID: ID!
      productID: ID!
      body: String!
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    reviews: [Review]
  }
`;

const resolvers = {
    User: {
        reviews(user) {
            console.log('~~~~>>>', user);
            return data.filter(review => review.authorID === user.id);
        }
    }
};

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen(5002).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});