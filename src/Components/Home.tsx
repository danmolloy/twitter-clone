import { useEffect } from 'react'
import { ComposeTweet } from './ComposeTweet'
import { SingleTweet } from './SingleTweet'

export const Home = () => {
  return (
    <div id="home" className="border-r w-full mr-2">
      <div className="header border-b border-gray-200 h-16">
        <h2 className="text-xl font-semibold p-4">Home</h2>
        <ComposeTweet />
        <SingleTweet />
      </div>
    </div>
  )
}