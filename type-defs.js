const { gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    posts: [Post]
    post(id: ID!): Post
    comments(postID: ID!): [Comment]
  }
  type Post {
    userId: ID
    id: ID
    title: String
    body: String
    comments: [Comment]
  }

  type Comment {
    postId: Float,
    id: ID,
    name: String,
    email: String,
    body: String
    post: Post
  }
`;

module.exports = typeDefs