const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Init Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create instance of the Apollo Server
const startApolloServer = async () => {
  await server.start();

  // Install body parsing middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Connect Express server to Apollo server to /graphql endpoint
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  // Serve React build in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Connect to database and Express server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}!`);
      console.log(`Use GraphQL Playground at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
