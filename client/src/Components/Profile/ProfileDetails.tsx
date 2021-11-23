import { useMutation, gql } from "@apollo/client"
import { CalendarIcon, UserCircleIcon } from "@heroicons/react/outline"
import { User } from "../../types"
import { ProfileFollowers } from "./ProfileFollowers"
import fromUnixTime from 'date-fns/fromUnixTime'
import { EditProfile } from './EditProfile'
import { FollowButton } from "./FollowButton"

export const EDIT_PROFILE = gql`
mutation Mutation($handle: String, $userName: String, $blurb: String, $profilePic: String) {
  editProfile(handle: $handle, userName: $userName, blurb: $blurb, profilePic: $profilePic) {
    name
    blurb
    handle
    profilePic
  }
}
`;

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

export const ProfileDetails = (props: {
  getUserProfile: User | undefined,
  currentUser: User | undefined,
  profileHandle: string
}) => {


  return (
    <div id="profile-details" className="w-full h-3/5 ">
        <img id="profile-banner" alt="Default profile background photo" className="w-full h-48" src={`/${props.getUserProfile?.bgPic}`}/>
        <div className="flex flex-row justify-between">
          {props.getUserProfile?.profilePic ?
            <img src={props.getUserProfile.profilePic} alt={`Profile picture of ${props.getUserProfile.name}`} className="rounded-full w-36 h-auto ml-4 -mt-12 -p border-4 border-white"/> :
            <UserCircleIcon className="w-28 h-auto ml-12 -mt-12 border -p rounded-full"/>}
        {props.profileHandle === props.currentUser?.handle.slice(1) 
        ? <EditProfile />
        : <FollowButton currentUserHandle={props.currentUser?.handle} user={props.getUserProfile}/>
      }
        </div>
        <div className="flex flex-col w-4/5 sm:w-2/5 ml-12">
          <h3 className="font-bold text-xl">
            {props.getUserProfile?.name}
          </h3>
          <p className="text-gray-600 text-sm">
            {props.getUserProfile?.handle}
          </p>
          <p className="my-2">
            {props.getUserProfile?.blurb}
          </p>
          <div className="flex flex-row text-gray-600">
            <CalendarIcon className="w-6 h-auto -ml-1" />
            <p className="ml-1">
              Joined {props.getUserProfile && String(fromUnixTime(Number(props.getUserProfile.joinDate))).slice(4, 15)}
            </p>
          </div>
          <ProfileFollowers getUserProfile={props.getUserProfile}/>
        </div>
        </div>
  )
}