import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface basicTweet {
  content: string,
  postdate: string,
  retweets: string[],
  likes: number,
  comments: number,
}

export interface basicUser {
    name: string,
    handle: string,
    blurb:  string,
    joinDate: string,
    following: string[],
    followers: string[],
    tweets: basicTweet[]
}

export interface basicState {
  user: basicUser,
  status: 'idle' | 'loading' | 'failed';
}

const initialState = {
  user: {
    name: 'Dan Molloy',
    handle: '@danmolloy',
    blurb:  'musician',
    joinDate: 'November 2020',
    following: ["@fizzlekelly"],
    followers: ["@fizzlekelly"],
    tweets: [
      {
        content: "Another tweet..",
        postdate: "1 Sept 2021",
        retweets: [],
        likes: 1,
        comments: 1,
      },
      {
        content: "Hello World",
        postdate: "1 Aug 2021",
        retweets: [],
        likes: 1,
        comments: 1,
      }
    ]
  },
  status: 'idle'
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {

})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export const {} = userSlice.actions

export default userSlice.reducer