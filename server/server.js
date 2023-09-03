const express = require('express');
const path = require('path');
// const routes = require('./routes');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const { typeDefs, revolvers } = require('./schemas');
const db = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  revolvers
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.use('/graphql', expressMiddleware(server));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening at http://localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphQL`)
    });
  });

}

startApolloServer();
// app.use(routes);

