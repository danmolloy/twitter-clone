import { Mock } from '../../App/Tests/AppTestMocks'
import { EDIT_PROFILE } from '../EditProfile'
import { FOLLOW_UNFOLLOW } from '../FollowButton'
import { GETUSER } from '../Profile'

export const ProfileMock: Mock[] = [
  {
    request: {
      query: EDIT_PROFILE,
      variables: {
        handle: "@artVandelay", 
        userName: "Art Vandelay",
        blurb: "Hi my name is Art",
        profilePic: "dan.jpeg"
      }
    },
    result: {
      data: {
        "editProfile" : {
          name: "Art Vandelay",
          blurb: "Hi my name is Art",
          handle: "@artVandelay",
          profilePic: "dan.jpeg"
        }
      }
    }
  },
  {
    request: {
      query: FOLLOW_UNFOLLOW,
      variables: {
        followHandle: "@artVandelay"
      }
    },
    result: {
      data: {
        "followUnfollowUser": {
          "name": "George Costanza",
          "followers": [
            {"handle": "@ted"},
            {"handle": "@undefined"}
          ]
        }
      }
    }
  },
  {
    request: {
      query: GETUSER,
      variables: {
        getUserProfileHandle: "@undefined"
      }
    },
    result: {
      data: {
        "getUserProfile": {
          "name": "George Costanza",
          "handle": "@artVandelay",
          "blurb": "My name is George, I'm unemployed and I live with my parents.",
          "joinDate": "1637590316",
          "bgPic": "bgPic.jpg",
          "profilePic": "https://upload.wikimedia.org/wikipedia/en/7/70/George_Costanza.jpg",
          "follows": [
            {
              "handle": "@egg",
              "name": "Eoghan",
              "profilePic": "/eoghan.png"
            }
          ],
          "followers": [
            {
              "handle": "@danmolloy",
              "name": "Dan Molloy",
              "profilePic": "/dan.jpg"
            }
          ],
          "writtenPosts": [
            {
              "id": "51195034-c503-418d-92e6-9588946dbe04",
              "content": "It's not a lie if you believe it.",
              "postDate": "1632811931",
              "authorHandle": "@artVandelay",
              "author": {
                "name": "George Costanza",
                "handle": "@artVandelay",
                "profilePic": "https://upload.wikimedia.org/wikipedia/en/7/70/George_Costanza.jpg"
              },
              "likes": [],
              "comments": [],
              "retweets": []
            }
          ],
          "retweets": []
        }
      }
    }
  }
]