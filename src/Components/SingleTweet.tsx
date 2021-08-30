import { UserCircleIcon, HeartIcon, UploadIcon, RefreshIcon, ChatIcon } from '@heroicons/react/outline'

export const SingleTweet = () => {
  return (
    <div>
      <div className="flex flex-row mt-4"> 
      <UserCircleIcon className="w-12 h-auto ml-3"/>
      <div className="ml-3 flex flex-col">
        <div className=" flex flex-row">
          <h3 className="font-bold">Fiona Kelly</h3>
          <h4 className="text-gray-500 ml-1">@fizzlekelly</h4>
          <h4 className="text-gray-500 ml-1">• Aug 20</h4>
          <button className="font-bold text-lg text-gray-500">...</button>
        </div>
        <div>
        <p>Goin for a stroll <span className="twitter-blue">#WildAtlanticWay</span></p>
        </div>
      </div>
      </div>
      <div className="flex flex-row justify-between mx-12 my-6">
          <ChatIcon className="tweet-options" />
          <RefreshIcon className="tweet-options" />
          <HeartIcon className="tweet-options"/>
          <UploadIcon className="tweet-options"/>
        </div>
    </div>
  )
}