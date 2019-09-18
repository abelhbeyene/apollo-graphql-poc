const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Todo {
    userId: Float!
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Post {
    userId: ID
    id: ID
    title: String
    body: String
    comments: [Comments]
  }

  type Comments {
    postId: Float,
    id: ID,
    name: String,
    email: String,
    body: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    todo(id: ID = 1): Todo
    posts: [Post]
    post(id: ID = 1): Post
    comments(postID: ID = 1): [Comments]
  }
`;

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
        todo: (parent, {id}) => {
            return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
                .then(res => res.json())
        },
        post: (parent, {id}) => {
            // console.log('~~~~>>>', parent);
            return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then(res => res.json())
                // .then(json => {
                    
                //     this.comments(this.post, id)
                // })
        },
        posts: (parent) => {
            // console.log('~~~~>>>', parent);
            return fetch(`https://jsonplaceholder.typicode.com/posts`).then(res => res.json())
        },
        comments: (parent, {id = 1}) => {
            console.log('~~~~>>>', parent);
            return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(res => res.json())
        }

    },
};



// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});