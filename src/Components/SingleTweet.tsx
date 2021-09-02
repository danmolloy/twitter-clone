import { 
  UserCircleIcon, 
  HeartIcon, 
  UploadIcon, 
  RefreshIcon, 
  ChatIcon 
} from '@heroicons/react/outline'
import { basicTweet, basicUser } from '../features/User/UserSlice'

export const SingleTweet = (tweet: basicTweet, user: basicUser) => {
  
  return (
    <div className="border-b">
      <div className="flex flex-row mt-4"> 
      <UserCircleIcon className="w-12 h-auto ml-3"/>
      <div className="ml-3 flex flex-col w-full">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row">
            <h3 className="font-bold hover:underline">{user.name}</h3>
            <h4 className="text-gray-500 ml-1">{user.handle}</h4>
            <span className="text-gray-500 ml-1">•</span>
            <h4 className="text-gray-500 ml-1 hover:underline">{tweet.postdate}</h4>
          </div>
          <button className="text-gray-500 hover:bg-blue-50 hover:text-blue-500 rounded-full p-1 mr-2">
            •••
          </button>
        </div>
        <div>
        <p>{tweet.content}</p>
        </div>
      </div>
      </div>
      <div className="flex flex-row justify-between mx-12 my-2">
          <ChatIcon className="hover:text-blue-500 hover:bg-blue-50 tweet-options" />
          <RefreshIcon className="hover:text-green-500 hover:bg-green-50 tweet-options" />
          <HeartIcon className="hover:text-red-500 hover:bg-red-50 tweet-options"/>
          <UploadIcon className="hover:text-blue-500 hover:bg-blue-50 tweet-options"/>
        </div>
    </div>
  )
}