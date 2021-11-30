import { Mock } from '../../App/Tests/AppTestMocks'
import { GET_CHATS } from '../Messages'
import { GET_CHAT_BY_ID, READ_MESSAGE, NEW_MESSAGE } from '../Chat'
import { GET_FOLLOWING, GET_CREATE_CHAT } from '../SearchUsers'
import { CURRENTUSER } from '../../App/App'
import { GET_USER } from '../../App/Sidebar'

let getNotificationsCount = 0;

export const MessagesMock: Mock[] = [
  {
    request: {
      query: GET_USER
    },
    newData: () => {
      if (getNotificationsCount === 1) {
        getNotificationsCount += 1
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
      getNotificationsCount += 1
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
                    "read": false,
                    "authorHandle": "@danmolloy"
                  },
                  {
                    "read": false,
                    "authorHandle": "@danmolloy"
                  },
                  {
                    "read": false,
                    "authorHandle": "@danmolloy"
                  },
                  {
                    "read": false,
                    "authorHandle": "@danmolloy"
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
      query: GET_CHATS
    },
    result: {
      data: {
        "getChats": [
          {
            "id": "395ed01a-5e12-4220-b94e-ab0bc76a691c",
            "lastMessageTime": "1637751839",
            "users": [
              {
                "handle": "@danmolloy",
                "name": "Dan Molloy",
                "profilePic": "/dan.jpg"
              },
              {
                "handle": "@leGuin",
                "name": "Ursula LeGuin",
                "profilePic": "profilePic.jpg"
              }
            ],
            "content": [
              {
                "time": "1637751839",
                "messageText": "Hi @leGuin! Welcome to Twitter. To get you started, we are following each other. You can unfollow me by navigating to my profile.",
                "authorHandle": "@danmolloy",
                "read": false
              },
              {
                "time": "1637751839",
                "messageText": "Find other users to follow in Explore. You can comment, like and retweet their posts, as well as message them. We have some interesting users here!",
                "authorHandle": "@danmolloy",
                "read": false
              },
              {
                "time": "1637751839",
                "messageText": "Check out your profile - you can view your posts, retweets, and edit some of your user details.",
                "authorHandle": "@danmolloy",
                "read": false
              },
              {
                "time": "1637751839",
                "messageText": "Once finished, you can sign out. Soon afterwards your account will be automatically deleted. Cheers, Dan",
                "authorHandle": "@danmolloy",
                "read": false
              }
            ]
          }
        ]
      }
    }
  },
  {
    request: {
      query: GET_CHAT_BY_ID,
      variables: {
        chatId: "395ed01a-5e12-4220-b94e-ab0bc76a691c"
      }
    },
    result: {
      data: {
        "getChatById": {
          "id": "395ed01a-5e12-4220-b94e-ab0bc76a691c",
          "content": [
            {
              "messageText": "Hi @leGuin! Welcome to Twitter. To get you started, we are following each other. You can unfollow me by navigating to my profile.",
              "authorHandle": "@danmolloy",
              "messageId": "14ae81d6-bb48-41c0-847f-96e63bbe7f05",
              "read": false,
              "author": {
                "name": "Dan Molloy",
                "profilePic": "/dan.jpg"
              }
            },
            {
              "messageText": "Find other users to follow in Explore. You can comment, like and retweet their posts, as well as message them. We have some interesting users here!",
              "authorHandle": "@danmolloy",
              "messageId": "9c516d09-0c28-4070-be1b-a0eecb5ddd48",
              "read": false,
              "author": {
                "name": "Dan Molloy",
                "profilePic": "/dan.jpg"
              }
            },
            {
              "messageText": "Check out your profile - you can view your posts, retweets, and edit some of your user details.",
              "authorHandle": "@danmolloy",
              "messageId": "552b829d-df62-4f36-b439-11da8d290fa0",
              "read": false,
              "author": {
                "name": "Dan Molloy",
                "profilePic": "/dan.jpg"
              }
            },
            {
              "messageText": "Once finished, you can sign out. Soon afterwards your account will be automatically deleted. Cheers, Dan",
              "authorHandle": "@danmolloy",
              "messageId": "9b5a30f5-df02-4001-87e2-714b9448e4cf",
              "read": false,
              "author": {
                "name": "Dan Molloy",
                "profilePic": "/dan.jpg"
              }
            }
          ],
          "users": [
            {
              "handle": "@danmolloy",
              "name": "Dan Molloy",
              "profilePic": "/dan.jpg"
            },
            {
              "handle": "@leGuin",
              "name": "Ursula LeGuin",
              "profilePic": "profilePic.jpg"
            }
          ]
        }
      }
    }
  },
  {
    request: {
      query: READ_MESSAGE,
    variables: {
      chatId: "395ed01a-5e12-4220-b94e-ab0bc76a691c"
      }
    },
    newData: () => {
      return {
        data: {
          "readMessages": {
            "count": 4
          }
        }
      }
    }
  },
  {
    request: {
      query: NEW_MESSAGE,
      variables: {
        content:  "Hi Dan!",
        chatId: "395ed01a-5e12-4220-b94e-ab0bc76a691c"
      }
    },
    result: {
      data: {
        "newMessage": {
          "author": null,
          "messageId": null,
          "messageText": null,
          "read": null,
          "authorHandle": null
        }
      }
    }
  },
  {
    request: {
      query: GET_FOLLOWING
    },
    result: {
      data: {
        "getFollowsUsers": {
          "follows": [
            {
              "name": "Dan Molloy",
              "handle": "@danmolloy",
              "profilePic": "/dan.jpg"
            }
          ]
        }
      }
    }
  },
  {
    request: {
      query: GET_CREATE_CHAT,
      variables: {
        handle:  "@danmolloy"
      }
    },
    result: {
      data: {
        "createOrGetChat": {
          "id": "395ed01a-5e12-4220-b94e-ab0bc76a691c"
        }
      }
    }
  }
]