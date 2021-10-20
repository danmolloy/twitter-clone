import { DocumentNode } from "graphql";
import App, { CURRENTUSER } from "../Components/App";
import { Home, FOLLOWINGPOSTS } from '../Components/Home';
import { GETUSER } from '../Components/Profile'
import { EDIT_PROFILE } from "../Components/ProfileDetails"
import { BOOKMARKS } from '../Components/Bookmarks'
import { LIKE_POST, RETWEET_POST } from '../Components/SingleTweet'
import { LIST_QUERY } from '../Components/Lists'

interface Mock {
  request: {
    query: DocumentNode,
    variables: {}
  },
  error?: any
  result: {
    data: any
  }
}

export const mocks: Mock[] = [
  {
    request: {
      query: CURRENTUSER,
      variables: {
        currentUserHandle: "@danmolloy"
      },
    },
    result: {
      data: {
        "currentUser": {
          "name": "Dan Molloy",
          "handle": "@danmolloy",
          "blurb": "hello world",
          "joinDate": "21 Sept 2021",
          "bgPic": "bgPic.jpg",
          "profilePic": "profilePic.jpg",
          "follows": [
            {
              "handle": "@fizzlekelly"
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
          "writtenPosts": null
        }
      }
    }
    }, 
    {
      request: {
        query: FOLLOWINGPOSTS,
        variables: {
          followsTweetsHandle: "@danmolloy"
        }
      },
      result: {
        data: {
          "followsTweets": [
            {
              "content": "This is a tweet",
              "postDate": "1633026546",
              "id": "f6a55a4a-a833-4296-992e-5c5ffc22c2a7",
              "author": {
                "name": "Dan Molloy",
                "handle": "@danmolloy",
                "profilePic": "profilePic.jpg"
              },
              "likes": [],
              "retweets": []
            },
            {
              "content": "Hi",
              "postDate": "1632926959",
              "id": "d4345c7e-ec51-4448-8ea1-26a08829a412",
              "author": {
                "name": "Dan Molloy",
                "handle": "@danmolloy",
                "profilePic": "profilePic.jpg"
              },
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
            {
              "content": "New tweet!",
              "postDate": "1632926857",
              "id": "cd22a05e-a219-4c64-ab40-6ff19480d433",
              "author": {
                "name": "Dan Molloy",
                "handle": "@danmolloy",
                "profilePic": "profilePic.jpg"
              },
              "likes": [
                {
                  "handle": "@danmolloy"
                }
              ],
              "retweets": []
            },
            {
              "content": "I'm writing a tweet.",
              "postDate": " 1632812946",
              "id": "72335b85-ffdd-477f-aca6-5f5134231852",
              "author": {
                "name": "Dan Molloy",
                "handle": "@danmolloy",
                "profilePic": "profilePic.jpg"
              },
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
            {
              "content": "Live! First Sunday of each month. Venue TBC",
              "postDate": " 1632812919",
              "id": "52ec0146-9436-493c-9ce0-b44084f1ffca",
              "author": {
                "name": "The Big Firkin Band",
                "handle": "@thebigfirkinband",
                "profilePic": "eoghan.png"
              },
              "likes": [
                {
                  "handle": "@fizzlekelly"
                }
              ],
              "retweets": [
                {
                  "handle": "@danmolloy"
                }
              ]
            },
            {
              "content": "I play the flute!",
              "postDate": " 1632811919",
              "id": "dbc229b2-3c72-470e-b551-9010dbfc334e",
              "author": {
                "name": "Fiona Kelly",
                "handle": "@fizzlekelly",
                "profilePic": "fiona.png"
              },
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
      query: LIKE_POST,
      variables: {
        "likePostHandle":"@danmolloy",
        "likePostPostId":"f6a55a4a-a833-4296-992e-5c5ffc22c2a7"
      }
    },
    result: {
      data: {
        "likePost": {
          "id": "f6a55a4a-a833-4296-992e-5c5ffc22c2a7",
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
        "retweetPostHandle": "@danmolloy",
        "retweetPostPostId": "f6a55a4a-a833-4296-992e-5c5ffc22c2a7"
      }
    },
    result: {
      data: {
        "retweetPost": {
          "id": "f6a55a4a-a833-4296-992e-5c5ffc22c2a7",
          "retweets": [
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
      query: GETUSER,
      variables: {
        getUserProfileHandle:"@undefined"
      }
    },
    result: {
      data: {
        "getUserProfile": {
          "name": "Dan Molloy",
          "handle": "@danmolloy",
          "blurb": "hello world",
          "joinDate": "21 Sept 2021",
          "bgPic": "bgPic.jpg",
          "profilePic": "profilePic.jpg",
          "follows": [
            {
              "handle": "@fizzlekelly"
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
          "writtenPosts": [
            {
              "id": "772e3267-8a53-4ccf-a29a-7e40f811622b",
              "content": "fdsa",
              "postDate": "1633448133",
              "authorHandle": "@danmolloy",
              "likes": [
                {
                  "handle": "@danmolloy"
                }
              ],
              "retweets": []
            },
            {
              "id": "bdef33d4-33d4-40bd-bfb0-e711d02f516f",
              "content": "k",
              "postDate": "1633190729",
              "authorHandle": "@danmolloy",
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
            {
              "id": "f6a55a4a-a833-4296-992e-5c5ffc22c2a7",
              "content": "fdlkajfsdfas2erwe",
              "postDate": "1633026546",
              "authorHandle": "@danmolloy",
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
            {
              "id": "d4345c7e-ec51-4448-8ea1-26a08829a412",
              "content": "Hi",
              "postDate": "1632926959",
              "authorHandle": "@danmolloy",
              "likes": [],
              "retweets": [
                {
                  "handle": "@danmolloy"
                }
              ]
            },
            {
              "id": "cd22a05e-a219-4c64-ab40-6ff19480d433",
              "content": "New tweet!",
              "postDate": "1632926857",
              "authorHandle": "@danmolloy",
              "likes": [
                {
                  "handle": "@danmolloy"
                }
              ],
              "retweets": []
            },
            {
              "id": "72335b85-ffdd-477f-aca6-5f5134231852",
              "content": "I'm writing a tweet.",
              "postDate": " 1632812946",
              "authorHandle": "@danmolloy",
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
    }
  },
  {
    request: {
      query: EDIT_PROFILE,
      variables: {
        handle: "@undefined",
        userName: 'Ed Parr',
        blurb: 'Hello world'
      }
    },
    result: {
      data: {
        "editProfile": {
          "name": "Egg Parr",
          "handle": "@ed",
          "blurb": "Hello there"
        }
      }
    }
  },
  {
    request: {
      query: BOOKMARKS,
      variables: {
        currentUserHandle: "@danmolloy"
      }
    },
    result: {
      data: {
        "currentUser": {
          "bookmarks": [
            {
              "content": "Live! First Sunday of each month. Venue TBC",
              "id": "52ec0146-9436-493c-9ce0-b44084f1ffca",
              "postDate": " 1632812919",
              "author": {
                "name": "The Big Firkin Band",
                "handle": "@thebigfirkinband",
                "profilePic": "eoghan.png"
              },
              "likes": [
                {
                  "handle": "@danmolloy"
                },
                {
                  "handle": "@fizzlekelly"
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
    }
  },
  {
    request: {
      query: LIST_QUERY,
      variables: {
        currentUserHandle: "@danmolloy"
      }
    },
    result: {
      data: {
        "getAuthoredLists": [
          {
            "id": "68d30f0d-ebe4-40fa-95d9-458556d6f4c5",
            "name": "My List",
            "picture": "bgPic.jpg",
            "description": "My first list",
            "private": true,
            "authorHandle": "@danmolloy",
            "author": {
              "name": "Dan Molloy",
              "profilePic": "profilePic.jpg"
            },
            "members": [
              {
                "handle": "@egg"
              }
            ],
            "followers": [
              {
                "handle": "@fizzlekelly"
              }
            ]
          }
        ]
      }
    }
  }
];