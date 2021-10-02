import { UserCircleIcon, PhotographIcon, ChartBarIcon, EmojiHappyIcon, CalendarIcon } from '@heroicons/react/outline'
import { GlobeIcon } from '@heroicons/react/solid'
import { useMutation, gql} from '@apollo/client'
import { useEffect, useState } from 'react';

const POST_TWEET = gql`
  mutation Mutation($writePostContent: String, $writePostAuthorHandle: String) {
    writePost(content: $writePostContent, authorHandle: $writePostAuthorHandle) {
      id
    }
  }
`;

export const ComposeTweet = (props: any) => {
  const [content, setContent] = useState('')

  const [postTweet, {data, loading, error}] = useMutation(POST_TWEET, {
    variables: {
      writePostContent: content,
      writePostAuthorHandle: props.user.handle
    }
  })

  const handleSubmit = (props: any) => {
    postTweet()
      .then(()=> setContent(""))
      .then(props.refreshTweets)
  }

  if (loading) return <p>'Posting..'</p>;

  if (error) return <p>'Error posting!'</p>;

  return (
    <div id="compose-tweet" className="flex flex-col border-b">
      <div className="flex flex-row">
        {props.user.profilePic ?
        <img src={props.user.profilePic} className="w-14 h-auto mt-4 ml-3 rounded-full"/>:
        <UserCircleIcon className="w-12 h-auto mt-4 ml-3"/>}
        <input 
        className="text-lg w-full mt-2 h-16 ml-3 focus:outline-none" 
        placeholder="What's happening?"
         value={content}
         onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {content !== '' && 
      <div className="flex flex-row ml-16 border-b py-2">
        <div className="hover:bg-blue-50 flex flex-row items-center px-2 rounded-full">
          <GlobeIcon className="w-4 twitter-blue"/>
          <p className="twitter-blue text-sm font-bold ml-1">Everyone can reply</p>
        </div>
      </div>}
      <div className="flex flex-row ml-16 justify-between">
      <div className="flex flex-row py-2">
        <PhotographIcon className="compose-tweet-icons"/>
        <ChartBarIcon className="compose-tweet-icons"/>
        <EmojiHappyIcon className="compose-tweet-icons" />
        <CalendarIcon className="compose-tweet-icons" />
      </div>
      <button 
        className={content.length === 0? "tweet-btn-disabled": "tweet-btn"}
        onClick={() => content.length > 0 && handleSubmit(props)}>
        Tweet
      </button>
      </div>
    </div>
  )
}