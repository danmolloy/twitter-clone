import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { Loading } from "../App/Loading"
import { Error } from "../App/Error"
import { User, GetUserProfileData, GetUserProfileVar  } from "../../types"
import { ProfileTweets } from "./ProfileTweets"
import { ProfileHeader } from "./ProfileHeader"
import { ProfileDetails } from "./ProfileDetails"

export const GETUSER = gql`
  query Query($getUserProfileHandle: String!) {
    getUserProfile(handle: $getUserProfileHandle) {
      name
      handle
      blurb
      joinDate
      bgPic
      profilePic
      follows {
        handle
        name
        profilePic
      }
      followers {
        handle
        name
        profilePic
      }
      writtenPosts {
        id
        content
        postDate
        authorHandle
        author {
          name
          handle
          profilePic
        }
        likes {
          handle
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
        retweets {
          handle
        }
      }
      retweets {
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
`;

export const Profile = (props: {currentUser: User | undefined}) => {
  const {userHandle} = useParams<{ userHandle: string}>()
  const { loading: loadingProfileData, error: errorProfileData, data: dataProfileData, refetch } = useQuery<GetUserProfileData, GetUserProfileVar>(GETUSER, { variables: { getUserProfileHandle: `@${userHandle}` }})
  const [tweetFilter, setTweetFilter] = useState('tweets')

  const updatePage = () => {
    refetch()
  }

  useEffect(() => {
    if (document.location.href.includes('retweets')) {
      setTweetFilter('retweets')
    }
  }, [])

  if (loadingProfileData) {
    <Loading />
  }

  if (errorProfileData) {
    console.log(errorProfileData)
    return <Error />
  }

  return (
    <div id="profile-component"className="border-r w-full mr-2">
      <ProfileHeader getUserProfile={dataProfileData?.getUserProfile}/>
      <ProfileDetails 
        getUserProfile={dataProfileData?.getUserProfile}
        profileHandle={userHandle}
        currentUser={props.currentUser && props.currentUser}
      />
      <ProfileTweets 
        getUserProfile={dataProfileData && dataProfileData.getUserProfile} 
        tweetFilter={tweetFilter} 
        setTweetFilter={setTweetFilter}
        updatePage={() => updatePage()}
        currentUser={props.currentUser && props.currentUser} 
      />
    </div>
  )
}