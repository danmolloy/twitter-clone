import { gql, useMutation } from '@apollo/client'

export const FOLLOW_UNFOLLOW = gql`
  mutation Mutation($followHandle: String, $currentUserHandle: String) {
    followUnfollowUser(followHandle: $followHandle, currentUserHandle: $currentUserHandle) {
      name
      followers {
        handle
      }
    }
  }
`;

export const FollowButton = (props: {
    user: any,
    currentUserHandle: string | undefined,
    refetch: any
  }) => {
  const [followUnfollow, {data, loading, error}] = useMutation(FOLLOW_UNFOLLOW)
  const followUnfollowUser = async() => {
    await followUnfollow({
      variables: {
        followHandle: props.user && props.user.handle, 
        currentUserHandle: props.currentUserHandle && props.currentUserHandle
      }})
  }

  return (
    <div>
      {props.user.followers.filter((i: any) => i.handle === "@danmolloy").length ? 
      <button className="unfollow-btn" onClick={() => followUnfollowUser()}>Unfollow</button>
      : <button className="follow-btn" onClick={() => followUnfollowUser()}>Follow</button>
    }
    </div>
  )
}