import { useQuery, gql } from '@apollo/client'
import { User, CurrentUserData, Post } from '../types'
import { Error } from './Error'
import { Loading } from './Loading'
import { SingleTweet } from './SingleTweet'

export const BOOKMARKS = gql`
  query Query($currentUserHandle: String!) {
    currentUser(handle: $currentUserHandle) {
      bookmarks {
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
  }
`


export const Bookmarks = (props: {currentUser: User | undefined}) => {
  const { loading, error, data, refetch } = useQuery(BOOKMARKS, {variables: {currentUserHandle: "@danmolloy" }})

  const updatePage = () => {
    refetch()
  }

  if (loading) {
    <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <div>
      <div className="border-b">
        <h2 className="text-xl font-semibold pl-2 pt-2 pb-0">Bookmarks</h2>
        <p className="user pl-2 -pt-2 text-xs text-gray-600 mb-1.5">{props.currentUser && props.currentUser.handle}</p>
      </div>
      {data && props.currentUser ? 
      data.currentUser.bookmarks.map((post: Post) => {
            return <SingleTweet tweet={post} author={post.author} key={post.id} currentUser={props.currentUser} updatePage={updatePage}/>;
          }) :
          <div className="flex flex-col items-center">
        <div className="flex flex-col w-1/2 pt-8">
        <h3 className="text-3xl font-bold">
        You haven't added any Tweets to your Bookmarks yet
      </h3> 
        <p className="text-s text-gray-600">When you do, they'll show up here.</p>
        </div>
      </div>
          }
    </div>
  )
}

