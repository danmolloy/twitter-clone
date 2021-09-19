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


export const Sidebar = (props: any) => {
  return (
    <div id="side-bar" 
    className="self-end fixed flex flex-row sm:flex-col sm:mt-0 ml-0
    w-full sm:w-24 md:w-60 h-18 sm:h-screen
    border-t sm:border-t-0 sm:border-r border-gray-200 md:items-start
    justify-center sm:justify-start items-center bg-white">
      <Link to="/home" className="md:ml-2">
        <img src="favico.ico" className="hidden sm:flex w-12 h-auto mx-6 my-4 p-2 rounded hover:bg-blue-50"/>
      </Link>
      <Link to="/home" className="lg-side-icon">
        <HomeIcon className="side-icon"/>
        <label htmlFor="home-link" className="sidebar-text">Home</label>
      </Link>
      <Link to="/explore" className="lg-side-icon">
        <HashtagIcon className="side-icon"/>
        <label htmlFor="explore-link" className="sidebar-text">Explore</label>
      </Link>
      <Link to="/notifications" className="lg-side-icon">
        <BellIcon className="side-icon"/>
        <label htmlFor="notifications-link" className="sidebar-text">Notifications</label>
      </Link>
      <Link to="/messages" className="lg-side-icon">
        <InboxIcon className="side-icon"/>
        <label htmlFor="messages-link" className="sidebar-text">Messages</label>
      </Link>
      <Link to="/bookmarks" className="lg-side-icon">
        <BookmarkIcon className="side-icon hidden sm:flex"/>
        <label htmlFor="bookmarks-link" className="sidebar-text">Bookmarks</label>
      </Link>
      <Link to="/lists" className="lg-side-icon">
        <DocumentTextIcon className="side-icon hidden sm:flex" />
        <label htmlFor="lists-link" className="sidebar-text">Lists</label>
      </Link>
      <Link to={`/${props.data.currentUser.handle.slice(1)}`} className="lg-side-icon">
        <UserIcon className="side-icon hidden sm:flex"/>
        <label htmlFor="profile-link" className="sidebar-text">Profile</label>
      </Link>
      <div className="lg-side-icon">
        <DotsCircleHorizontalIcon className="side-icon hidden sm:flex" id="more-icon"/>
        <label htmlFor="more-link" className="sidebar-text">More</label>
      </div>
      <Link to="/compose/tweet" className="md:ml-4">
        <PencilAltIcon className="hidden sm:flex h-12 w-auto mx-4 my-1 twitter-blue rounded-full p-2 hover:bg-blue-50"/>
      </Link>
      <Link to={`/${props.data.currentUser.handle.slice(1)}`} className="md:ml-4">
        {props.data.currentUser.profilePic ?
        <img src={props.data.currentUser.profilePic} className="hidden sm:flex h-14 w-auto mx-4 mt-28 rounded-full p-2 hover:bg-gray-200"/>
        :
        <UserCircleIcon className="hidden sm:flex h-14 w-auto mx-4 mt-28 rounded-full p-2 hover:bg-gray-200"/>
        }
      </Link>
    </div>
  )
}