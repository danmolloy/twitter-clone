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
      data: {}
    }
  },
  {
    request: {
      query: GET_CHAT_BY_ID,
      variables: {
        /* chatId:  */
      }
    },
    result: {
      data: {}
    }
  },
  {
    request: {
      query: READ_MESSAGE,
    variables: {
      /*chatId: */
    }
    },
    result: {
      data: {}
    }
  },
  {
    request: {
      query: NEW_MESSAGE,
      variables: {
        /* content:  ,
        chatId:  */
      }
    },
    result: {
      data: {}
    }
  },
  {
    request: {
      query: GET_FOLLOWING
    },
    result: {
      data: {}
    }
  },
  {
    request: {
      query: GET_CREATE_CHAT,
      variables: {
        /* handle:  */
      }
    },
    result: {
      data: {}
    }
  }
]