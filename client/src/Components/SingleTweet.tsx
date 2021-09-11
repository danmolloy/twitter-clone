import { 
  UserCircleIcon, 
  HeartIcon, 
  UploadIcon, 
  RefreshIcon, 
  ChatIcon 
} from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

export const SingleTweet = (props: any) => {
  
  return (
    <div className="border-b hover:bg-gray-50">
      <div className="flex flex-row mt-4"> 
      {props.user.profilePic ? 
      <img src={props.user.profilePic} className="w-14 h-auto ml-3 rounded-full"/>:
      <UserCircleIcon className="w-12 h-auto ml-3"/>}
      <div className="ml-3 flex flex-col w-full">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row">
            <Link to={`/${props.user.handle.slice(1)}`} className="flex flex-row">
              <h3 className="font-bold hover:underline">{props.user.name}</h3>
              <h4 className="text-gray-500 ml-1">{props.user.handle}</h4>
            </Link>
            <span className="text-gray-500 ml-1">•</span>
            <h4 className="text-gray-500 ml-1 hover:underline">{props.tweet.postDate}</h4>
          </div>
          <button className="text-gray-500 hover:bg-blue-50 hover:text-blue-500 rounded-full p-1 mr-2">
            •••
          </button>
        </div>
        <div>
        <p>{props.tweet.content}</p>
        </div>
      </div>
      </div>
      <div className="flex flex-row justify-between mx-12 my-2 text-gray-500">
          <div className="flex flex-row items-center hover:text-blue-500">
            <ChatIcon className=" hover:bg-blue-50 tweet-options" />
            <p>{props.tweet.comments.length}</p>
          </div>
          <div className="flex flex-row items-center hover:text-green-500">
            <RefreshIcon className="hover:bg-green-50 tweet-options" />
            <p>{props.tweet.retweets.length}</p>
          </div>
          <div className="flex flex-row  items-center hover:text-red-500">
            <HeartIcon className="hover:bg-red-50 tweet-options"/>
            <p className=" ">{props.tweet.likes.length}</p>
          </div>
          <UploadIcon className="hover:text-blue-500 hover:bg-blue-50 tweet-options"/>
        </div>
    </div>
  )
}