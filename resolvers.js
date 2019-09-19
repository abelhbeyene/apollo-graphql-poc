const fetch = require('node-fetch');


const fetchComments = (id) => (
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(res => res.json())
)

const fetchPost = (id) => (
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json())
)

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        post: (parent, { id }) => fetchPost(id),
        posts: (parent) => {
            return fetch(`https://jsonplaceholder.typicode.com/posts`).then(res => res.json())
        },
        comments: (parent, { id }) => fetchComments(id)
    },

    Post: {
        comments: (parent) => {
            const { id } = parent
            return fetchComments(id)
        }
    },

    Comment: {
        post: (parent) => fetchPost(parent.id)
    }
};

module.exports = resolvers