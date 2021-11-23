import { UserCircleIcon, BookOpenIcon } from '@heroicons/react/outline'
import { useMutation, gql} from '@apollo/client'
import { useState } from 'react';
import { User } from '../../types';
import { FOLLOWINGPOSTS } from './Home'

export const POST_TWEET = gql`
  mutation Mutation($writePostContent: String) {
    writePost(content: $writePostContent) {
      id
    }
  }
`;

export const ComposeTweet = (props: {currentUser: User | undefined}) => {
  const [content, setContent] = useState('')

  const [postTweet, {data, loading, error}] = useMutation(POST_TWEET, {
    variables: {
      writePostContent: content,
    },
    refetchQueries: [
      FOLLOWINGPOSTS,
      "followsTweets"
    ]
  })

  const handleSubmit = (props: any) => {
    postTweet()
      .then(()=> setContent(""))
      .then(props.refreshTweets)
  }


  if (loading) return <p>'Posting..'</p>;

  if (error) return <p>'Error posting!'</p>;

  return (
    <div id="compose-tweet" className="flex flex-col border-b border-r w-full">
      <div className="flex flex-row">
        {props.currentUser 
        ? <img src={props.currentUser.profilePic} className="w-14 h-auto mt-4 ml-3 rounded-full"/>
        : <UserCircleIcon className="w-12 h-auto mt-4 ml-3"/>
        }
        <textarea 
        id="compose-tweet-content"
        className="text-lg w-full p-2 mt-2 h-auto ml-3 focus:outline-none" 
        placeholder="What's happening?"
        value={content}
        maxLength={140}
        onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {content && 
      <div className="flex flex-row ml-16 border-b py-2">
        <div className="flex flex-row items-center px-2 rounded-full">
          <BookOpenIcon className="twitter-blue h-6 w-auto"/>
          <p className="twitter-blue text-sm font-bold ml-1">{140 - content.length} / 140</p>
        </div>
      </div>}
      <div className="flex flex-row ml-16 justify-end">
      <button 
        className={content.length === 0? "tweet-btn-disabled": "tweet-btn"}
        onClick={() => content.length > 0 && handleSubmit(props)}>
        Tweet
      </button>
      </div>
    </div>
  )
}