import { Mock } from '../../App/Tests/AppTestMocks'
import { GET_CHATS } from '../Messages'
import { GET_CHAT_BY_ID, READ_MESSAGE, NEW_MESSAGE } from '../Chat'
import { GET_FOLLOWING, GET_CREATE_CHAT } from '../SearchUsers'

export const MessagesMock: Mock[] = [
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
    result: {
      data: {
        "readMessages": {
          "count": 4
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
        "currentUser": {
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