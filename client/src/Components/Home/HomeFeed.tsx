import { User, Post } from "../../types"
import { SingleTweet } from './SingleTweet'

export const HomeFeed = (props: {
  currentUser: User | undefined, 
  followsTweets: Post[] | undefined, 
  updatePage: any}) => {
  return (
    <div className="home-feed h-screen w-full flex flex-col mt-0 border-r">
      {props.followsTweets && props.followsTweets.length > 0 
      ? props.followsTweets.map((tweet: Post) => {
        return <SingleTweet 
        tweet={tweet} 
        key={tweet.id} 
        author={tweet.author} 
        currentUser={props.currentUser && props.currentUser} 
        updatePage={props.updatePage}
        />
      }) 
      : <div className="mt-4 ml-4">
          <h3 className="text-xl font-bold">No tweets to show.</h3>
          <p>Find users to follow in Explore.</p> 
        </div>}
      </div>
  )
}