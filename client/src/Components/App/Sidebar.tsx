import { HashtagIcon, 
  HomeIcon, 
  UserIcon, 
  BellIcon,
  InboxIcon,
  LogoutIcon,
  TrashIcon
} from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { AUTH_TOKEN } from '../../constants'
import { useMutation, gql, useQuery } from '@apollo/client'
import { Error } from './Error'
import { Loading } from './Loading'
import { useState } from 'react'
import { UserOptions } from './UserOptions'

export const DELETE_USER = gql`
  mutation SignUpMutation {
    deleteUser {
      name
    }
  }
`;

export const GET_USER = gql`
  query Query {
    currentUser {
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

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: ({ deleteUser }) => {
      alert('User deleted!')
      localStorage.removeItem(AUTH_TOKEN);
      window.location.reload();
    }
  })

  const onSignOut = () => {
    localStorage.removeItem(AUTH_TOKEN)
    window.location.reload()
  }

  if (error) {
    return <Error />
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div id="side-bar" 
    className="side-bar">
      <Link to="/home" className="md:ml-2" id="twitter-home-link" title="Home">
        <img src="/favico.ico" className="hidden sm:flex w-12 h-auto mx-6 my-4 p-2 rounded hover:bg-blue-50"/>
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
      {data && data.currentUser.notifications.map(
        (i: any) => i.read).includes(false) 
      && <div className="bg-blue-600 h-2 w-2 rounded-full z-10 -mr-8 sm:-mr-2 -mt-6 sm:-mt-0" />}
        <BellIcon className="side-icon"/>
        <label htmlFor="notifications-link" className="sidebar-text">Notifications</label>
      </Link>
      <Link to="/messages" title="Messages" className="lg-side-icon">
      {data && data.currentUser.chats[0] !== undefined
      && data.currentUser.chats[0].content.filter(
        (i:any) => i.read === false && i.authorHandle !== data.currentUser.handle).length > 0
        && <div className="bg-blue-600 h-2 w-2 rounded-full z-10 -mr-8 sm:-mr-2 -mt-6 sm:-mt-0" />}
        <InboxIcon className="side-icon"/>
        <label htmlFor="messages-link" className="sidebar-text">Messages</label>
      </Link>
      <Link id="profile-link" to={data ? `/${data.currentUser.handle.slice(1)}`: '/'} title="Profile" className="lg-side-icon">
        <UserIcon className="side-icon hidden sm:flex"/>
        <label htmlFor="profile-link" className="sidebar-text">Profile</label>
      </Link>
      <Link title="Sign out" id="sign-out-btn" className="lg-side-icon" to="/home" onClick={() => onSignOut()}>
        <LogoutIcon className="side-icon hidden sm:flex" id="more-icon"/>
        <label htmlFor="sign-out" className="sidebar-text">Sign Out</label>
      </Link>
      <Link title="Delete user" to="/home" className="lg-side-icon hover:bg-red-50" onClick={() => deleteUser()}>
        <TrashIcon id="delete-icon" className="side-icon hidden sm:flex text-red-500 hover:bg-red-50"/>
        <label htmlFor="delete-icon" className="sidebar-text text-red-500">Delete User</label>
      </Link>
      <button className="sm:hidden lg-side-icon" title="User options" onClick={() => setShowUserOptions(!showUserOptions)} >
        {showUserOptions 
        && <UserOptions 
        currentUser={data && data.currentUser} 
        onSignOut={() => onSignOut()} 
        deleteUser={() => deleteUser()}
        close={() => setShowUserOptions(false)}/>}
        <img src={data && data.currentUser?.profilePic} className="side-icon rounded-full"/>
      </button>
    </div>
  )
}