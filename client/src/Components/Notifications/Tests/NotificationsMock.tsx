import { Mock } from '../../App/Tests/AppTestMocks'
import {GET_NOTIFICATIONS, READ_NOTIFICATIONS} from '../Notifications'

export const NotificationsMock: Mock[] = [
  {
    request: {
      query: GET_NOTIFICATIONS
    },
    result: {
      data: {}
    }
  },
  {
    request: {
      query: READ_NOTIFICATIONS
    },
    result: {
      data: {}
    }
  }
]