# GraphQL Basics

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

In the above example, the root types are `Query` and `Mutation`, and the root fields are `user`, `users` and `createUser`.

5. Every resolver function recieves four arguments - parent, args, context and info.

```
Mutation: {
  post: (parent, args, context, info) => {
    // Do something here...
  }
}

a. Parent - Result of the previous resolver execution level
b. args - Arguments passed by the user
c. context - Used for accessing request headers
d. info - ???
```

6. Every GraphQL query is a POST request in the end of the day and can be invoked from any cURL-like client.

```
POST localhost:5000
{
  query: "mutation{ post(postid: \"k87dsj1sd7h\"){ id post createdAt } }"
}
```

## Resources

- [HowToGraphQL](https://www.howtographql.com/basics/0-introduction/)
