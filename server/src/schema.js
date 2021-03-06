const {gql} = require('apollo-server')
const typeDefs = gql`

  type Query {
    getAllHandles: [User]
    currentUser: User
    getAllUsers: [User]
    followsTweets: [Post]
    getFollowsUsers: User
    getUserProfile(handle: String!): User
    getPost(postID: String): Post
    getChats: [Chat]
    getChatById(chatId: String!): Chat
    getNotifications: User
    getNotificationList: User
  }

  type Mutation {
    writePost(content: String): Post
    likePost(postID: String): Post
    retweetPost(postID: String): Post
    deletePost(postId: String): Post

    followUnfollowUser(followHandle: String): User
    editProfile(handle: String, userName: String, blurb: String, profilePic: String): User
  
    signUp(handle: String!, password: String!, name: String!): AuthPayload
    login(handle: String!, password: String!): AuthPayload
    deleteUser: User

    newMessage(content: String!, chatId: String!): Message
    readMessages(chatId: String!): BatchPayload
    createOrGetChat(handle: String!): Chat

    readNotifications: BatchPayload
    newComment(postId: String!, text: String!): Comment
  }

  type AuthPayload {
    token: String
    user: User
    newNotification: Notification
    newChat: Chat
    newMessage: Message
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
    chats: [Chat]
    messages: [Message]
    notifications: [Notification]
  }

  type Post {
    id: String!
    content: String
    postDate: String
    author: User
    authorHandle: String
    likes: [User]
    retweets: [User]
    comments: [Comment]
  }

  type Comment {
    commentId: String
    post: Post
    author: User
    postId: String
    authorHandle: String
    time: String
    text: String
  }


  type Chat {
    id: String!
    content: [Message]
    users: [User]
    lastMessageTime: String
  }


  type Message {
    chat: Chat
    chatId: String
    messageId: String
    time: String! 
    author: User
    authorHandle: String
    messageText: String
    read: Boolean
  }

  type BatchPayload {
    count: Int
  }

  type Notification {
    id: String!
    text: String!
    tweetId: String
    time: String!
    notifiedUserHandle: String!
    notifiedUser: User
    sentFromUser: String!
    read: Boolean!
  }

`;

module.exports = typeDefs;