import { CURRENTUSER } from '../../App/App'
import { GET_USER } from '../../App/Sidebar'
import { Mock } from '../../App/Tests/AppTestMocks'
import { FOLLOWINGPOSTS } from '../../Home/Home'
import { GET_NOTIFICATIONS } from '../../Notifications/Notifications'
import { EDIT_PROFILE } from '../EditProfile'
import { FOLLOW_UNFOLLOW } from '../FollowButton'
import { GETUSER } from '../Profile'

export const ProfileMock: Mock[] = [
  {
    request: {
      query: CURRENTUSER
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
    result: {
      data: {
        "getNotifications": {
          "notifications": [
            {
              "read": true
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
    }
  },
  {
    request: {
      query: FOLLOWINGPOSTS
    },
    result: {
      data: {
        "followsTweets": [
          {
            "content": "A new post...",
            "id": "11706fc0-9a2e-49a3-9948-6b9d1488d114",
            "postDate": "1636280554",
            "author": {
              "name": "Edward Parr",
              "handle": "@ed",
              "profilePic": "/profilePic.jpg"
            },
            "comments": [
              {
                "commentId": "497fd6f2-f92d-4afc-b21e-1cfbc1017389",
                "text": "Hi Ed!",
                "time": "1636632915",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              },
              {
                "commentId": "31f9dc03-5a23-4bb5-b8a9-ba6d39106113",
                "text": "Hi",
                "time": "1636633036",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              },
              {
                "commentId": "3e4d4d5f-dc51-4ff8-8dbb-2d88e1e402d4",
                "text": "Hi ed",
                "time": "1636633207",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              },
              {
                "commentId": "ab95b719-60b2-44be-9b01-1e68fcab379b",
                "text": "hi",
                "time": "1636633457",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              },
              {
                "commentId": "0e8fc576-d412-4759-96ee-79eaa001769d",
                "text": "Cool",
                "time": "1636633500",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              }
            ],
            "likes": [
              {
                "handle": "@ed"
              }
            ],
            "retweets": [
              {
                "handle": "@ed"
              }
            ]
          },
          {
            "content": "hi",
            "id": "59044071-7429-4d73-a192-a8a5ae8502b3",
            "postDate": "1636036053",
            "author": {
              "name": "Edward Parr",
              "handle": "@ed",
              "profilePic": "/profilePic.jpg"
            },
            "comments": [
              {
                "commentId": "35a18460-d1bb-40c9-a198-1837e39b4576",
                "text": "Hi!",
                "time": "1636122897",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              },
              {
                "commentId": "27a7c886-18ba-4289-937e-b9820a72eafe",
                "text": "Hi!",
                "time": "1636632943",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              },
              {
                "commentId": "792ef8a2-3510-4d2c-a13e-6fd3b5bca0b3",
                "text": "Cool.",
                "time": "1636634008",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              }
            ],
            "likes": [
              {
                "handle": "@ed"
              }
            ],
            "retweets": [
              {
                "handle": "@ed"
              }
            ]
          },
          {
            "content": "Hi!",
            "id": "4cd2e6a9-7875-41a3-aed2-7472a8082276",
            "postDate": "1635253839",
            "author": {
              "name": "Edward Parr",
              "handle": "@ed",
              "profilePic": "/profilePic.jpg"
            },
            "comments": [
              {
                "commentId": "ca07351b-3719-4b2c-9412-14bb6c19ba92",
                "text": "Another comment..",
                "time": "1636110794",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              },
              {
                "commentId": "bbd04e5a-c37a-46de-a38e-46b8dae9eba3",
                "text": "Hi!",
                "time": "1636114013",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              },
              {
                "commentId": "77c6efbf-daf5-41ac-8135-144a92e590ca",
                "text": "Hi!",
                "time": "1636632963",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              },
              {
                "commentId": "d62cb915-f671-4e99-9006-3f4aeda415d8",
                "text": "cool.",
                "time": "1636633637",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              }
            ],
            "likes": [
              {
                "handle": "@ed"
              }
            ],
            "retweets": [
              {
                "handle": "@ed"
              }
            ]
          },
          {
            "content": "Hello",
            "id": "6ee2985b-ba42-4159-944f-2d9fc59410cf",
            "postDate": "1634385565",
            "author": {
              "name": "Edward Parr",
              "handle": "@ed",
              "profilePic": "/profilePic.jpg"
            },
            "comments": [
              {
                "commentId": "6790dd9c-0718-4f5c-8112-eba48fc3e988",
                "text": "Hello there",
                "time": "1636114074",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              },
              {
                "commentId": "a6b16753-7d30-458a-a432-e2c8bf8f6904",
                "text": "Welcome to Twitter!",
                "time": "1636634245",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              }
            ],
            "likes": [],
            "retweets": [
              {
                "handle": "@ed"
              }
            ]
          },
          {
            "content": "Another tweet..",
            "id": "de18609f-0346-4f1f-8042-614feeaa4cf3",
            "postDate": "1634303831",
            "author": {
              "name": "Dan Molloy",
              "handle": "@danmolloy",
              "profilePic": "/profilePic.jpg"
            },
            "comments": [
              {
                "commentId": "e5cd36ff-d166-40cf-8763-50387eb318fa",
                "text": "Hello!",
                "time": "1636109413",
                "author": {
                  "name": "Dan Molloy",
                  "handle": "@danmolloy",
                  "profilePic": "/profilePic.jpg"
                }
              }
            ],
            "likes": [
              {
                "handle": "@danmolloy"
              },
              {
                "handle": "@edgar"
              }
            ],
            "retweets": [
              {
                "handle": "@danmolloy"
              }
            ]
          },
          {
            "content": "Hi!",
            "id": "31326ec5-7247-4d7d-9385-80251940c99c",
            "postDate": "1634217714",
            "author": {
              "name": "Dan Molloy",
              "handle": "@danmolloy",
              "profilePic": "/profilePic.jpg"
            },
            "comments": [
              {
                "commentId": "9c0cc323-abec-4c81-92c4-6a7373aa1694",
                "text": "Hi!",
                "time": "1636633653",
                "author": {
                  "name": "Edward Parr",
                  "handle": "@ed",
                  "profilePic": "/profilePic.jpg"
                }
              }
            ],
            "likes": [
              {
                "handle": "@edCarr"
              }
            ],
            "retweets": [
              {
                "handle": "@edCarr"
              },
              {
                "handle": "@edgar"
              }
            ]
          },

        ]
      }
    }
  },
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
        getUserProfileHandle: "@leGuin"
      }
    },
    result: {
      data: {
        "getUserProfile": {
          "name": "Ursula LeGuin",
          "handle": "@leGuin",
          "blurb": "Click Edit Profile!",
          "joinDate": "1637751839",
          "bgPic": "bgPic.jpg",
          "profilePic": "profilePic.jpg",
          "follows": [
            {
              "handle": "@artVandelay",
              "name": "George Costanza",
              "profilePic": "https://upload.wikimedia.org/wikipedia/en/7/70/George_Costanza.jpg"
            },
            {
              "handle": "@danmolloy",
              "name": "Dan Molloy",
              "profilePic": "/dan.jpg"
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
              "content": "A profound love between two people involves, after all, the power and chance of doing profound hurt.",
              "postDate": "1632811931",
              "authorHandle": "@leGuin",
              "author": {
                "name": "Ursula leGuin",
                "handle": "@leGuin",
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