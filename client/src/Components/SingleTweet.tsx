import { 
  UserCircleIcon, 
  HeartIcon, 
  UploadIcon, 
  RefreshIcon, 
  ChatIcon 
} from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client';
import fromUnixTime from 'date-fns/fromUnixTime'
import { useState } from 'react';
import { User, Post } from '../types';
import { TweetComments } from './TweetComments';

export const LIKE_POST = gql`
  mutation Mutation($likePostHandle: String, $likePostPostId: String) {
    likePost(handle: $likePostHandle, postID: $likePostPostId) {
      likes {
        handle
      }
    }
  }
`;

export const RETWEET_POST = gql`
  mutation Mutation($retweetPostHandle: String, $retweetPostPostId: String) {
    retweetPost(handle: $retweetPostHandle, postID: $retweetPostPostId) {
      retweets {
        handle
      }
    }
  }
`;

export const BOOKMARK_POST = gql`
  mutation Mutation($postId: String, $handle: String) {
    bookmarkPost(postID: $postId, handle: $handle) {
      bookmarks {
        handle
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation Mutation($postId: String) {
    deletePost(postId: $postId) {
      id
    }
  }
`


export const SingleTweet = (props: {author: User | undefined, currentUser: User | undefined, tweet: Post |undefined, updatePage: any}) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showBookmarksMenu, setShowBookmarksMenu] = useState(false)
  const [showComments, setShowComments] = useState(false)
 
  const [likePost, { data: dataLikes, loading: loadingLikes, error: errorLikes }] = useMutation(LIKE_POST, {
    variables: {
      likePostHandle: props.currentUser &&props.currentUser.handle,
      likePostPostId: props.tweet && props.tweet.id
    }
  })

  const [retweetPost, { data: dataRetweets, loading: loadingRetweets, error: errorRetweets }] = useMutation(RETWEET_POST, {
    variables: {
      retweetPostHandle: props.currentUser &&props.currentUser.handle,
      retweetPostPostId: props.tweet && props.tweet.id
    }
  })

  const [bookmarkPost, { data: dataBookmarks, loading: loadingBookmarks, error: errorBookmarks }] = useMutation(BOOKMARK_POST, {
    variables: {
      postId: props.tweet && props.tweet.id,
      handle: props.currentUser &&props.currentUser.handle, 
    }
  })

  const [deletePost, { data: dataDelete, loading: loadingDelete, error: errorDelete}] = useMutation(DELETE_POST, {
    variables: {
      postId: props.tweet && props.tweet.id
    }
  })

  
  return (
    <div id="single-tweet" className={`border-b ${!showMenu && !showBookmarksMenu && "hover:bg-gray-50"} flex flex-col items-center`}>
      {showComments && <TweetComments currentUser={props.currentUser} tweet={props.tweet} close={() => setShowComments(false)}/>}
      <div className="flex flex-row mt-4 w-full"> 
      {props.author && props.author.profilePic ? 
      <img src={props.author && props.author.profilePic} className="w-14 h-auto ml-3 rounded-full"/>:
      <UserCircleIcon className="w-12 h-12 ml-3"/>}
      <div className="ml-3 flex flex-col w-full">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row">
            <Link to={props.author && props.author.handle ? `/${props.author.handle.slice(1)}` : '/'} className="flex flex-row">
              <h3 className="font-bold hover:underline">{props.author && props.author.name}</h3>
              <h4 className="text-gray-500 ml-1">{props.author && props.author.handle}</h4>
            </Link>
            <span className="text-gray-500 ml-1">•</span>
            <h4 className="text-gray-500 ml-1 hover:underline">{props.tweet && String(fromUnixTime(props.tweet.postDate)).slice(0, 15)}</h4>
          </div>
          <div
          id="tweet-options"
          onBlur={() => setTimeout(() => setShowMenu(false), 100)}
          onFocus={() => setShowMenu(true)}
          >
            {showMenu && <div id="options-button" className="shadow z-10 bg-white absolute -ml-24 w-32 rounded">
            { props.author && props.currentUser && props.currentUser.handle === props.author.handle ?
            <button 
            id="delete-button"
            className="hover:bg-gray-50 p-2" 
            onClick={async() => {
              await deletePost();
              props.updatePage()
              }}>
              Delete Tweet
              </button> :
            <button className="hover:bg-gray-50 p-2">Unfollow</button>}
          </div>}
          <button 
          className="text-gray-500 hover:bg-blue-50 hover:text-blue-500 rounded-full p-1 mr-2">
            •••
          </button>
          </div>
        </div>
        <div>
        <p>{props.tweet && props.tweet.content}</p>
        </div>
      </div>
      </div>
      <div className="flex flex-row justify-between px-12 my-2 text-gray-500 w-full">
          <button className="flex flex-row items-center hover:text-blue-500" onClick={() => setShowComments(true)}>
            <ChatIcon className=" hover:bg-blue-50 tweet-options" />
            <p>{props.tweet && props.tweet.comments ? props.tweet.comments.length : null}</p>
          </button>
          <button 
          id="retweet-button"
          className="flex flex-row items-center hover:text-green-500"
          onClick={async () =>{
            await retweetPost();
          }}>
            <RefreshIcon className="hover:bg-green-50 tweet-options" />
            <p id="retweet-count">{dataRetweets && dataRetweets.retweetPost.retweets.length > 0 ? dataRetweets.retweetPost.retweets.length : dataRetweets && dataRetweets.retweetPost.retweets.length === 0 ? null : props.tweet && props.tweet.retweets && props.tweet.retweets.length > 0 ? props.tweet.retweets.length : null}</p>
          </button>
          <button 
          id="like-button"
          className="flex flex-row  items-center hover:text-red-500"
          onClick={async () => {
          await likePost();
          }}>
            <HeartIcon className="hover:bg-red-50 tweet-options"/>
            <p id="like-count">
              {props.tweet && props.tweet.likes 
              ? props.tweet.likes.length === 0 
              ? null : props.tweet.likes.length 
              : null}</p>
          </button>
          <button 
          id="bookmark-options"
          onBlur={() => setTimeout(() => setShowBookmarksMenu(false), 200)}
          onFocus={() => setShowBookmarksMenu(true)}
          className="">
            {showBookmarksMenu === true && 
            <div className="shadow z-10 bg-white absolute -ml-20 w-32 rounded p-2 text-black hover:bg-gray-50">
              <button onClick={async () => {await bookmarkPost()}}>Bookmark</button>
            </div>}
          <UploadIcon onFocus={() => alert('Hi')} className="hover:text-blue-500 hover:bg-blue-50 tweet-options"/>
          </button>
        </div>
    </div>
  )
}