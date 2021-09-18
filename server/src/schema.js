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
    Messages: [MsgConversation]!
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

  type MsgConversation {
    User: User!
    Messages: [Message]!
    ID: String!
  }

  type Message {
    Content: String!
    DateSent: String!
    Read: Boolean!
  }
`;

module.exports = typeDefs;