# RGQL

[![Netlify Status](https://api.netlify.com/api/v1/badges/a175aa56-03ae-4352-853c-ef321e9b0ae1/deploy-status)](https://app.netlify.com/sites/rgql/deploys)

**DEMO:** https://rgql.netlify.com/

RGQL is a social media platform with features including:

- Register and login (JWT auth)
- Add/Edit/Delete posts (Context API)
- Like/Unlike posts
- Comment on posts
- Deployed on Heroku/Netlify

## Architecture

| Stack      | Tools                             |
| ---------- | --------------------------------- |
| Frontend   | React, Apollo client, Semantic UI |
| Backend    | Node, GraphQL, Apollo server      |
| Database   | MongoDB (Atlas)                   |
| Cache      | Apollo cache                      |
| Deployment | Netlify, Heroku                   |

RGQL uses a GraphQL server powered by Apollo. The schema is available at `/src/graphql/typeDefs.js`. The frontend connects to this server using the Apollo client. The client uses `useMutation` hook to execute mutations, `InMemoryCache` to store data in client side cache and Context API to create a application-wide state for user authentication.

RGQL also uses Higher-order Component (HoC) to wrap the `Route` component to create protected routes. For styling, all the components are imported from Semantic UI.

## Development

Make sure you have node.js > 9.x.x installed.

```
# 1. Clone the repo
git clone https://github.com/rxhl/rgql.git && cd rgql

# 2. Update env
cp env .env

# 3. Install server libs
npm install

# 4. Start the server
npm run server

# 5. Install client libs
cd client && npm install

# 6. Start the client
npm start
```

## Deployment

#### Server

```
heroku login
heroku create

# If any changes, push to the heroku branch
git add .
git commit
git push heroku master
```

#### Client

First, change the proxy settings in `client/package.json`.

```
"proxy": <Server_App_URL>
```

Then, change the `httpLink` uri to the server app url inside `client/src/ApolloProvider.js`.

Finally, create an account on [Netlify](https://www.netlify.com/). Select `Add new site from git` and follow the instructions.

## Resources

- Classsed
