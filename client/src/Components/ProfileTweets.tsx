import { User, Post } from '../types'
import { SingleTweet } from './SingleTweet'
import { Link } from "react-router-dom"

export const ProfileTweets = (props: {
  getUserProfile: User | undefined, 
  tweetFilter: any, 
  setTweetFilter: any,
  updatePage: any,
  currentUser: User | undefined,
}) => {
  return (
    <div id="profile-tweets" className="w-full flex flex-col">
      <div className="w-full h-12 mt-4 flex flex-row">
      <Link 
      className={props.tweetFilter === 'tweets' ? 'selected-tweet-filter' : 'deselected-tweet-filter'}
      to={props.getUserProfile ? `/${props.getUserProfile.handle.slice(1)}` : '/home'}
      onClick={() => props.setTweetFilter('tweets')}>
        Tweets 
        {props.tweetFilter === 'tweets' && <span className="tab-line"/>}
      </Link>
      <Link 
      className={props.tweetFilter === 'replies' ? 'selected-tweet-filter' : 'deselected-tweet-filter'}
      to={props.getUserProfile ? `/${props.getUserProfile.handle.slice(1)}/with_replies`: '/home'}
      onClick={() => props.setTweetFilter('replies')}>
        Tweets & Replies
        {props.tweetFilter === 'replies' && <span className="tab-line"/>}
      </Link>
      <Link 
      className={props.tweetFilter === 'media' ? 'selected-tweet-filter' : 'deselected-tweet-filter'} 
      to={props.getUserProfile ? `/${props.getUserProfile.handle.slice(1)}/media`: '/home'}
      onClick={() => props.setTweetFilter('media')}>
        Media
        {props.tweetFilter === 'media' && <span className="tab-line"/>}
      </Link>
      <Link 
      className={props.tweetFilter === 'likes' ? 'selected-tweet-filter' : 'deselected-tweet-filter'}
      to={props.getUserProfile ? `/${props.getUserProfile.handle.slice(1)}/likes`: '/home'}
      onClick={() => props.setTweetFilter('likes')}>
        Likes
        {props.tweetFilter === 'likes' && <span className="tab-line"/>}
      </Link>
      </div>
      <div className="h-auto w-full flex flex-col mt-0">
        {props.getUserProfile && 
        props.getUserProfile.writtenPosts && 
        props.getUserProfile.writtenPosts.length > 0 &&
        props.getUserProfile.writtenPosts.map((tweet: Post) => {
            return <SingleTweet tweet={tweet} author={props.getUserProfile && props.getUserProfile} key={tweet.id} currentUser={props.currentUser} updatePage={props.updatePage}/>;
          })
        }
      </div>
    </div>
  )
}