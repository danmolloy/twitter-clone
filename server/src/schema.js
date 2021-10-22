const {gql} = require('apollo-server')

const typeDefs = gql`
  type Query {
    currentUser: User
    followsTweets(handle: String!): [Post]
    getUserProfile(handle: String!): User
    getPost(postID: String): Post
    getAuthoredLists(handle: String): [List]
    loggedInUser: User
  }

  type Mutation {
    writePost(content: String, authorHandle: String): Post
    bookmarkPost(postID: String, handle: String): Post
    likePost(handle: String, postID: String): Post
    retweetPost(handle: String, postID: String): Post
    deletePost(postId: String): Post
    followUnfollowUser(followHandle: String, currentUserHandle: String): User
    editProfile(handle: String, userName: String, blurb: String): User
    signUp(handle: String!, password: String!, name: String!): AuthPayload
    login(handle: String!, password: String!): AuthPayload
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    name: String!
    handle: String!
    blurb: String!
    joinDate: String!
    bgPic: String
    profilePic: String
    follows: [User]
    followers: [User]
    writtenPosts: [Post]
    likedPosts: [Post]
    retweets: [Post]
    bookmarks: [Post]
  }

  type Post {
    id: String!
    content: String!
    postDate: String!
    author: User!
    authorHandle: String!
    likes: [User]
    retweets: [User]
    bookmarks: [User]
  }

  type List {
    id: String!
    name: String!
    picture: String!
    description: String!
    private: Boolean!
    authorHandle: String!
    author: User!
    members: [User] 
    followers: [User]
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