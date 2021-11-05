import { XCircleIcon } from '@heroicons/react/outline'
import fromUnixTime from 'date-fns/fromUnixTime'
import { useState } from 'react'

export const TweetComments = (props: any) => {
  const [commentText, setCommentText] = useState("")
  return (
    <div className="border bg-white w-full p-4 sm:w-4/5 fixed h-3/4 sm:h-1/2 -mt-24 rounded-lg shadow-md">
      <div className="flex flex-row border-b p-4">
      <img src={props.tweet.author.profilePic} className="w-14 h-auto rounded-full"/>
      <div className="ml-3 flex flex-col w-full">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row">
            <div className="flex flex-row">
              <h3 className="font-bold hover:underline">{props.tweet && props.tweet.author.name}</h3>
              <h4 className="text-gray-500 ml-1">{props.tweet && props.tweet.author.handle}</h4>
            </div>
            <span className="text-gray-500 ml-1">•</span>
            <h4 className="text-gray-500 ml-1 hover:underline">{props.tweet && String(fromUnixTime(props.tweet.postDate)).slice(0, 15)}</h4>
          </div>
        </div>
        <p>{props.tweet && props.tweet.content}</p>
      </div>
      <button onClick={() => props.close()}>
          <XCircleIcon className="w-10 p-1 h-auto text-red-500 hover:bg-red-50 rounded-full -mt-8 -mr-4 bg-white"/>
        </button>
      </div>
      <div className="flex flex-row mt-4 justify-between items-center border-b">
        <img src={props.currentUser && props.currentUser.profilePic} className="w-14 h-auto rounded-full"/>
        <input placeholder="Tweet your reply" maxLength={50} className="mx-4 h-8 w-full p-1 rounded-full border" value={commentText} onChange={(e) => setCommentText(e.target.value) }/>
        <button className="tweet-btn h-8">Reply</button>
      </div>
    </div>
  )
}