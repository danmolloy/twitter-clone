import { DocumentNode } from 'graphql';
import { FOLLOWINGPOSTS } from '../../Home/Home';
import { CURRENTUSER } from '../App'
import { DELETE_USER, GET_USER } from '../Sidebar';
import { USER_HANDLES } from '../SignIn';

export interface Mock {
  request: {
    query: DocumentNode,
    variables?: {}
  },
  error?: any
  result?: any
  newData?: any
}

export const userMock: Mock[] = [
  {
    request: {
      query: USER_HANDLES
    },
    result: {
      data: {
        "getAllHandles": [
          {
            "handle": "@artVandelay"
          },
          {
            "handle": "@danmolloy"
          },
          {
            "handle": "@jsbach"
          },
          {
            "handle": "@leGuin"
          },
          {
            "handle": "@watson"
          }
        ]
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
            {
              "content": "New tweet!",
              "id": "cd22a05e-a219-4c64-ab40-6ff19480d433",
              "postDate": "1632926857",
              "author": {
                "name": "Dan Molloy",
                "handle": "@danmolloy",
                "profilePic": "/profilePic.jpg"
              },
              "comments": [
                {
                  "commentId": "9105794b-9a15-4f09-8ce1-5a4bf116cbe7",
                  "text": "Cool.",
                  "time": "1636633742",
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
                  "handle": "@edgar"
                }
              ]
            },
            {
              "content": "I don't eat fish",
              "id": "f96382a1-4701-4fc6-a2fe-60ab62749c4c",
              "postDate": "1632827003",
              "author": {
                "name": "Eoghan",
                "handle": "@egg",
                "profilePic": "/eoghan.png"
              },
              "comments": [
                {
                  "commentId": "7ec84b54-dcbd-4592-b4d6-9dab09d0b3e0",
                  "text": "Same",
                  "time": "1636633749",
                  "author": {
                    "name": "Edward Parr",
                    "handle": "@ed",
                    "profilePic": "/profilePic.jpg"
                  }
                },
                {
                  "commentId": "ba156d42-499c-4c33-bc92-de5ba6a5526c",
                  "text": "lol",
                  "time": "1636735576",
                  "author": {
                    "name": "bob bobs",
                    "handle": "@bob1",
                    "profilePic": "https://yt3.ggpht.com/ytc/AKedOLT2y4hkt_FsZMoIkho6Vn8jFfGacOYxi2XkvuXL=s900-c-k-c0x00ffffff-no-rj"
                  }
                }
              ],
              "likes": [
                {
                  "handle": "@ed"
                },
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
              "id": "52ec0146-9436-493c-9ce0-b44084f1ffca",
              "postDate": "1632812919",
              "author": {
                "name": "The Big Firkin Band",
                "handle": "@thebigfirkinband",
                "profilePic": "/eoghan.png"
              },
              "comments": [
                {
                  "commentId": "b824d020-427b-4de0-a607-a87fff7a897a",
                  "text": "See you there!",
                  "time": "1636634171",
                  "author": {
                    "name": "Edward Parr",
                    "handle": "@ed",
                    "profilePic": "/profilePic.jpg"
                  }
                },
                {
                  "commentId": "2768f9d8-fef5-4c92-b832-faf915f9e441",
                  "text": "What time?",
                  "time": "1636646309",
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
            },
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
    {
      request: {
        query: DELETE_USER
      },
      result: {
        data: {
          "name": "Ed Parr"
        }
      }
    }
  ]
