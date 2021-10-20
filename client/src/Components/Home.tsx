import { SparklesIcon } from '@heroicons/react/outline'
import { ComposeTweet } from './ComposeTweet'
import { gql, useQuery } from '@apollo/client'
import { Loading } from './Loading'
import { Error } from './Error'
import { User } from '../types'
import { HomeFeed } from './HomeFeed'

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
      <div id="home-header" className="home-header">
        <h2 className="h2 p-4">Home</h2>
        <SparklesIcon className="w-10 p-2 my-2 h-auto mr-4 hover:bg-gray-200 rounded-full " />
      </div>
      <ComposeTweet currentUser={props.currentUser} updatePage={updatePage}/>
      <HomeFeed updatePage={updatePage} currentUser={props.currentUser} followsTweets={data && data.followsTweets} />
    </div>
  )
}