const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

// utils
const { MONGODB, PORT } = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

// Set up Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

// Connect to MongoDB Atlas &&
// Start the Apollo server (uses express under the hood)
mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected!');
    return server.listen({ port: PORT });
  })
  .then(res => {
    console.log(`Server running at ${res.url}...`);
  });
