import { ArrowLeftIcon, CogIcon, PlusSmIcon, SearchIcon } from "@heroicons/react/outline"
import { gql, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { Loading } from "./Loading";
import { Error } from "./Error";
import { User } from "../types";
import { ChatPreview } from "./ChatPreview";
import { SearchUsers } from "./SearchUsers";

const GET_CHATS = gql`
  query Query {
    getChats {
      id
      users {
        handle
        name
        profilePic
      }
      content {
        time
        messageText
        authorHandle
        read
        
      }
    }
  }
`;


export const Messages = (props: {currentUser: User | undefined}) => {
  const {loading, error, data} = useQuery(GET_CHATS)
  const [searchUsers, setSearchUsers] = useState(false)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <div >
      <div className="border-b flex flex-row justify-between">
        <h2 className="text-xl font-semibold pl-3 pt-3 pb-3">Messages</h2>
        <div className="flex flex-row">
          <button onClick={() => setSearchUsers(true)}>
            <PlusSmIcon className="w-9 p1 h-auto hover:bg-gray-300 my-2 rounded-full mr-3"/>
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        {searchUsers && <SearchUsers />}
        {data && data.getChats.map((i: any) => {
        return <ChatPreview key={i.id} chat={i} currentUser={props.currentUser}/>
      })}
      </div>
    </div>
  )
}
