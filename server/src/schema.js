const {gql} = require('apollo-server')

const typeDefs = gql`
  type Query {
    getUsers: [User]
    currentUser(handle: String!): User
    followingPosts(handle: [String!]): [User]
  }

  type Mutation {
    createPost(id: String!, 
      content: String!, 
      postDate: String! author: String!): Post
  }

  type User {
    name: String!
    handle: String!
    posts: [Post]!
    blurb: String!
    joinDate: String!
    following: [String!]!
    followers: [String!]!
    bookmarks: [Post]!
    bgPic: String
    profilePic: String
    Lists: [List]!
  }

  type Post {
    id: String!
    content: String!
    postDate: String!
    author: User!
    likes: [User]!
    retweets: [User]!
    comments: [Post]!
  }

  type List {
    ListName: String!
    ListID: String!
    Description: String!
    Private: Boolean!
    Members: [User]!
    Followers: [User]!
    Pinned: Boolean!
    Creator: User!
  }
`;

module.exports = typeDefs;