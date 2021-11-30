import { Mock } from '../../App/Tests/AppTestMocks'
import { ALL_USERS } from '../Explore'
import { ExploreUser } from '../../../types'
import { GET_USER } from '../../App/Sidebar'
import { CURRENTUSER } from '../../App/App'
import { FOLLOW_UNFOLLOW } from '../../Profile/FollowButton'

export const user: ExploreUser =  {
  name: "Edgar Poe",
  handle: "@ed",
  blurb: "Hello world",
  profilePic: "profilePic.jpg",
  followers: [{handle: "@dan"}, {handle: "@fizzlekelly"}]
}

let queryCalled = 0

export const ExploreMock: Mock[] = [
  {
    request: {
      query: FOLLOW_UNFOLLOW,
      variables: {
        followHandle: "@danmolloy"
      }
    },
    result: () => {
      return {
      data: {
        "followUnfollowUser": {
          "name": "Dan Molloy",
          "followers": []
        }
      }
    }}
  },
  {
    request: {
      query: CURRENTUSER,
    },
    result: {
      data: {
          "currentUser": {
            "name": "Edward Parr",
            "handle": "@ed",
            "blurb": "Hello there",
            "joinDate": "1632811919",
            "bgPic": "bgPic.jpg",
            "profilePic": "/profilePic.jpg",
            "chats": [
              {
                "content": [
                  {
                    "read": true
                  },
                  {
                    "read": true
                  }
                ]
              },
              {
                "content": [
                  {
                    "read": true
                  }
                ]
              }
            ],
            "follows": [
              {
                "handle": "@ted"
              },
              {
                "handle": "@thebigfirkinband"
              }
            ],
            "followers": [
              {
                "handle": "@egg"
              }
            ],
            "notifications": [
              {
                "id": "c03de202-5c7e-416d-93e8-3d512c72f630",
                "text": "@ed liked your tweet: Hi!",
                "sentFromUser": "@ed",
                "read": true,
                "tweetId": "4cd2e6a9-7875-41a3-aed2-7472a8082276"
              },
              {
                "id": "36cbb9f3-a157-424f-8b55-b24f6207467e",
                "text": "@ed liked your tweet: hi",
                "sentFromUser": "@ed",
                "read": true,
                "tweetId": "59044071-7429-4d73-a192-a8a5ae8502b3"
              }
            ],
            "writtenPosts": [
              {
                "id": "6ee2985b-ba42-4159-944f-2d9fc59410cf",
                "content": "Hello",
                "postDate": "1634385565",
                "likes": null
              },
              {
                "id": "11706fc0-9a2e-49a3-9948-6b9d1488d114",
                "content": "A new post...",
                "postDate": "1636280554",
                "likes": null
              },
              {
                "id": "1d457f07-8da7-4ad3-9dc7-d2e00886fd04",
                "content": "Context.user!",
                "postDate": "1636645080",
                "likes": null
              }
            ]
          }
        }
      }
    },
  {
    request: {
      query: GET_USER
    },
    result: () => {
      return{
      data: {
        "getNotifications": {
          "notifications": [
            {
              "read": false
            }
          ],
          "chats": [
            {
              "content": [
                {
                  "read": true,
                  "authorHandle": "@danmolloy"
                },
                {
                  "read": true,
                  "authorHandle": "@danmolloy"
                },
                {
                  "read": true,
                  "authorHandle": "@danmolloy"
                },
                {
                  "read": true,
                  "authorHandle": "@danmolloy"
                },
                {
                  "read": false,
                  "authorHandle": "@leGuin"
                }
              ]
            }
          ],
          "handle": "@leGuin",
          "profilePic": "profilePic.jpg"
        }
      }
    }}
  },
  {
    request: {
    query: ALL_USERS
  },
    newData: () => { 
      if (queryCalled === 1) {
      queryCalled += 1
      return {
      data: {
        "getAllUsers": [
          {
            "name": "Dan Molloy",
            "handle": "@danmolloy",
            "blurb": "Hi! Click edit profile",
            "profilePic": "/profilePic.jpg",
            "followers": []
          },
          {
            "name": "Fiona Kelly",
            "handle": "@fizzlekelly",
            "blurb": "hello",
            "profilePic": "/fiona.png",
            "followers": [
              {
                "handle": "@danmolloy"
              },
              {
                "handle": "@ed"
              },
              {
                "handle": "@james"
              },
              {
                "handle": "@sean"
              }
            ]
          },
          {
            "name": "Eoghan",
            "handle": "@egg",
            "blurb": "I am an egg",
            "profilePic": "/eoghan.png",
            "followers": [
              {
                "handle": "@danmolloy"
              },
              {
                "handle": "@bob1"
              },
              {
                "handle": "@ed"
              }
            ]
          },
          {
            "name": "The Big Firkin Band",
            "handle": "@thebigfirkinband",
            "blurb": "17-piece jazz big band",
            "profilePic": "/eoghan.png",
            "followers": [
              {
                "handle": "@danmolloy"
              },
              {
                "handle": "@ed"
              }
            ],
          },
        ],
      }
    }} else {
      queryCalled += 1
      return {
        data: {
          "getAllUsers": [
            {
              "name": "Dan Molloy",
              "handle": "@danmolloy",
              "blurb": "Hi! Click edit profile",
              "profilePic": "/profilePic.jpg",
              "followers": [
                {
                  "handle": "@ed"
                }
              ]
            },
            {
              "name": "Fiona Kelly",
              "handle": "@fizzlekelly",
              "blurb": "hello",
              "profilePic": "/fiona.png",
              "followers": [
                {
                  "handle": "@danmolloy"
                },
                {
                  "handle": "@ed"
                },
                {
                  "handle": "@james"
                },
                {
                  "handle": "@sean"
                }
              ]
            },
            {
              "name": "Eoghan",
              "handle": "@egg",
              "blurb": "I am an egg",
              "profilePic": "/eoghan.png",
              "followers": [
                {
                  "handle": "@danmolloy"
                },
                {
                  "handle": "@bob1"
                },
                {
                  "handle": "@ed"
                }
              ]
            },
            {
              "name": "The Big Firkin Band",
              "handle": "@thebigfirkinband",
              "blurb": "17-piece jazz big band",
              "profilePic": "/eoghan.png",
              "followers": [
                {
                  "handle": "@danmolloy"
                },
                {
                  "handle": "@ed"
                }
              ],
            },
          ],
        }
      }
    }
  }
  },
]