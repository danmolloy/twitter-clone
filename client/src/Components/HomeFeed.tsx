import { User, Post } from "../types"
import { SingleTweet } from './SingleTweet'

export const HomeFeed = (props: {
  currentUser: User | undefined, 
  followsTweets: Post[] | undefined, 
  updatePage: any}) => {
  return (
    <div className="h-auto w-full flex flex-col mt-0">
        {props.followsTweets && 
        props.followsTweets.map((tweet: Post) => {
          return <SingleTweet 
          tweet={tweet} 
          key={tweet.id} 
          author={tweet.author} 
          currentUser={props.currentUser && props.currentUser} 
          updatePage={props.updatePage}
          />
        })
        }
      </div>
  )
}