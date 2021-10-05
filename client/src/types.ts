export interface CurrentUser {
  name: string;
  handle: string;
  blurb: string;
  joinDate: string;
  bgPic: string;
  profilePic: string;
  follows: Follows[];
  followers: Follows[];
  writtenPosts: Post[];
}


export interface Post {
  id: string;
  content: string;
  postDate: string;
  likes: LikesRetweets[]
  retweets: LikesRetweets[]
}


export interface Follows {
  handle: string;
}

export interface LikesRetweets {
  handle: string;
}

export interface CurrentUserData {
  currentUser: CurrentUser
}

export interface CurrentUserVar {
  currentUserHandle: string
}
