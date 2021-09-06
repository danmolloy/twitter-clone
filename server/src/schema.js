const {gql} = require('apollo-server')

const typeDefs = gql`
  type Query {
    getUsers: [User]
    currentUser(handle: String!): User
    followingPosts(handle: [String!]): [User]
  }

  type User {
    name: String!
    handle: String!
    posts: [Post]
    blurb: String!
    joinDate: String!
    following: [String!]
    followers: [String!]
  }
  type Post {
    id: String!
    content: String!
    postDate: String!
    author: User
  }
`;

module.exports = typeDefs;