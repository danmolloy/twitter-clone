import { Mock } from '../../App/Tests/AppTestMocks'
import { FOLLOWINGPOSTS } from '../Home'
import { POST_TWEET } from '../ComposeTweet'
import { LIKE_POST, RETWEET_POST, DELETE_POST } from '../SingleTweet'
import { POST_COMMENT } from '../TweetComments'
import { GETUSER } from '../../Profile/Profile'

export const HomeMock: Mock[] = [
  {
    request: {
      query: FOLLOWINGPOSTS
    },
    result: {
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
          }
        ]
      }
    }
  },
  {
    request: {
      query: POST_TWEET,
      variables: {
        writePostContent: "Hello world"
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
        retweetPostPostId: "cdd85207-d6a0-49b0-9d35-0db9cd6a6fad"
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
        postId: "cdd85207-d6a0-49b0-9d35-0db9cd6a6fad"
      }
    },
    result: {
      data: {
        "deletePost": {
          "id": "cdd85207-d6a0-49b0-9d35-0db9cd6a6fad"
        }
      }
    }
  },
  {
    request: {
      query: POST_COMMENT,
      variables: {
        postId: "cdd85207-d6a0-49b0-9d35-0db9cd6a6fad", 
        text: "Hello world"
      }
    },
    result: {
      data: {
        "newComment": {
          "commentId": null,
          "author": null,
          "time": "1636970945",
          "text": "@ed commented on your tweet: @ed: \"Hello\""
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
      },
      refetch: jest.fn(() => ({
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
                  {
                    "handle": "@ed"
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
      }))
    }
  }
]