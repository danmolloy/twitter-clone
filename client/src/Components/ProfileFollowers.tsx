import { useState } from "react"
import { Link } from "react-router-dom"
import { User, UserHandles } from "../types"

export const ProfileFollowers = (props: {getUserProfile: User | undefined}) => {
  const [showFollowing, setShowFollowing] = useState(false)
  const [showFollowers, setShowFollowers] = useState(false)

  return (
    <div id="profile-followers" className="flex flex-row text-gray-600 my-2">
      <div 
      onClick={() => setShowFollowing(true)}
      onBlur={() => setTimeout(() => setShowFollowing(false), 150)}>
        {showFollowing && 
      <div className="shadow z-10 bg-white absolute  w-48 round text-black bg-white">
        <h3 className="p-2 font-semibold border-b">Following</h3>
        <ul>
        {props.getUserProfile?.follows.map((user: UserHandles) => {
          return <li key={user.handle} className="hover:bg-gray-50 p-2">
            <Link to={`/${user.handle.slice(1)}`}>{user.handle}</Link>
            </li>
        })}
        </ul>
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
      <div className="shadow z-10 bg-white absolute w-48 round text-black bg-white">
        <h3 className="p-2 font-semibold border-b">Followers</h3>
        <ul>
        {props.getUserProfile?.followers.map((user: UserHandles) => {
          return <li key={user.handle} className="hover:bg-gray-50 p-2">
            <Link to={`/${user.handle.slice(1)}`}>{user.handle}</Link>
            </li>
        })}
        </ul>
      </div>}
      <button>
        <span className="font-bold text-black ml-2">
          {props.getUserProfile &&props.getUserProfile.followers ?
          props.getUserProfile.followers.length : 0}
        </span> followers
      </button>
      </div>
    </div>
  )
}