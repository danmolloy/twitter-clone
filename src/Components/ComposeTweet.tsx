import { UserCircleIcon, PhotographIcon, ChartBarIcon, EmojiHappyIcon, CalendarIcon } from '@heroicons/react/outline'
import { GlobeIcon } from '@heroicons/react/solid'

export const ComposeTweet = () => {
  return (
    <div className="flex flex-col border-b">
      <div className="flex flex-row">
        <UserCircleIcon className="w-12 h-auto mt-4 ml-3"/>
        <input className="text-lg w-full mt-2 h-16 ml-3" placeholder="What's happening?" />
      </div>
      <div className="flex flex-row ml-16 border-b py-2">
        <div className="hover:bg-gray-200 flex flex-row items-center px-2 rounded-full">
          <GlobeIcon className="w-4 twitter-blue"/>
          <p className="twitter-blue text-sm font-bold ml-1">Everyone can reply</p>
        </div>
      </div>
      <div className="flex flex-row ml-16 justify-between">
      <div className="flex flex-row py-2">
        <PhotographIcon className="compose-tweet-icons"/>
        <ChartBarIcon className="compose-tweet-icons"/>
        <EmojiHappyIcon className="compose-tweet-icons" />
        <CalendarIcon className="compose-tweet-icons" />
      </div>
      <button className="tweet-btn">Tweet</button>
      </div>
    </div>
  )
}