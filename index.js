const { ApolloServer } = require('apollo-server');
const typeDefs = require('./type-defs')
const resolvers = require('./resolvers')


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  context: () => {},
  // context: ({req}) => {
  //   console.log('~~~~>>>', req);
  //   return {user: false}
  // },
  typeDefs,
  resolvers
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});