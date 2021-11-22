import { User, Post } from '../../types'
import { SingleTweet } from '../Home/SingleTweet'
import { Link } from "react-router-dom"

export const ProfileTweets = (props: {
  getUserProfile: User | undefined, 
  tweetFilter: any, 
  setTweetFilter: any,
  updatePage: any,
  currentUser: User | undefined,
}) => {
  return (
    <div id="profile-tweets" className="w-full flex flex-col items-center min-h-screen">
      <div className="w-full h-12 mt-4 flex flex-row">
      <Link 
      className={props.tweetFilter === 'tweets' ? 'selected-tweet-filter' : 'deselected-tweet-filter'}
      to={props.getUserProfile ? `/${props.getUserProfile.handle.slice(1)}` : '/home'}
      onClick={() => props.setTweetFilter('tweets')}>
        Tweets 
        {props.tweetFilter === 'tweets' && <span className="tab-line"/>}
      </Link>
      <Link 
        className={props.tweetFilter === 'retweets' ? 'selected-tweet-filter' : 'deselected-tweet-filter'}
      to={props.getUserProfile ? `/${props.getUserProfile.handle.slice(1)}/retweets` : `/home`}
      onClick={() => props.setTweetFilter('retweets')}>
        Retweets
        {props.tweetFilter === 'retweets' && <span className="tab-line"/>}
      </Link>
      </div>
      {props.tweetFilter === 'retweets' 
      ? <div className="h-full w-full flex flex-col mt-0">
      {props.getUserProfile?.retweets && 
      props.getUserProfile.retweets.length > 0 &&
      props.getUserProfile.retweets.map((tweet: Post) => {
          return <SingleTweet tweet={tweet} author={tweet.author} key={tweet.id} currentUser={props.currentUser} updatePage={props.updatePage}/>;
        })
      }
    </div>
      : <div className="h-full w-full flex flex-col mt-0">
        {props.getUserProfile && 
        props.getUserProfile.writtenPosts && 
        props.getUserProfile.writtenPosts.length > 0 &&
        props.getUserProfile.writtenPosts.map((tweet: Post) => {
            return <SingleTweet tweet={tweet} author={props.getUserProfile && props.getUserProfile} key={tweet.id} currentUser={props.currentUser} updatePage={props.updatePage}/>;
          })
        }
      </div>}
      {props.getUserProfile?.handle === props.currentUser?.handle 
      && props.getUserProfile?.writtenPosts.length === 0 
      && props.tweetFilter === "tweets" 
      ? <div className="mt-4">
        <h3 className="text-xl font-bold">You haven't posted any tweets.</h3>
        <p>When you do, they'll appear here.</p> 
      </div>
      : props.getUserProfile?.handle === props.currentUser?.handle 
      && props.getUserProfile?.retweets.length === 0 
      && props.tweetFilter === "retweets" ?
      <div className="mt-4">
        <h3 className="text-xl font-bold">You haven't retweeted any tweets.</h3>
        <p>When you do, they'll appear here.</p> 
      </div> 
      : props.getUserProfile?.handle !== props.currentUser?.handle
      && props.getUserProfile?.writtenPosts.length === 0 
      && props.tweetFilter === "tweets" 
      ? <div className="mt-4">
          <h3 className="text-xl font-bold">This user hasn't posted any tweets.</h3>
          <p>When they do, they'll appear here.</p> 
        </div>
      : props.getUserProfile?.handle !== props.currentUser?.handle 
      && props.getUserProfile?.retweets.length === 0 
      && props.tweetFilter === "retweets" ?
        <div className="mt-4">
          <h3 className="text-xl font-bold">This user hasn't retweeted any posts.</h3>
          <p>When they do, they'll appear here.</p> 
        </div>
      : null
      }
    </div>
  )
}