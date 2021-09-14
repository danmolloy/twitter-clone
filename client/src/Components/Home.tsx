import { SparklesIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import { ComposeTweet } from './ComposeTweet'
import { SingleTweet } from './SingleTweet'
import { gql, useQuery } from '@apollo/client'

const FOLLOWINGPOSTS =  gql`
  query Query($followingPostsHandle: [String!]) {
    followingPosts(handle: $followingPostsHandle) {
      posts {
        author {
          name
          handle
          profilePic
        }
        postDate
        content
        id
        likes {
          name
          handle
        }
        retweets {
          name
          handle
        }
        comments {
          id
          content
          postDate
          author {
            name
            handle
            profilePic
          }
        }
      }
    }
    
  }
`;

export const Home = (props: any) => {
  const { loading, error, data } = useQuery(FOLLOWINGPOSTS, {variables: {followingPostsHandles: props.data.currentUser.following}})

  if (loading) {
    return <p>Loading</p>
  }

  if (error) {
    return <p>Error</p>
  }

  return (
    <div id="home" className="sm:ml-24 mb-0 border-r w-full max-w-2xl mr-2">
      <div className="header border-b border-gray-200 h-14 flex flex-row justify-between">
        <h2 className="text-xl font-semibold p-4">Home</h2>
        <SparklesIcon className="w-10 p-2 my-2 h-auto mr-4 hover:bg-gray-200 rounded-full " />
      </div>
      <ComposeTweet user={props.data.currentUser}/>
      <div className="h-auto w-full flex flex-col mt-0">
        {data.followingPosts[0].posts.length > 0 &&
          data.followingPosts[0].posts.map((post: { author: any, content: string, id: string; }) => {
            return <SingleTweet tweet={post} user={post.author} key={post.id} />;
          })
        }
      </div>
    </div>
  )
}