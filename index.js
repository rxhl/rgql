const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

// utils
const { MONGODB, PORT } = require('../src/config');

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

// Every query/subscription must have a resolver
const resolvers = {
  Query: {
    sayHi: () => 'Hello world'
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
