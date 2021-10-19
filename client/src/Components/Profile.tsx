import { ArrowLeftIcon, CalendarIcon, UserCircleIcon } from "@heroicons/react/outline"
import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { SingleTweet } from "./SingleTweet"
import { gql, useMutation, useQuery } from "@apollo/client"
import { Loading } from "./Loading"
import { Error } from "./Error"
import { User, UserHandles, Post, GetUserProfileData, GetUserProfileVar  } from "../types"

export const GETUSER = gql`
  query Query($getUserProfileHandle: String!) {
    getUserProfile(handle: $getUserProfileHandle) {
      name
      handle
      blurb
      joinDate
      bgPic
      profilePic
      follows {
        handle
      }
      followers {
        handle
      }
      writtenPosts {
        id
        content
        postDate
        authorHandle
        likes {
          handle
        }
        retweets {
          handle
        }
      }
      }
    }
`;

export const EDIT_PROFILE = gql`
  mutation Mutation($handle: String, $userName: String, $blurb: String) {
    editProfile(handle: $handle, userName: $userName, blurb: $blurb) {
      name
      handle
      blurb
    }
  }
`;

export const FOLLOW_UNFOLLOW = gql`
  mutation Mutation($followHandle: String, $currentUserHandle: String) {
    followUnfollowUser(followHandle: $followHandle, currentUserHandle: $currentUserHandle) {
      name
      followers {
        handle
      }
    }
  }
`;

