import { Mock } from '../../App/Tests/AppTestMocks'
import {GET_NOTIFICATIONS, READ_NOTIFICATIONS} from '../Notifications'
import { CURRENTUSER } from '../../App/App'
import { GET_USER } from '../../App/Sidebar'
import { GETUSER } from '../../Profile/Profile'

let getNotificationsCalled = 0;
let sidebarCalled = 0;

export const NotificationsMock: Mock[] = [
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
        query: GET_NOTIFICATIONS
      },
      newData: () => {
        getNotificationsCalled += 1
        if(getNotificationsCalled === 5) {
          return {
            data: {
                "getNotificationList": {
                  "handle": "@leGuin",
                  "notifications": [
                    {
                      "id": "17ffafa4-d6b5-4684-8b58-37584a62d605",
                      "text": "@danmolloy has started following you.",
                      "time": "1637751839",
                      "sentFromUser": "@danmolloy",
                      "read": true,
                      "tweetId": null
                    }
                  ]
                }
              }
            }
        }
        else {
          return {
            data: {
                "getNotificationList": {
                  "handle": "@leGuin",
                  "notifications": [
                    {
                      "id": "17ffafa4-d6b5-4684-8b58-37584a62d605",
                      "text": "@danmolloy has started following you.",
                      "time": "1637751839",
                      "sentFromUser": "@danmolloy",
                      "read": false,
                      "tweetId": null
                    }
                  ]
                }
              }
            }
        }
        }
      },
      {
        request: {
          query: GET_USER
        },
        newData: () => {
          sidebarCalled += 1
          if (sidebarCalled == 5) {
            return {
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
          } else {
            return {
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
          }
        }
      },
  {
    request: {
      query: READ_NOTIFICATIONS
    },
    result: {
      data: {
        "readNotifications": {
          "count": 1
        }
      }
    }
  },
  {
    request: {
      query: GETUSER,
      variables: {
        "getUserProfileHandle":"@danmolloy"
      }
    },
    result: {
      "data": {
        "getUserProfile": {
          "name": "Dan Molloy",
          "handle": "@danmolloy",
          "blurb": "I call it 'Twitter'.",
          "joinDate": "1632811919",
          "bgPic": "bgPic.jpg",
          "profilePic": "/dan.jpg",
          "follows": [
            {
              "handle": "@artVandelay",
              "name": "George Costanza",
              "profilePic": "https://upload.wikimedia.org/wikipedia/en/7/70/George_Costanza.jpg"
            },
            {
              "handle": "@leGuin",
              "name": "Ursula LeGuin",
              "profilePic": "profilePic.jpg"
            },
            {
              "handle": "@tony",
              "name": "Tony Pepperoni",
              "profilePic": "profilePic.jpg"
            }
          ],
          "followers": [
            {
              "handle": "@artVandelay",
              "name": "George Costanza",
              "profilePic": "https://upload.wikimedia.org/wikipedia/en/7/70/George_Costanza.jpg"
            },
            {
              "handle": "@jsbach",
              "name": "JS Bach",
              "profilePic": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg"
            },
            {
              "handle": "@leGuin",
              "name": "Ursula LeGuin",
              "profilePic": "profilePic.jpg"
            },
            {
              "handle": "@tony",
              "name": "Tony Pepperoni",
              "profilePic": "profilePic.jpg"
            }
          ],
          "writtenPosts": [
            {
              "id": "294465ac-a384-483c-acc1-6d2d9d132742",
              "content": "I recently joined Dulwich Squash Club. What a hoot!",
              "postDate": "1632811920",
              "authorHandle": "@danmolloy",
              "author": {
                "name": "Dan Molloy",
                "handle": "@danmolloy",
                "profilePic": "/dan.jpg"
              },
              "likes": [],
              "comments": [
                {
                  "commentId": "26900e89-808a-4c21-8733-979aaca9660c",
                  "text": "Fancy a match?",
                  "time": "1632812020",
                  "author": {
                    "name": "JS Bach",
                    "handle": "@jsbach",
                    "profilePic": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg"
                  }
                }
              ],
              "retweets": []
            }
          ],
          "retweets": [
            {
              "id": "51195034-c503-418d-92e6-9588946dbe04",
              "content": "It's not a lie if you believe it.",
              "postDate": "1632811931",
              "author": {
                "name": "George Costanza",
                "handle": "@artVandelay",
                "profilePic": "https://upload.wikimedia.org/wikipedia/en/7/70/George_Costanza.jpg"
              }
            }
          ]
        }
      }
    }

  }
]