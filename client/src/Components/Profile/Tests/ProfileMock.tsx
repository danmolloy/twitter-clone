import { Mock } from '../../App/Tests/AppTestMocks'
import { EDIT_PROFILE } from '../EditProfile'
import { FOLLOW_UNFOLLOW } from '../FollowButton'
import { GETUSER } from '../Profile'

export const ProfileMock: Mock[] = [
  {
    request: {
      query: EDIT_PROFILE
    },
    result: {
      data: {
      }
    }
  },
  {
    request: {
      query: FOLLOW_UNFOLLOW
    },
    result: {
      data: {
      }
    }
  },
  {
    request: {
      query: GETUSER
    },
    result: {
      data: {}
    }
  },
  {
    request: {
      query: EDIT_PROFILE
    },
    result: {
      data: {}
    }
  }
]