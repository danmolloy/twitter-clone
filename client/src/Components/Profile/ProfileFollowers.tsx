import { XCircleIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { User, FollowingUser } from "../../types"


export const ProfileFollowers = (props: {getUserProfile: User | undefined}) => {
  const [showFollowing, setShowFollowing] = useState(false)
  const [showFollowers, setShowFollowers] = useState(false)

  const handleClick = (userHandle: string) => {
    
      window.location.assign(`/${userHandle.slice(1,)}`)
    
  }

  return (
    <div id="profile-followers" className="flex flex-row text-gray-600 my-2">
      <div 
      onClick={() => setShowFollowing(true)}
      onBlur={() => setTimeout(() => setShowFollowing(false), 150)}>
        {showFollowing && 
      <div className=" text-black w-3/4 sm:w-1/2 border shadow -mt-72 z-10 fixed bg-white">
        <div className="border-b shadow-sm flex flex-row justify-between">
          <h3 className="p-2 font-semibold text-lg">Followers</h3>
          <button onClick={() => setShowFollowing(false)}>
          <XCircleIcon className="w-10 p-1 h-auto text-red-500 hover:bg-red-50 rounded-full mr-2"/>
        </button>
        </div>        
        {props.getUserProfile?.follows.map((user: any) => {
          return <button key={user.handle} onClick={() => handleClick(user.handle)} className=" p-2 border-b w-full hover:bg-gray-100 flex flex-row items-center">
            <img src={user.profilePic} alt={`Profile picture of ${user.name}`} className="w-8 h-auto rounded-full"/>
              <p className="ml-2">{user.name}</p>
            </button>
        })}
        <div className="mt-8 ml-4">
        <h3 className="text-md font-bold m-8">Find more users in Explore.</h3>
      </div>
      </div>}
      <button>
        <span className="font-bold text-black">
        {props.getUserProfile?.follows ?
        props.getUserProfile.follows.length :
        0
        }
        </span> following
      </button>
      </div>
      <div onClick={() => setShowFollowers(true)} onBlur={() => setTimeout(() => setShowFollowers(false), 150)}>
      {showFollowers && 
      <div className="text-black -ml-12 w-3/4 sm:w-1/2 border shadow -mt-72 z-10 fixed bg-white">
        <div className="border-b shadow-sm flex flex-row justify-between">
        <h3 className="p-2 font-semibold text-lg">Followers</h3>
        <button onClick={() => setShowFollowers(false)}>
          <XCircleIcon className="w-10 p-1 h-auto text-red-500 hover:bg-red-50 rounded-full mr-2"/>
        </button>
        </div>
        {props.getUserProfile?.followers.map((user: any) => {
          return <button key={user.handle} onClick={() => handleClick(user.handle)} className=" p-2 border-b w-full hover:bg-gray-100 flex flex-row items-center">
              <img src={user.profilePic} className="w-8 h-auto rounded-full"/>
              <p className="ml-2">{user.name}</p>
            </button>
        })}
        <h3 className="text-md font-bold m-8">Find more users in Explore.</h3>
      </div>}
      <button>
        <span className="font-bold text-black ml-2">
          {props.getUserProfile && props.getUserProfile.followers ?
          props.getUserProfile.followers.length : 0}
        </span> followers
      </button>
      </div>
    </div>
  )
}