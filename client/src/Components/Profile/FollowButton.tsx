import { gql, useMutation } from '@apollo/client'
import { ALL_USERS } from '../Explore/Explore'
import { GETUSER } from './Profile'
import { ExploreUser, User } from '../../types'
import { UserHandles } from '../../types'

export const FOLLOW_UNFOLLOW = gql`
  mutation Mutation($followHandle: String) {
    followUnfollowUser(followHandle: $followHandle) {
      name
      followers {
        handle
      }
    }
  }
`;

export const FollowButton = (props: {
    user: ExploreUser | User | undefined,
    currentUserHandle: string | undefined,
  }) => {
  const [followUnfollow, {data, loading, error}] = useMutation(FOLLOW_UNFOLLOW)
  const followUnfollowUser = async() => {
    await followUnfollow({
      variables: {
        followHandle: props.user && props.user.handle
      }, refetchQueries: 
      props.user && window.location.pathname.slice(1) === props.user.handle.slice(1) 
      ? [
        GETUSER,
        'getUserProfile'
      ]
      : [
        ALL_USERS,
        'getAllUsers'
      ]
    })
  }


  return (
    <div className="follow-unfollow-btn">
      {props.user?.followers.filter((i: UserHandles) => i.handle === props.currentUserHandle).length ? 
      <button className="unfollow-btn" onClick={() => followUnfollowUser()}>Unfollow</button>
      : <button className="follow-btn" onClick={() => followUnfollowUser()}>Follow</button>}
    </div>
  )
}