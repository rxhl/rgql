const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

// utils
const { MONGODB, PORT } = require('./src/config');

// models
const Post = require('./src/models/Post');

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

// Every query/subscription must have a resolver
const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

// Set up Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Connect to MongoDB Atlas &&
// Start the Apollo server (uses express under the hood)
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected!');
    return server.listen({ port: PORT });
  })
  .then(res => {
    console.log(`Server running at ${res.url}...`);
  });
