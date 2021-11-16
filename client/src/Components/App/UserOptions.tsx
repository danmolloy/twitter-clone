import { LogoutIcon, TrashIcon, UserIcon, XCircleIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"

export const UserOptions = (props: any) => {

  
  return (
    <div className="flex flex-col items-start fixed bg-white mb-40 -ml-20 border z-20">
      <button onClick={() => props.close()} className="self-end" title="Hide Menu">
          <XCircleIcon className="w-10 p-1 h-auto text-red-500 hover:bg-red-50 rounded-full mr-2"/>
        </button>
      <Link to={`/${props.currentUser.handle.slice(1)}`} title="Profile" className="lg-side-icon">
        <UserIcon className="side-icon flex"/>
      </Link>
      <Link title="Sign out" className="lg-side-icon" to="/home" onClick={() => props.onSignOut()}>
        <LogoutIcon className="side-icon flex" id="more-icon"/>
      </Link>
      <Link title="Delete user" to="/home" className="lg-side-icon hover:bg-red-50" onClick={() => props.deleteUser()}>
        <TrashIcon id="delete-icon" className="side-icon flex text-red-500 hover:bg-red-50"/>
      </Link>
    </div>
  )
}