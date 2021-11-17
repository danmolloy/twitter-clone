const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { PrismaClient } = require('@prisma/client')
const { getUser } = require('./utils');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

const prisma = new PrismaClient()

const resolvers = {
  Query,
  Mutation
};

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

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`
    🚀  Server is ready at ${url}
    📭  Query at https://studio.apollographql.com/dev
  `);
});