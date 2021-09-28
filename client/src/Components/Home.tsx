import { SparklesIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import { ComposeTweet } from './ComposeTweet'
import { SingleTweet } from './SingleTweet'
import { gql, useQuery } from '@apollo/client'

const FOLLOWINGPOSTS =  gql`
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

export const Home = (props: any) => {
  const { loading, error, data } = useQuery(FOLLOWINGPOSTS, {variables: {followsTweetsHandle: props.data.currentUser.handle}})

  if (loading) {
    return <p>Loading</p>
  }

  if (error) {
    return <p>Error</p>
  }

  return (
    <div id="home">
      <div className="header border-b border-gray-200 h-14 flex flex-row justify-between">
        <h2 className="text-xl font-semibold p-4">Home</h2>
        <SparklesIcon className="w-10 p-2 my-2 h-auto mr-4 hover:bg-gray-200 rounded-full " />
      </div>
      <ComposeTweet user={props.data.currentUser} />
      <div className="h-auto w-full flex flex-col mt-0">
        {data.followsTweets && 
        data.followsTweets.map((tweet: {id:string, author:{}}) => {
          return <SingleTweet tweet={tweet} key={tweet.id} user={tweet.author} currentUser={props.data.currentUser}/>
        })
        }
      </div>
    </div>
  )
}