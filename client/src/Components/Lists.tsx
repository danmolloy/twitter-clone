import { 
  ArrowLeftIcon, 
  DocumentAddIcon
} from "@heroicons/react/outline"
import { gql, useQuery } from '@apollo/client'
import { ListTile } from "./ListTile"
import { Loading } from "./Loading"

const LIST_QUERY = gql`
  query Query($currentUserHandle: String!) {
    currentUser(handle: $currentUserHandle) {
      Lists {
        ListName
        Description
        ListID
        Private
        Pinned
        Creator {
          name
          handle
          profilePic
        }
        Members {
          handle
          name
          posts {
            id
            content
            postDate
            likes {
              handle
              name
              profilePic
            }
            retweets {
              name
              handle
              profilePic
            }
            comments {
              id
              content
              postDate
              author {
                name
                profilePic
                handle
              }
            }
            author {
              name
              handle
              profilePic
            }
          }
        }
      }
    }
  }
`


export const Lists = (props: any) => {
  const { loading, error, data } = useQuery(LIST_QUERY, {variables: {currentUserHandle: "@dan" }})
  
  if (loading) {
    return <Loading />
  }

  if (error) {
    <p>error</p>
  }

  return (
    <div id="lists">
      <div id="list-header" className="flex flex-row border-b w-full flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <ArrowLeftIcon className="w-12 p-2 h-auto rounded-full hover:bg-gray-300  ml-2 my-2"/>
          <div className="ml-4 mt-2">
            <h2 className="text-xl font-semibold pl-2 pt-0 pb-0">Lists</h2>
            <p className="pl-2 -pt-2 text-xs text-gray-600 mb-1.5">{props.user.handle}</p>
          </div>
        </div>
        <div className="flex flex-row mr-4">
        <DocumentAddIcon className="w-10 p-2 h-auto text-gray-600 hover:bg-gray-300 mr-1 rounded-full" />
        <button className="text-gray-600 rounded-full p-1 mr-2 rounded-full hover:bg-gray-300 p-2">
            •••
        </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-extrabold pl-2 pt-2 pb-1">Your Lists</h2>
        <div className="flex flex-col">
        {data ? 
          data.currentUser.Lists.map((List: {ListName: string, ID: string, Private: boolean, Creator: {}}) => {
          return <ListTile ListName={List.ListName} key={List.ID} private={List.Private} Creator={List.Creator}/>
        }): 
        <p>You haven't created or followed any Lists. When you do, they'll show up here.</p>}
        </div>
      </div>
    </div>
  )
}