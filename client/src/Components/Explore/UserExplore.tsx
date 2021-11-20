import { Link } from "react-router-dom"
import { ExploreUser } from "../../types"
import { FollowButton } from "../Profile/FollowButton"

export const UserExplore = (props: {user: ExploreUser, currentUserHandle: string | undefined}) => {
  return (
       <div className="border-b flex flex-row justify-between hover:bg-gray-100 ">
        <Link to={`/${props.user.handle.slice(1)}`} className="flex flex-row m-4">
        <img src={props.user.profilePic} className="w-12 sm:w-16 h-auto rounded-full " />
        <div className="flex flex-col ml-4">
          <h3 className="font-semibold">{props.user.name}</h3>
          <p className="text-gray-500">{props.user.handle}</p>
          <p>{props.user.blurb}</p>
        </div>
        </Link>
        <FollowButton currentUserHandle={props.currentUserHandle && props.currentUserHandle} user={props.user}/>
      </div>)
}