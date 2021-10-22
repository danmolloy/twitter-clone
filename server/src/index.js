const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { PrismaClient } = require('@prisma/client')
const resolvers = require('./resolvers')
const { getUser } = require('./utils');

const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      user:
        req && req.headers.authorization
          ? getUser(req)
          : null
    }
  },
  introspection: true
});

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});