import { 
  UserCircleIcon, 
  HeartIcon, 
  UploadIcon, 
  RefreshIcon, 
  ChatIcon 
} from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client';

const LIKE_POST = gql`
  mutation Mutation($likePostHandle: String, $likePostPostId: String) {
    likePost(handle: $likePostHandle, postID: $likePostPostId) {
      likes {
        handle
      }
    }
  }
`;

export const SingleTweet = (props: any) => {

  const [likePost, { data, loading, error }] = useMutation(LIKE_POST, {
    variables: {
      likePostHandle: props.currentUser.handle,
      likePostPostId: props.tweet.id
    }
  })
  
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
            <h4 className="text-gray-500 ml-1 hover:underline">{props.tweet.postDate.slice(0, 21)}</h4>
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
            <p>{props.tweet.comments ? props.tweet.comments.length : null}</p>
          </div>
          <div className="flex flex-row items-center hover:text-green-500">
            <RefreshIcon className="hover:bg-green-50 tweet-options" />
            <p>{props.tweet.retweets ? props.tweet.retweets.length : null}</p>
          </div>
          <button 
          className="flex flex-row  items-center hover:text-red-500"
          onClick={async () => {
          await likePost();
          }}>
            <HeartIcon className="hover:bg-red-50 tweet-options"/>
            <p className=" ">{data && data.likePost.likes.length > 0 ? data.likePost.likes.length : props.tweet.likes ? props.tweet.likes.length === 0 ? null : props.tweet.likes.length : null}</p>
          </button>
          <UploadIcon className="hover:text-blue-500 hover:bg-blue-50 tweet-options"/>
        </div>
    </div>
  )
}