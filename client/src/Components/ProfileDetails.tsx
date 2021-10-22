import { useMutation, gql } from "@apollo/client"
import { CalendarIcon, UserCircleIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import { User } from "../types"
import { ProfileButton } from "./ProfileButton"
import { ProfileFollowers } from "./ProfileFollowers"

export const EDIT_PROFILE = gql`
  mutation Mutation($handle: String, $userName: String, $blurb: String) {
    editProfile(handle: $handle, userName: $userName, blurb: $blurb) {
      name
      handle
      blurb
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
  updatePage: any
}) => {
  const [editNameBlurb, setEditNameBlurb] = useState(false)
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [newBlurb, setNewBlurb] = useState(props.currentUser && props.currentUser.blurb)
  const [newName, setNewName] = useState(props.currentUser && props.currentUser.name)

  const [followUnfollow, {data: dataFollowing, loading: loadingFollowing, error: errorFollowing}] = useMutation(FOLLOW_UNFOLLOW)

  const [editProfile, 
    {data: editProfileData, 
      loading: editProfileLoading, 
      error: editProfileError}] = useMutation(EDIT_PROFILE)


  useEffect(() => {
    props.updatePage()
    if (props.getUserProfile && props.currentUser && props.getUserProfile.name === props.currentUser.name) {
      setIsCurrentUser(true)
    }
    else {
      setIsCurrentUser(false)
    }
  })

  const followUnfollowUser = async() => {
    await followUnfollow({
      variables: {
        followHandle: props.getUserProfile && props.getUserProfile.handle, 
        currentUserHandle: props.currentUser && props.currentUser.handle
      }})
  }

  const updateProfile = async () => {
    setEditNameBlurb(false)
    await editProfile({
      variables: {
        handle: props.currentUser && props.currentUser.handle,
        userName: newName,
        blurb: newBlurb,
      }})
    props.updatePage()
  }

  return (
    <div id="profile-details" className="w-full h-3/5 ">
        <img id="profile-banner" className="w-full h-48" src={props.getUserProfile?.bgPic}/>
        <div className="flex flex-row justify-between">
          {props.getUserProfile?.profilePic ?
            <img src={props.getUserProfile.profilePic} className="rounded-full w-36 h-auto ml-4 -mt-12 -p border-4 border-white"/> :
            <UserCircleIcon className="w-28 h-auto ml-12 -mt-12 border -p rounded-full"/>
          }
          <ProfileButton 
          isCurrentUser={isCurrentUser} 
          currentUser={props.currentUser}
          getUserProfile={props.getUserProfile} 
          editNameBlurb={editNameBlurb} 
          followUnfollowUser={followUnfollowUser} 
          setEditNameBlurb={setEditNameBlurb} 
          updateProfile={updateProfile}/>
        </div>
        <div className="flex flex-col w-2/5 ml-12">
        {editNameBlurb === true ?
          <input 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)}
          className="font-bold text-xl border border-black"/>:
          <h3 className="font-bold text-xl">
            {props.getUserProfile?.name}
          </h3>}
          <p className="text-gray-600 text-sm">
            {props.getUserProfile?.handle}
          </p>
          {editNameBlurb === true ?
          <input value={newBlurb} onChange={(e) => setNewBlurb(e.target.value)} className="my-2 border border-black"/> :
          <p className="my-2">
            {props.getUserProfile?.blurb}
          </p>}
          <div className="flex flex-row text-gray-600">
            <CalendarIcon className="w-6 h-auto -ml-1" />
            <p className="ml-1">
              Joined {props.getUserProfile?.joinDate}
            </p>
          </div>
          <ProfileFollowers getUserProfile={props.getUserProfile}/>
        </div>
        </div>
  )
}