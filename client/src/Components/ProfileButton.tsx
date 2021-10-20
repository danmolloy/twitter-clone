import { User, UserHandles } from "../types"

export const ProfileButton = (props: {
  isCurrentUser: Boolean, 
  currentUser: User | undefined,
  getUserProfile: User | undefined,
  editNameBlurb: Boolean,
  followUnfollowUser: any,
  setEditNameBlurb: any,
  updateProfile: any}) => {
  return (
    <div>
      {props.isCurrentUser && props.editNameBlurb === true 
      ? <button 
        id="edit-profile-btn"
        onClick={() => props.updateProfile()}
        className="font-bold border border-gray-300 bg-twitter-blue text-white rounded-full px-2 my-8 mr-8">
          Save Changes
        </button>
      : props.isCurrentUser 
      ? <button 
        id="edit-profile-btn"
        onClick={() => props.setEditNameBlurb(true)}
        className="font-bold border border-gray-300 rounded-full px-2 my-8 mr-8">
          Edit Profile
        </button> 
      : props.getUserProfile 
      && props.getUserProfile.followers.filter(
        (e: UserHandles) => props.currentUser && e.handle === props.currentUser.handle).length > 0 
          ? <button 
          className="font-bold border border-gray-300 rounded-full py-2 px-4 my-8 mr-8"
          onClick={() => props.followUnfollowUser()}>
            Following
          </button> 
          : <button 
        onClick={() => props.followUnfollowUser()}
        className="font-bold bg-black text-white rounded-full py-2 px-4 my-8 mr-8">
          Follow
        </button>
        }
    </div>
  )
}