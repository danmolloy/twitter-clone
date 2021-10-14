import { SparklesIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import { ComposeTweet } from './ComposeTweet'
import { SingleTweet } from './SingleTweet'
import { gql, useQuery } from '@apollo/client'
import { Loading } from './Loading'
import { Error } from './Error'
import { Post, User } from '../types'

export const FOLLOWINGPOSTS =  gql`
query Query($followsTweetsHandle: String!) {
  followsTweets(handle: $followsTweetsHandle) {
    content
    id
    postDate
    author {
      name
      handle
      profilePic
    }
    likes {
      handle
    }
    retweets {
      handle
    }
  }
}
`;

export const Home = (props: {currentUser: User | undefined}) => {
  const { loading, error, data, refetch } = useQuery(FOLLOWINGPOSTS, {variables: {followsTweetsHandle: props.currentUser && props.currentUser.handle}})

  const updatePage = () => {
    refetch()
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <div id="home">
      <div id="home-header" className="header border-b border-gray-200 h-14 flex flex-row justify-between">
        <h2 className="text-xl font-semibold p-4">Home</h2>
        <SparklesIcon className="w-10 p-2 my-2 h-auto mr-4 hover:bg-gray-200 rounded-full " />
      </div>
      <ComposeTweet currentUser={props.currentUser} updatePage={updatePage}/>
      <div className="h-auto w-full flex flex-col mt-0">
        {data.followsTweets && 
        data.followsTweets.map((tweet: Post) => {
          return <SingleTweet tweet={tweet} key={tweet.id} author={tweet.author} currentUser={props.currentUser && props.currentUser} updatePage={updatePage}/>
        })
        }
      </div>
    </div>
  )
}