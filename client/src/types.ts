// App

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
}

export interface CurrentUserData {
  currentUser: User
}

export interface CurrentUserVar {
  currentUserHandle: string
}

// Home feed

export interface Post {
  id: string;
  content: string;
  postDate: string;
  likes: UserHandles[]
  retweets: UserHandles[]
}


export interface UserHandles {
  handle: string;
}

// Lists

export interface ListAuthor {
  name: string
  profilePic: string
}

export interface List {
  id: string
  name: string
  picture: string
  description: string
  private: boolean
  authorHandle: string
  author: ListAuthor
  members: UserHandles[]
  followers: UserHandles[]
}

export interface ListData {
  getAuthoredLists: List[]
}

// Profile 

export interface GetUserProfileVar {
  getUserProfileHandle: string;
}

export interface GetUserProfileData {
  getUserProfile: User
}