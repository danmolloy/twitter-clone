import { 
  ArrowLeftIcon, 
  DocumentAddIcon
} from "@heroicons/react/outline"
import { gql, useQuery } from '@apollo/client'
import { ListTile } from "./ListTile"
import { Loading } from "./Loading"
import { Error } from "./Error"
import { User, ListData, List, CurrentUserVar } from "../types"

export const LIST_QUERY = gql`
  query Query($getAuthoredListsHandle: String) {
    getAuthoredLists(handle: $getAuthoredListsHandle) {
      id
      name
      picture
      description
      private
      authorHandle
      author {
        name
        profilePic
      }
      members {
        handle
      }
      followers {
        handle
      }
    }
  }
`


export const Lists = (props: {currentUser: User | undefined}) => {
  const { loading, error, data } = useQuery<ListData, CurrentUserVar>(LIST_QUERY, {variables: {currentUserHandle: `${props.currentUser && props.currentUser.handle}` }})
  
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <div id="lists">
      <div id="list-header" className="flex flex-row border-b w-full flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <ArrowLeftIcon className="w-12 p-2 h-auto rounded-full hover:bg-gray-300  ml-2 my-2"/>
          <div className="ml-4 mt-2">
            <h2 className="text-xl font-semibold pl-2 pt-0 pb-0">Lists</h2>
            <p className="pl-2 -pt-2 text-xs text-gray-600 mb-1.5">{props.currentUser && props.currentUser.handle}</p>
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
          <p className="text-center text-gray-500">This feature has not yet been implemented.</p>: 
        <p>You haven't created or followed any Lists. When you do, they'll show up here.</p>}
        </div>
      </div>
    </div>
  )
}