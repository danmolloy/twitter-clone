import { SparklesIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import { ComposeTweet } from './ComposeTweet'
import { SingleTweet } from './SingleTweet'

export const Home = () => {
  return (
    <div id="home" className="ml-24 border-r w-full mr-2">
      <div className="header border-b border-gray-200 h-14 flex flex-row justify-between">
        <h2 className="text-xl font-semibold p-4">Home</h2>
        <SparklesIcon className="w-10 p-2 my-2 h-auto mr-4 hover:bg-gray-200 rounded-full " />
      </div>
      <ComposeTweet />
    </div>
  )
}