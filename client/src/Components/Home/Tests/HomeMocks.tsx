import { Mock } from '../../App/Tests/AppTestMocks'
import { FOLLOWINGPOSTS } from '../Home'
import { POST_TWEET } from '../ComposeTweet'
import { LIKE_POST, RETWEET_POST, DELETE_POST } from '../SingleTweet'
import { POST_COMMENT } from '../TweetComments'
import { GETUSER } from '../../Profile/Profile'
import { CURRENTUSER } from '../../App/App'
import { GET_USER } from '../../App/Sidebar'
import { FOLLOWS_UNFOLLOWS } from '../SingleTweet'

let followsTweetsCount = 0;

export const HomeMock: Mock[] = [
  {
    request: {
      query: FOLLOWS_UNFOLLOWS,
      variables: {
        followHandle: "@fizzlekelly"
      }
    },
    result: {
      data: {
        "followUnfollowUser": {
          "name": "@fizzleKelly",
          "followers": {
            "handle": "@ed"
          }
        }
      }
    }
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
              },
              {
                "handle": "@fizzlekelly"
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
      query: FOLLOWINGPOSTS
    },
    newData: () => {
      if (followsTweetsCount === 1 
        || followsTweetsCount === 3 
        || followsTweetsCount === 6 
        || followsTweetsCount ===  8 
        || followsTweetsCount ===  11) {
        followsTweetsCount += 1
        return {
          data: {
            "followsTweets": [
              {
                "content": "I play the flute!",
                "id": "dbc229b2-3c72-470e-b551-9010dbfc334e",
                "postDate": "1632811919",
                "author": {
                  "name": "Fiona Kelly",
                  "handle": "@fizzlekelly",
                  "profilePic": "/fiona.png"
                },
                "comments": [
                  {
                    "commentId": "9ed62305-411f-48c7-992f-99879408a569",
                    "text": "Can I please have lessons?",
                    "time": "1636634234",
                    "author": {
                      "name": "Edward Parr",
                      "handle": "@ed",
                      "profilePic": "/profilePic.jpg"
                    }
                  }, 
                  {
                    "commentId": "12",
                    "text": "Jest wants lessons",
                    "time": "1636634234",
                    "author": {
                      "name": "Jest",
                      "handle": "@jest",
                      "profilePic": "/jest.jpg"
                    }
                  } 
                ],
                "likes": [
                  {
                    "handle": "@danmolloy"
                  },
                  {
                    "handle": "@ed"
                  }
                ],
                "retweets": [
                  {
                    "handle": "@danmolloy"
                  },
                  {
                    "handle": "@ed"
                  }
                ]
              },
              {
                "content": "Jest is tweeting.",
                "id": "14",
                "postDate": "1632811919",
                "author": {
                  "name": "Jest",
                  "handle": "@jest",
                  "profilePic": "/jest.png"
                },
                "comments": [
                  {
                    "commentId": "9ed62305-411f-48c7-992f-99879408a569",
                    "text": "Can I please have lessons?",
                    "time": "1636634234",
                    "author": {
                      "name": "Edward Parr",
                      "handle": "@ed",
                      "profilePic": "/profilePic.jpg"
                    }
                  }, 
                ],
                "likes": [
                ],
                "retweets": [
                ]
              },
            ]
          }
        }
      } else {
        followsTweetsCount += 1
        return {
          data: {
            "followsTweets": [
              {
                "content": "I play the flute!",
                "id": "dbc229b2-3c72-470e-b551-9010dbfc334e",
                "postDate": "1632811919",
                "author": {
                  "name": "Fiona Kelly",
                  "handle": "@fizzlekelly",
                  "profilePic": "/fiona.png"
                },
                "comments": [
                  {
                    "commentId": "9ed62305-411f-48c7-992f-99879408a569",
                    "text": "Can I please have lessons?",
                    "time": "1636634234",
                    "author": {
                      "name": "Edward Parr",
                      "handle": "@ed",
                      "profilePic": "/profilePic.jpg"
                    }
                  }
                ],
                "likes": [
                  {
                    "handle": "@danmolloy"
                  }
                ],
                "retweets": [
                  {
                    "handle": "@danmolloy"
                  }
                ]
              },
              {"content": "My tweet",
                "id": "4",
                "postDate": "1632811919",
                "author": {
                  "name": "Ed Parr",
                  "handle": "@ed",
                  "profilePic": "/ed.png"
                },
                "comments": [],
                "likes": [],
                "retweets": []
              },
            ]
          }
        }
      }
    }
  },
  {
    request: {
      query: POST_TWEET,
      variables: {
        writePostContent: "Jest is tweeting."
      }
    },
    result: {
      data: {
        "writePost": {
          "id": "cdd85207-d6a0-49b0-9d35-0db9cd6a6fad"
        }
      }
    }
  },
  {
    request: {
      query: LIKE_POST,
      variables: {
        likePostPostId: "dbc229b2-3c72-470e-b551-9010dbfc334e"
      }
    },
    result: {
      data: {
        "likePost": {
          "likes": [
            {
              "handle": "@danmolloy"
            }
          ]
        }
      }
    }
  },
  {
    request: {
      query: RETWEET_POST,
      variables: {
        retweetPostPostId: "dbc229b2-3c72-470e-b551-9010dbfc334e"
      }
    },
    result: {
      data: {
        "retweetPost": {
          "retweets": [
            {
              "handle": "@ed"
            }
          ]
        }
      }
    }
  },
  {
    request: {
      query: DELETE_POST,
      variables: {
        postId: "4"
      }
    },
    result: {
      data: {
        "deletePost": {
          "id": "4"
        }
      }
    }
  },
  {
    request: {
      query: POST_COMMENT,
      variables: {
        postId: "dbc229b2-3c72-470e-b551-9010dbfc334e", 
        text: "Jest wants lessons"
      }
    },
    result: {
      data: {
        "newComment": {
          "commentId": "12",
          "author": {
            "name": "Jest",
            "handle": "@jest",
            "profilePic": "jest.jpg"
          },
          "time": "1636970945",
          "text": "Jest wants lessons"
        }
      }
    }
  },
  {
    request: {
      query: GETUSER,
      variables: {
        "getUserProfileHandle": "@fizzlekelly"
      }
    },
    result: {
      data: {
        "getUserProfile": {
          "name": "Fiona Kelly",
          "handle": "@fizzlekelly",
          "blurb": "hello",
          "joinDate": "1632811919",
          "bgPic": "bgPic.jpg",
          "profilePic": "/fiona.png",
          "follows": [],
          "followers": [
            {
              "handle": "@danmolloy",
              "name": "Dan Molloy",
              "profilePic": "/profilePic.jpg"
            },
            {
              "handle": "@ed",
              "name": "Edward Parr",
              "profilePic": "/profilePic.jpg"
            },
            {
              "handle": "@james",
              "name": "James Jamerson",
              "profilePic": "profilePic.jpg"
            },
            {
              "handle": "@sean",
              "name": "Sean Molloy",
              "profilePic": "/profilePic.jpg"
            }
          ],
          "writtenPosts": [
            {
              "id": "dbc229b2-3c72-470e-b551-9010dbfc334e",
              "content": "I play the flute!",
              "postDate": "1632811919",
              "authorHandle": "@fizzlekelly",
              "author": {
                "name": "Fiona Kelly",
                "handle": "@fizzlekelly",
                "profilePic": "/fiona.png"
              },
              "likes": [
                {
                  "handle": "@danmolloy"
                },
              ],
              "comments": [
                {
                  "commentId": "9ed62305-411f-48c7-992f-99879408a569",
                  "text": "Can I please have lessons?",
                  "time": "1636634234",
                  "author": {
                    "name": "Edward Parr",
                    "handle": "@ed",
                    "profilePic": "/profilePic.jpg"
                  }
                }
              ],
              "retweets": [
                {
                  "handle": "@danmolloy"
                }
              ]
            }
          ],
          "retweets": []
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
    }
  },
]