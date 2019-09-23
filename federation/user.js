const { ApolloServer, gql } = require('apollo-server')
const {buildFederatedSchema} = require('@apollo/federation')

const data = [
    {id: 1, username: 'abelb'},
    {id: 2, username: 'testuname'}
]

const typeDefs = gql`
  type Query {
    me: User
  }


  type User @key(fields: "id") {
    id: ID!
    username: String
  }
`;

const resolvers = {
  Query: {
    me() {
      return data[0]
    }
  }
};

const server = new ApolloServer({

  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen(5001).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});