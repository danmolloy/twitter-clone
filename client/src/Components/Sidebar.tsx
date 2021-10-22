import { HashtagIcon, 
  HomeIcon, 
  BookmarkIcon, 
  UserIcon, 
  BellIcon,
  InboxIcon,
  PencilAltIcon,
  UserCircleIcon,
  LogoutIcon
} from '@heroicons/react/outline'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'
import { User } from '../types'


export const Sidebar = (props: {currentUser: User | undefined}) => {

  const onSignOut = () => {
    localStorage.removeItem(AUTH_TOKEN)
  }

  return (
    <div id="side-bar" 
    className="side-bar">
      <Link to="/home" className="md:ml-2" id="twitter-home-link">
        <img src="favico.ico" className="hidden sm:flex w-12 h-auto mx-6 my-4 p-2 rounded hover:bg-blue-50"/>
      </Link>
      <Link to="/home" className="lg-side-icon" id="home-link">
        <HomeIcon className="side-icon"/>
        <label htmlFor="home-link" className="sidebar-text">Home</label>
      </Link>
      <Link to="/explore" className="lg-side-icon" id="explore-link">
        <HashtagIcon className="side-icon"/>
        <label htmlFor="explore-link" className="sidebar-text">Explore</label>
      </Link>
      <Link to="/notifications" className="lg-side-icon" id="notifications-link">
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
      <Link to={props.currentUser ? `/${props.currentUser.handle.slice(1)}`: '/'} className="lg-side-icon">
        <UserIcon className="side-icon hidden sm:flex"/>
        <label htmlFor="profile-link" className="sidebar-text">Profile</label>
      </Link>
      <Link className="lg-side-icon" to="/login" onClick={() => onSignOut()}>
        <LogoutIcon className="side-icon hidden sm:flex" id="more-icon"/>
        <label htmlFor="more-link" className="sidebar-text">Sign Out</label>
      </Link>
      <Link to="/compose/tweet" className="md:ml-4">
        <PencilAltIcon className="hidden sm:flex h-12 w-auto mx-4 my-1 twitter-blue rounded-full p-2 hover:bg-blue-50"/>
      </Link>
      <Link to={props.currentUser ? `/${props.currentUser.handle.slice(1)}` : '/'} className="md:ml-4">
        {props.currentUser && props.currentUser.profilePic ?
        <img src={props.currentUser && props.currentUser.profilePic} className="hidden sm:flex h-14 w-auto mx-4 mt-28 rounded-full p-2 hover:bg-gray-200"/>
        :
        <UserCircleIcon className="hidden sm:flex h-14 w-auto mx-4 mt-28 rounded-full p-2 hover:bg-gray-200"/>
        }
      </Link>
    </div>
  )
}