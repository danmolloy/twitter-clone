import { ArrowLeftIcon, CalendarIcon, UserCircleIcon } from "@heroicons/react/outline"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { SingleTweet } from "./SingleTweet"


export const Profile = (props: any) => {
  const [tweetFilter, setTweetFilter] = useState('tweets')

  useEffect(() => {
    if (document.location.href.includes('media')) {
      setTweetFilter('media')
    }
  })

  return (
    <div className="border-r w-full mr-2">
      <div className="border-b flex flex-row">
        <Link to="/home">
        <ArrowLeftIcon className="w-10 p-2 h-auto ml-4 my-2" />
        </Link>
        <div className=" ml-2 mt-1">
        <h3 className="text-xl font-bold">
          {props.data.currentUser.name}
        </h3>
        <p className="text-sm text-gray-600 -mt-1">{props.data.currentUser.posts.length} tweets</p>
        </div>
      </div>
      <div className="w-full">
      <div className="w-full h-3/5 ">
        <div className="w-full h-48">
          <img src={props.data.currentUser.bgPic}/>
        </div>
        <div className="flex flex-row justify-between">
          {props.data.currentUser.profilePic ?
            <img src={props.data.currentUser.profilePic} className="rounded-full w-36 h-auto ml-4 -mt-12 -p border-4 border-white"/> :
            <UserCircleIcon className="w-28 h-auto ml-12 -mt-12 border -p rounded-full"/>
          }
          <button className="font-bold border border-gray-300 rounded-full px-2 my-8 mr-8">
          Edit Profile
        </button>
        </div>
        <div className="flex flex-col w-2/5 ml-12">
          <h3 className="font-bold text-xl">
            {props.data.currentUser.name}
          </h3>
          <p className="text-gray-600 text-sm">
            {props.data.currentUser.handle}
          </p>
          <p className="my-2">
            {props.data.currentUser.blurb}
          </p>
          <div className="flex flex-row text-gray-600">
            <CalendarIcon className="w-6 h-auto -ml-1" />
            <p className="ml-1">
              Joined {props.data.currentUser.joinDate}
            </p>
          </div>
          <div className="flex flex-row text-gray-600 my-2">
            <p>
              <span className="font-bold text-black">
              {props.data.currentUser.following.length}
              </span> following
            </p>
            <p>
              <span className="font-bold text-black ml-2">
                {props.data.currentUser.followers.length}
              </span> followers
            </p>
          </div>
        </div>
        <div className=" w-full h-12 mt-4 flex flex-row">
          <Link 
          className={tweetFilter === 'tweets' ? 'selected-tweet-filter' : 'deselected-tweet-filter'}
          to={`/${props.data.currentUser.handle.slice(1)}`}
          onClick={() => setTweetFilter('tweets')}>
            Tweets 
            {tweetFilter === 'tweets' && <span className="tab-line"/>}
          </Link>
          <Link 
          className={tweetFilter === 'replies' ? 'selected-tweet-filter' : 'deselected-tweet-filter'}
          to={`/${props.data.currentUser.handle.slice(1)}/with_replies`}
          onClick={() => setTweetFilter('replies')}>
            Tweets & Replies
            {tweetFilter === 'replies' && <span className="tab-line"/>}
          </Link>
          <Link 
          className={tweetFilter === 'media' ? 'selected-tweet-filter' : 'deselected-tweet-filter'} 
          to={`/${props.data.currentUser.handle.slice(1)}/media`}
          onClick={() => setTweetFilter('media')}>
            Media
            {tweetFilter === 'media' && <span className="tab-line"/>}
          </Link>
          <Link 
          className={tweetFilter === 'likes' ? 'selected-tweet-filter' : 'deselected-tweet-filter'}
          to={`/${props.data.currentUser.handle.slice(1)}/likes`}
          onClick={() => setTweetFilter('likes')}>
            Likes
            {tweetFilter === 'likes' && <span className="tab-line"/>}
          </Link>
        </div>
      </div>
      </div>
      <div className="h-auto w-full flex flex-col mt-0">
        {props.data.currentUser.posts.length > 0 &&
          props.data.currentUser.posts.map((post: { id: string; }) => {
            return <SingleTweet tweet={post} user={props.data.currentUser} key={post.id} />;
          })
        }
      </div>
    </div>
  )
}