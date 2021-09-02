import { ArrowLeftIcon, CalendarIcon, UserCircleIcon } from "@heroicons/react/outline"
import { useAppSelector } from '../app/hooks'
import { useEffect, useState } from 'react'
import { SingleTweet } from "./SingleTweet"

export const Profile = () => {

  const user = useAppSelector(state => state.user.user)

  const renderedTweets = user.tweets.map(tweet => {
    return SingleTweet(tweet, user)
  })

  return (
    <div className="border-r w-full mr-2 ml-24">
      <div className="border-b flex flex-row">
        <ArrowLeftIcon className="w-10 p-2 h-auto ml-4 my-2" />
        <div className=" ml-2 mt-1">
        <h3 className="text-xl font-bold">
          {user.name}
        </h3>
        <p className="text-sm text-gray-600 -mt-1">{user.tweets.length} tweets</p>
        </div>
      </div>
      <div className="w-full h-full">
      <div className="w-full h-3/5 ">
        <div className="w-full h-48 border-b">
        </div>
        <div className="flex flex-row  justify-between">
        <UserCircleIcon className="w-28 h-auto ml-12 -mt-12 border -p rounded-full"/>
        <button className="font-bold border border-gray-300 rounded-full py-1 px-2 my-4 mr-4">
          Edit Profile
        </button>
        </div>
        <div className="flex flex-col w-2/5 ml-12">
          <h3 className="font-bold text-xl">
            {user.name}
          </h3>
          <p className="text-gray-600 text-sm">
            {user.handle}
          </p>
          <p className="my-2">
            {user.blurb}
          </p>
          <div className="flex flex-row text-gray-600">
            <CalendarIcon className="w-6 h-auto -ml-1" />
            <p className="ml-1">
              Joined {user.joinDate}
            </p>
          </div>
          <div className="flex flex-row text-gray-600 my-2">
            <p>
              <span className="font-bold text-black">
              {user.following.length}
              </span> following
            </p>
            <p className="ml-2 text-black"><span className="font-bold">{user.followers.length}</span> followers</p>
          </div>
        </div>
        <div className=" w-full h-12 mt-4 flex flex-row">
          <button className="w-1/4 border-b font-semibold hover:bg-gray-200 flex flex-col justify-between items-center pt-2">
            Tweets 
            <span className="tab-line"/>
          </button>
          <button className="w-1/4 hover:bg-gray-200 border-b">
            Tweets & Replies
          </button>
          <button className="w-1/4 hover:bg-gray-200 border-b">
            Media
          </button>
          <button className="w-1/4 hover:bg-gray-200 border-b">
            Likes
          </button>
        </div>
      </div>
      <div className="h-auto w-full">
        {renderedTweets}
      </div>
      </div>
      
    </div>
  )
}