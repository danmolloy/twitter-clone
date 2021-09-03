import { HashtagIcon, 
  HomeIcon, 
  BookmarkIcon, 
  DotsCircleHorizontalIcon, 
  UserIcon, 
  BellIcon,
  InboxIcon,
  DocumentTextIcon,
  PencilAltIcon,
  UserCircleIcon
} from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <div id="side-bar" className="fixed flex flex-col mt-0 ml-0 border-r border-gray-200 h-screen items-center bg-white">
      <Link to="/home">
        <img src="favico.ico" className="w-12 h-auto mx-6 my-4 p-2 rounded hover:bg-blue-50"/>
      </Link>
      <Link to="/home">
        <HomeIcon className="side-icon"/>
      </Link>
      <Link to="/explore">
        <HashtagIcon className="side-icon"/>
      </Link>
      <Link to="/notifications">
        <BellIcon className="side-icon"/>
      </Link>
      <Link to="/messages">
        <InboxIcon className="side-icon"/>
      </Link>
      <Link to="/bookmarks">
        <BookmarkIcon className="side-icon"/>
      </Link>
      <Link to="/lists">
        <DocumentTextIcon className="side-icon" />
      </Link>
      <Link to="/:user">
        <UserIcon className="side-icon"/>
      </Link>
        <DotsCircleHorizontalIcon className="side-icon" id="more-icon"/>
      <Link to="/compose/tweet">
        <PencilAltIcon className="h-12 w-auto mx-4 my-1 twitter-blue rounded-full p-2 hover:bg-blue-50"/>
      </Link>
      <UserCircleIcon className="h-14 w-auto mx-4 mt-28 rounded-full p-2 hover:bg-gray-200"/>
    </div>
  )
}