import { HashtagIcon, 
  HomeIcon, 
  UserIcon, 
  BellIcon,
  InboxIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { AUTH_TOKEN } from '../../constants'
import { gql, useQuery } from '@apollo/client'
import { Error } from './Error'
import { Loading } from './Loading'
import { useState } from 'react'
import { UserOptions } from './UserOptions'
import { Message, Notification } from '../../types'

export const DELETE_USER = gql`
  mutation SignUpMutation {
    deleteUser {
      name
    }
  }
`;

export const GET_USER = gql`
  query {
    getNotifications {
      notifications {
          read
        }
        chats {
          content {
            read
            authorHandle
          }
        }
        handle
        profilePic
    }
  }
`;


export const Sidebar = () => {
  const [showUserOptions, setShowUserOptions] = useState(false)

  const { loading, error, data } = useQuery(GET_USER)

  const onSignOut = () => {
    localStorage.removeItem(AUTH_TOKEN)
    window.location.reload()
  }

  if (error) {
    console.log(error)
    return <Error />
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div id="side-bar" 
    className="side-bar">
      <Link to="/home" className="md:ml-2" id="twitter-home-link" title="Home">
        <img src="/favico.ico" alt="Blue Twitter bird" className="hidden sm:flex w-12 h-auto mx-6 my-4 p-2 rounded hover:bg-blue-50"/>
      </Link>
      <Link to="/home" className="lg-side-icon" id="home-link" title="Home">
        <HomeIcon className="side-icon"/>
        <label htmlFor="home-link" className="sidebar-text">Home</label>
      </Link>
      <Link to="/explore" title="Explore" className="lg-side-icon" id="explore-link">
        <HashtagIcon className="side-icon"/>
        <label htmlFor="explore-link" className="sidebar-text">Explore</label>
      </Link>
      <Link to="/notifications" title="Notifications" className="lg-side-icon" id="notifications-link">
      {data && data.getNotifications.notifications.map(
        (i: Notification) => i.read).includes(false) 
      && <div id="notifications-alert" className="bg-blue-600 h-2 w-2 rounded-full z-10 -mr-8 sm:-mr-2 -mt-6 sm:-mt-0" />}
        <BellIcon className="side-icon"/>
        <label htmlFor="notifications-link" className="sidebar-text">Notifications</label>
      </Link>
      <Link to="/messages" title="Messages" className="lg-side-icon">
      {data && data.getNotifications.chats[0] !== undefined
      && data.getNotifications.chats[0].content.filter(
        (i:Message) => i.read === false && i.authorHandle !== data.getNotifications.handle).length > 0
        && <div id="unread-msg-alert" className="bg-blue-600 h-2 w-2 rounded-full z-10 -mr-8 sm:-mr-2 -mt-6 sm:-mt-0" />}
        <InboxIcon className="side-icon"/>
        <label htmlFor="messages-link" className="sidebar-text">Messages</label>
      </Link>
      <button className="sm:hidden lg-side-icon" title="User options" onClick={() => setShowUserOptions(!showUserOptions)} >
        {showUserOptions 
        && <UserOptions 
        currentUser={data && data.getNotifications} 
        onSignOut={() => onSignOut()} 
        close={() => setShowUserOptions(false)}/>}
        <img alt={data.getNotifications?.name ? data.getNotifications?.name : "Current user"} src={data && data.getNotifications?.profilePic} className="side-icon rounded-full"/>
      </button>
      <Link id="profile-link" to={data ? `/${data.getNotifications.handle.slice(1)}`: '/'} title="Profile" className="hidden sm:flex lg-side-icon">
        <UserIcon className="side-icon hidden sm:flex"/>
        <label htmlFor="profile-link" className="sidebar-text">Profile</label>
      </Link>
      <Link title="Sign out" id="sign-out-btn" className="hidden sm:flex lg-side-icon" to="/home" onClick={() => onSignOut()}>
        <LogoutIcon className="side-icon hidden sm:flex" id="more-icon"/>
        <label htmlFor="sign-out" className="sidebar-text">Sign Out</label>
      </Link>
    </div>
  )
}