export const Profile = (props: {currentUser: User | undefined}) => {
  const [editNameBlurb, setEditNameBlurb] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)
  const [showFollowers, setShowFollowers] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)
  const {userHandle} = useParams<{ userHandle: string}>()
  const [newBlurb, setNewBlurb] = useState(props.currentUser && props.currentUser.blurb)
  const [newName, setNewName] = useState(props.currentUser && props.currentUser.name)
  const { loading: loadingProfileData, error: errorProfileData, data: dataProfileData, refetch } = useQuery<GetUserProfileData, GetUserProfileVar>(GETUSER, { variables: { getUserProfileHandle: `@${userHandle}` }})
  
  const [followUnfollow, {data: dataFollowing, loading: loadingFollowing, error: errorFollowing}] = useMutation(FOLLOW_UNFOLLOW)

  const [editProfile, 
    {data: editProfileData, 
      loading: editProfileLoading, 
      error: editProfileError}] = useMutation(EDIT_PROFILE)

  const [tweetFilter, setTweetFilter] = useState('tweets')

  const updatePage = () => {
    refetch()
  }

  useEffect(() => {
    updatePage()
    if (dataProfileData && props.currentUser && dataProfileData.getUserProfile.name === props.currentUser.name) {
      setCurrentUser(true)
    }
    else {
      setCurrentUser(false)
    }
  })

  useEffect(() => {
    if (document.location.href.includes('media')) {
      setTweetFilter('media')
    }
  })

  const followUnfollowUser = async() => {
    await followUnfollow({
      variables: {
        followHandle: dataProfileData && dataProfileData.getUserProfile.handle, 
        currentUserHandle: props.currentUser && props.currentUser.handle
      }})
  }

  const updateProfile = async () => {
    setEditNameBlurb(false)
    await editProfile({
      variables: {
        handle: props.currentUser && props.currentUser.handle,
        userName: newName,
        blurb: newBlurb,
      }})
    refetch()
  }

  if (loadingProfileData) {
    <Loading />
  }

  if (errorProfileData) {
    return <p>{errorProfileData}</p>
  }

  return (
    <div id="profile-component"className="border-r w-full mr-2">
      <div className="border-b flex flex-row">
        <Link to="/home">
        <ArrowLeftIcon className="w-10 p-2 h-auto ml-4 my-2" />
        </Link>
        <div className=" ml-2 mt-1"> 
        <h3 className="text-xl font-bold">
          {dataProfileData && dataProfileData.getUserProfile.name}
        </h3>
        <p className="text-sm text-gray-600 -mt-1">
          {dataProfileData && dataProfileData.getUserProfile.writtenPosts ? 
          dataProfileData.getUserProfile.writtenPosts.length : 0} tweets
          </p>
        </div>
      </div>
      <div className="w-full">
      <div className="w-full h-3/5 ">
        <div className="w-full h-48">
          <img src={dataProfileData && dataProfileData.getUserProfile.bgPic}/>
        </div>
        <div className="flex flex-row justify-between">
          {dataProfileData && dataProfileData.getUserProfile.profilePic ?
            <img src={dataProfileData.getUserProfile.profilePic} className="rounded-full w-36 h-auto ml-4 -mt-12 -p border-4 border-white"/> :
            <UserCircleIcon className="w-28 h-auto ml-12 -mt-12 border -p rounded-full"/>
          }
          {currentUser && editNameBlurb === true ? 
          <button 
          id="edit-profile-btn"
          onClick={() => updateProfile()}
          className="font-bold border border-gray-300 bg-twitter-blue text-white rounded-full px-2 my-8 mr-8">
            Save Changes
          </button>:
          currentUser ?
          <button 
          id="edit-profile-btn"
          onClick={() => setEditNameBlurb(true)}
          className="font-bold border border-gray-300 rounded-full px-2 my-8 mr-8">
            Edit Profile
          </button>: 
            dataProfileData && 
            dataProfileData.getUserProfile.followers.filter(
              (e: UserHandles) => props.currentUser && e.handle === props.currentUser.handle).length > 0 ?
          <button 
          className="font-bold border border-gray-300 rounded-full py-2 px-4 my-8 mr-8"
          onClick={() => followUnfollowUser()}>
            Following
          </button> :
            <button 
            onClick={() => followUnfollowUser()}
            className="font-bold bg-black text-white rounded-full py-2 px-4 my-8 mr-8">
              Follow
            </button>}
        </div>
        <div className="flex flex-col w-2/5 ml-12">
        {editNameBlurb === true ?
          <input 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)}
          className="font-bold text-xl border border-black"/>:
          <h3 className="font-bold text-xl">
            {dataProfileData && dataProfileData.getUserProfile.name}
          </h3>}
          <p className="text-gray-600 text-sm">
            {dataProfileData && dataProfileData.getUserProfile.handle}
          </p>
          {editNameBlurb === true ?
          <input value={newBlurb} onChange={(e) => setNewBlurb(e.target.value)} className="my-2 border border-black"/> :
          <p className="my-2">
            {dataProfileData && dataProfileData.getUserProfile.blurb}
          </p>}
          <div className="flex flex-row text-gray-600">
            <CalendarIcon className="w-6 h-auto -ml-1" />
            <p className="ml-1">
              Joined {dataProfileData && dataProfileData.getUserProfile.joinDate}
            </p>
          </div>
          <div className="flex flex-row text-gray-600 my-2">
            <div 
            onClick={() => setShowFollowing(true)}
            onBlur={() => setTimeout(() => setShowFollowing(false), 150)}>
              {showFollowing && 
            <div className="shadow z-10 bg-white absolute  w-48 round text-black bg-white">
              <h3 className="p-2 font-semibold border-b">Following</h3>
              <ul>
              {dataProfileData && dataProfileData.getUserProfile.follows.map((user: UserHandles) => {
                return <li key={user.handle} className="hover:bg-gray-50 p-2">
                  <Link to={`/${user.handle.slice(1)}`}>{user.handle}</Link>
                  </li>
              })}
              </ul>
            </div>}
            <button>
              <span className="font-bold text-black">
              {dataProfileData && dataProfileData.getUserProfile.follows ?
              dataProfileData.getUserProfile.follows.length :
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
              {dataProfileData && dataProfileData.getUserProfile.followers.map((user: UserHandles) => {
                return <li key={user.handle} className="hover:bg-gray-50 p-2">
                  <Link to={`/${user.handle.slice(1)}`}>{user.handle}</Link>
                  </li>
              })}
              </ul>
            </div>}
            <button>
              <span className="font-bold text-black ml-2">
                {dataProfileData && dataProfileData.getUserProfile.followers ?
                dataProfileData.getUserProfile.followers.length : 0}
              </span> followers
            </button>
            </div>
          </div>
        </div>
        <div className=" w-full h-12 mt-4 flex flex-row">
          <Link 
          className={tweetFilter === 'tweets' ? 'selected-tweet-filter' : 'deselected-tweet-filter'}
          to={dataProfileData ? `/${dataProfileData.getUserProfile.handle.slice(1)}` : '/home'}
          onClick={() => setTweetFilter('tweets')}>
            Tweets 
            {tweetFilter === 'tweets' && <span className="tab-line"/>}
          </Link>
          <Link 
          className={tweetFilter === 'replies' ? 'selected-tweet-filter' : 'deselected-tweet-filter'}
          to={dataProfileData ? `/${dataProfileData.getUserProfile.handle.slice(1)}/with_replies`: '/home'}
          onClick={() => setTweetFilter('replies')}>
            Tweets & Replies
            {tweetFilter === 'replies' && <span className="tab-line"/>}
          </Link>
          <Link 
          className={tweetFilter === 'media' ? 'selected-tweet-filter' : 'deselected-tweet-filter'} 
          to={dataProfileData ? `/${dataProfileData.getUserProfile.handle.slice(1)}/media`: '/home'}
          onClick={() => setTweetFilter('media')}>
            Media
            {tweetFilter === 'media' && <span className="tab-line"/>}
          </Link>
          <Link 
          className={tweetFilter === 'likes' ? 'selected-tweet-filter' : 'deselected-tweet-filter'}
          to={dataProfileData ? `/${dataProfileData.getUserProfile.handle.slice(1)}/likes`: '/home'}
          onClick={() => setTweetFilter('likes')}>
            Likes
            {tweetFilter === 'likes' && <span className="tab-line"/>}
          </Link>
        </div>
      </div>
      </div>
      <div className="h-auto w-full flex flex-col mt-0">
        {dataProfileData && 
        dataProfileData.getUserProfile.writtenPosts && 
        dataProfileData.getUserProfile.writtenPosts.length > 0 &&
        dataProfileData.getUserProfile.writtenPosts.map((tweet: Post) => {
            return <SingleTweet tweet={tweet} author={dataProfileData && dataProfileData.getUserProfile} key={tweet.id} currentUser={props.currentUser} updatePage={updatePage}/>;
          })
        }
      </div>
    </div>
  )
}