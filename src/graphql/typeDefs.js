const gql = require('graphql-tag');

module.exports = gql`
  # Query
  type Query {
    getPosts: [Post]
  }

  # Mutation
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }

  # Utils
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
`;
