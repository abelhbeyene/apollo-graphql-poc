const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'accounts', url: 'http://localhost:5001' },
    { name: 'users', url: 'http://localhost:5002' },
    // more services
  ],
});

const server = new ApolloServer({
  gateway,
  
  // Currently, subscriptions are enabled by default with Apollo Server, however,
  // subscriptions are not compatible with the gateway.  We hope to resolve this
  // limitation in future versions of Apollo Server.  Please reach out to us on
  // https://spectrum.chat/apollo/apollo-server if this is critical to your adoption!
  subscriptions: false,
});

server.listen(5000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});