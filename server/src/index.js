const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');


const mocks = {
  Query: () => ({
    getUsers: () => [...new Array(6)]
  }),
  User: () => ({
    name: () => 'Dan Molloy',
    handle: () => '@dan',
    posts: () => [...new Array(6)],
    blurb: () => 'Hi everyone!',
    joinDate: () => '5 Sept 2021',
    bgPic: () => 'bgPic.jpg', 
    profilePic: () => 'profilePic.jpg',
  }),
  Post: () => ({
    id: '1',
    content: 'Hello world',
    postDate: '5 Sept 2021'
  }),
  Message: () => ({
    DateSent: '21 Sept 2021'
  })
}

const server = new ApolloServer({
  typeDefs,
  mocks
});

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});