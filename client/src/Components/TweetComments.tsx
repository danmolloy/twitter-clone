import { useMutation, gql } from '@apollo/client'
import { XCircleIcon } from '@heroicons/react/outline'
import fromUnixTime from 'date-fns/fromUnixTime'
import { useEffect, useState } from 'react'

const POST_COMMENT = gql`
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

export const TweetComments = (props: any) => {
  const [postComment] = useMutation(POST_COMMENT)

  const [commentText, setCommentText] = useState("")

  const handleClick = async () => {
    if (commentText.length > 0) {
      await postComment({
        variables: {
          postId: props.tweet.id,
          text: commentText
        }
      })
      setCommentText("")
    }
  }

  return (
    <div className="flex flex-col border bg-white max-w-full p-4 sm:max-w-4/5 fixed items-center justify-center max-h-3/4 sm:max-h-1/2 h-auto w-auto -mt-48 rounded-lg shadow-md">
      <div className="flex flex-row p-4 w-full border-b">
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
      <div className="flex flex-row mt-4 py-2 justify-between items-center border-b">
        <img src={props.currentUser && props.currentUser.profilePic} className="w-14 h-auto rounded-full"/>
        <input placeholder="Tweet your reply" maxLength={50} className="mx-4 h-8 w-full p-1 rounded-full border" value={commentText} onChange={(e) => setCommentText(e.target.value) }/>
        <button className="tweet-btn h-8" onClick={() => handleClick()}>Reply</button>
      </div>
      {props.tweet && props.tweet.comments.map((i: any) => {
        return <div key={i.commentId}>
          <div className="flex flex-row border-b py-4">
            <img src={i.author.profilePic} className="w-14 h-auto rounded-full"/>
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