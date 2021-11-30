import { 
  UserCircleIcon, 
  HeartIcon, 
  RefreshIcon, 
  ChatIcon 
} from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client';
import fromUnixTime from 'date-fns/fromUnixTime'
import { useState } from 'react';
import { User, Post } from '../../types';
import { TweetComments } from './TweetComments';
import { FOLLOWINGPOSTS } from './Home';
import { GETUSER } from "../Profile/Profile"

export const LIKE_POST = gql`
  mutation Mutation($likePostPostId: String) {
    likePost(postID: $likePostPostId) {
      likes {
        handle
      }
    }
  }
`;

export const RETWEET_POST = gql`
  mutation Mutation($retweetPostPostId: String) {
    retweetPost(postID: $retweetPostPostId) {
      retweets {
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
`;

export const FOLLOWS_UNFOLLOWS = gql`
  mutation Mutation($followHandle: String) {
    followUnfollowUser(followHandle: $followHandle) {
      name
      followers {
        handle
      }
    }
  }
`;


export const SingleTweet = (props: {
  author: User | undefined, 
  currentUser: User | undefined, 
  tweet: Post |undefined, updatePage: any}) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showComments, setShowComments] = useState(false)
 
  const [likePost] = useMutation(LIKE_POST, {
    variables: {
      likePostPostId: props.tweet && props.tweet.id
    }, refetchQueries: window.location.pathname === "/home" || window.location.pathname === "/"
    ? [
      FOLLOWINGPOSTS,
      "followsTweets"
    ]
    : [ 
      GETUSER,
      "getUserProfile"
    ]
  })

  const [retweetPost] = useMutation(RETWEET_POST, {
    variables: {
      retweetPostPostId: props.tweet && props.tweet.id
    }, refetchQueries: window.location.pathname === "/home" || window.location.pathname === "/"
    ? [
      FOLLOWINGPOSTS,
      "followsTweets"
    ]
    : [ 
      GETUSER,
      "getUserProfile"
    ],
    onCompleted: () => alert("View your retweets on your profile.")
  })

  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      postId: props.tweet && props.tweet.id
    },
    refetchQueries: window.location.pathname === "/home"  || window.location.pathname === "/"
    ? [
      FOLLOWINGPOSTS,
      "followsTweets"
    ]
    : [ 
      GETUSER,
      "getUserProfile"
    ]
  })

  const [followsUnfollows] = useMutation(FOLLOWS_UNFOLLOWS, {
    variables: {
      followHandle: props.author?.handle
    },
    onCompleted: () => {window.location.reload()}
  })
  
  return (
    <div id="single-tweet" className={`border-b ${!showMenu && "hover:bg-gray-50"} flex flex-col items-center`}>
      {showComments && <TweetComments currentUser={props.currentUser} tweet={props.tweet} close={() => setShowComments(false)}/>}
      <div className="flex flex-row mt-4 w-full"> 
      <Link to={props.author && props.author.handle ? `/${props.author.handle.slice(1)}` : '/'} className="user-profile-link">
        {props.author && props.author.profilePic ?
        <img src={props.author && props.author.profilePic} className="w-14 h-auto mx-3 rounded-full"/>:
        <UserCircleIcon className="w-12 h-12 ml-3"/>}
      </Link>
      <div className="ml-3 flex flex-col w-full">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col sm:flex-row ">
            <Link to={props.author && props.author.handle ? `/${props.author.handle.slice(1)}` : '/'} className="user-profile-link flex flex-row flex-wrap">
              <h3 className="font-bold hover:underline">{props.author && props.author.name}</h3>
              <h4 className="text-gray-500 ml-1">{props.author && props.author.handle}</h4>
            </Link>
            <span className="hidden sm:flex text-gray-500 ml-1">•</span>
            <h4 className="text-gray-500 ml-1 hover:underline">{props.tweet && String(fromUnixTime(props.tweet.postDate)).slice(0, 15)}</h4>
          </div>
          <div
          id="tweet-options"
          onBlur={() => setTimeout(() => setShowMenu(false), 100)}
          onFocus={() => setShowMenu(true)}
          >
            {showMenu && <div id="options-button" className="shadow z-10 bg-white absolute -ml-24 w-32 rounded">
            { props.author && props.currentUser && props.currentUser.handle === props.author.handle 
            ? <button 
            id="delete-button"
            className="hover:bg-gray-50 p-2" 
            onClick={async() => {
              await deletePost();
              props.updatePage()
              }}>
              Delete Tweet
              </button> 
              : props.currentUser && props.currentUser?.follows.filter((i: any) => i.handle === props.author?.handle).length > 0
              ? <button className="unfollow-post hover:bg-gray-50 p-2" onClick={() => followsUnfollows()}>Unfollow</button>
              : <button className="follow-post hover:bg-gray-50 p-2" onClick={() => followsUnfollows()}>Follow</button>}
          </div>}
          <button 
          className="post-options text-gray-500 hover:bg-blue-50 hover:text-blue-500 rounded-full p-1 mr-2">
            •••
          </button>
          </div>
        </div>
        <div>
        <p className=" mr-2">{props.tweet && props.tweet.content}</p>
        </div>
      </div>
      </div>
      <div className="flex flex-row justify-between px-12 my-2 text-gray-500 w-full">
          <button className="show-comments flex flex-row items-center hover:text-blue-500" onClick={() => setShowComments(true)}>
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
            <p id="retweet-count">{props.tweet && props.tweet.retweets?.length > 0 ? props.tweet.retweets.length : null}</p>
          </button>
          <button 
          id="like-button"
          className="flex flex-row  items-center hover:text-red-500"
          onClick={async () => {
          await likePost();
          }}>
            <HeartIcon className="hover:bg-red-50 tweet-options"/>
            <p id="like-count">
              {props.tweet?.likes && props.tweet.likes.length > 0 
              ? props.tweet.likes.length 
              : null}</p>
          </button>
        </div>
    </div>
  )
}