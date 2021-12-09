import { ArrowLeftIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"
import { User } from "../../types"

export const ProfileHeader = (props: {getUserProfile: User | undefined}) => {
  return (
    <div id="profile-header" className="border-b flex flex-row">
        <Link to="/home" id="profile-home-link">
          <ArrowLeftIcon className="w-10 p-2 h-auto ml-4 my-2" />
        </Link>
        <div className=" ml-2 mt-1"> 
        <h3 className="text-xl font-bold">
          {props.getUserProfile && props.getUserProfile.name}
        </h3>
        <p className="text-sm text-gray-600 -mt-1">
          {props.getUserProfile && props.getUserProfile.writtenPosts ? 
          props.getUserProfile.writtenPosts.length : 0} tweets
          </p>
        </div>
      </div>
  )
}