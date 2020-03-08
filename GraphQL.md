## GraphQL Basics

Some thoughts about my understanding with GraphQL.

1. Every GraphQL server has a schema and a resolver.
2. The schema and resolver mirror each other, every item in the schema must have a resolver.
3. The schemas are nothing but GraphQL's own SDL whereas the resolvers are the implementations. In other words, schema is function signature whereas resolver is the function implementation.
4. Schemas (and resolvers) have root types - Query, Mutation and Subscription. The fields on the root types are called root fields.

```
type Query {
  users: [User!]!
  user(id: ID!): User
}

type Mutation {
  createUser(name: String!): User!
}

type User {
  id: ID!
  name: String!
}
```

### Resources

[HowToGraphQL](https://www.howtographql.com/basics/0-introduction/)
