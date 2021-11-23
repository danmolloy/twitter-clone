
export interface User {
  name: string;
  handle: string;
  blurb: string;
  joinDate: string;
  bgPic: string;
  profilePic: string;
  follows: UserHandles[];
  followers: UserHandles[];
  writtenPosts: Post[];
  chats: Chat[]
  notifications: Notification[]
  retweets: Post[]
}

export interface Notification {
  id: string;
  text: string;
  sentFromUser: string;
  read: boolean;
  tweetId?: string;
  time: string;
}

export interface Message {
  chat: Chat;
  chatId: string;
  messageId: string;
  time: string;
  author: User;
  authorHandle: string;
  messageText: string;
  read: boolean;
}

export interface Chat {
    id: string;
    content: Message[];
    users: User[];
    lastMessageTime: string;
}

export interface FollowingUser {
  handle: string;
  name: string;
  profilePic: string;
}

export interface ExploreUser {
  name: string;
  handle: string;
  blurb: string;
  profilePic: string;
  followers: UserHandles[];
}

export interface CurrentUserData {
  currentUser: User
}

export interface CurrentUserVar {
  currentUserHandle: string
}

export interface GetUserProfileVar {
  getUserProfileHandle: string;
}

export interface GetUserProfileData {
  getUserProfile: User
}

export interface Author {
  name: string
  handle: string
  profilePic: string
}

export interface Post {
  id: string;
  content: string;
  postDate: number;
  likes: UserHandles[]
  retweets: UserHandles[]
  author: User
  comments? : Comment[]
}

export interface Comment {
  commentId: string;
  post: Post;
  author: User;
  postId: string;
  authorHandle: string;
  time: string;
  text: string;
}

export interface HeaderType {
  pageTitle: string;
  blurb: string;
}

export interface UserHandles {
  handle: string;
}

