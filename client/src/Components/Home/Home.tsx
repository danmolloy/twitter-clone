import { ComposeTweet } from './ComposeTweet'
import { gql, useQuery } from '@apollo/client'
import { Loading } from '../App/Loading'
import { Error } from '../App/Error'
import { User } from '../../types'
import { HomeFeed } from './HomeFeed'

export const FOLLOWINGPOSTS =  gql`
  query Query {
    followsTweets {
      content
      id
      postDate
      author {
        name
        handle
        profilePic
      }
      comments {
        commentId
        text
        time
        author {
          name
          handle
          profilePic
        }
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
  const { loading, error, data, refetch } = useQuery(FOLLOWINGPOSTS)


  const updatePage = () => {
    refetch()
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.log(error)
    return <Error />
  }

  return (
    <div id="home border-r min-h-screen border-r">
      <div id="home-header" className="home-header border-r">
        <h2 className="h2 p-4">Home</h2>
      </div>
      <ComposeTweet currentUser={props.currentUser} />
      <HomeFeed updatePage={updatePage} currentUser={props.currentUser} followsTweets={data && data.followsTweets} />
    </div>
  )
}