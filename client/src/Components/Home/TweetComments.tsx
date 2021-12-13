import { useMutation, gql } from '@apollo/client'
import { XCircleIcon } from '@heroicons/react/outline'
import fromUnixTime from 'date-fns/fromUnixTime'
import {  useState } from 'react'
import { FOLLOWINGPOSTS } from './Home'
import { GETUSER } from '../Profile/Profile'
import { Comment, Post, User } from '../../types'

export const POST_COMMENT = gql`
  mutation Mutation($postId: String!, $text: String!) {
    newComment(postId: $postId, text: $text) {
      commentId
      author {
        name
        handle
        profilePic
      }
      time
      text
    }
  }
`;

export const TweetComments = (props: {
  tweet: Post | undefined, 
  currentUser: User | undefined, 
  close: any}) => {
  const [postComment] = useMutation(POST_COMMENT)

  const [commentText, setCommentText] = useState("")

  const handleClick = async () => {
    if (commentText.length > 0) {
      await postComment({
        variables: {
          postId: props.tweet?.id,
          text: commentText
        },
        refetchQueries: window.location.pathname === "/home"  || (/id="home/g).test(document.getElementById("app-page")!.outerHTML)
        ? [FOLLOWINGPOSTS,
          "followsTweets"]
        : [GETUSER,
        "getUserProfile"]
      })
      setCommentText("")
    }
  }

  return (
    <div id="tweet-comments" className="flex flex-col top-0 sm:top-12 border bg-white fixed items-center justify-center h-auto w-auto rounded-lg shadow-md">
      <div className="flex flex-row p-4 w-full border-b ">
        <img src={props.tweet?.author.profilePic} alt={`Profile picture of ${props.tweet?.author.name}`} className="w-14 h-auto rounded-full"/>
        <div className="ml-3 flex flex-col w-full">
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row">
              <div className="flex flex-row flex-wrap">
                <h3 className="font-bold hover:underline">{props.tweet && props.tweet.author.name}</h3>
                <h4 className="text-gray-500 ml-1">{props.tweet && props.tweet.author.handle}</h4>
              </div>
              <span className="sm:flex hidden text-gray-500 ml-1">•</span>
              <h4 className="text-gray-500 ml-1 hover:underline">{props.tweet && String(fromUnixTime(props.tweet.postDate)).slice(0, 15)}</h4>
            </div>
          </div>
          <p>{props.tweet && props.tweet.content}</p>
        </div>
        <button onClick={() => props.close()}>
          <XCircleIcon className="w-10 p-1 h-auto text-red-500 hover:bg-red-50 rounded-full -mt-8 -mr-4 bg-white"/>
        </button>
      </div>
      <div className="flex flex-row mt-4 py-2 justify-between items-center border-b">
        <img src={props.currentUser && props.currentUser.profilePic} alt="Logged in user" className="w-14 h-auto rounded-full"/>
        <input id="comment-input" placeholder="Tweet your reply" maxLength={50} className="comment-input mx-4 h-8 w-full p-1 rounded-full border" value={commentText} onChange={(e) => setCommentText(e.target.value) }/>
        <button id="post-comment-btn" className="reply-button tweet-btn h-8" onClick={() => handleClick()}>Reply</button>
      </div>
      {props.tweet && props.tweet.comments?.map((i: Comment) => {
        return <div key={i.commentId}>
          <div className="flex flex-row border-b py-4">
            <img src={i.author.profilePic} 
            alt={`Profile picture of ${i.author.name}`} 
            className="w-14 h-auto rounded-full"/>
            <div className="ml-3 flex flex-col w-full">
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row">
                  <div className="flex flex-row">
                    <h3 className="font-bold hover:underline">{i.author.name}</h3>
                    <h4 className="text-gray-500 ml-1">{i.author.handle}</h4>
                  </div>
                  <span className="text-gray-500 ml-1">•</span>
                  <h4 className="text-gray-500 ml-1 hover:underline">{String(fromUnixTime(Number(i.time))).slice(0, 15)}</h4>
                </div>
              </div>
              <p>{i.text}</p>
            </div>
          </div>
        </div>
      })}
    </div>
  )
}