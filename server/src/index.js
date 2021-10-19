const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { PrismaClient } = require('@prisma/client')
const resolvers = require('./resolvers')
const { getUserId } = require('./utils');

const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
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