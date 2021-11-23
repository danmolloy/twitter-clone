import { PlusSmIcon } from "@heroicons/react/outline"
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import { Loading } from "../App/Loading";
import { Error } from "../App/Error";
import { User, Chat } from "../../types";
import { ChatPreview } from "./ChatPreview";
import { SearchUsers } from "./SearchUsers";

export const GET_CHATS = gql`
  query Query {
    getChats {
      id
      lastMessageTime
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
    <>
      <div className="border-b flex flex-row justify-between border-r">
        <h2 className="text-xl font-semibold pl-3 pt-3 pb-3">Messages</h2>
        <div className="flex flex-row">
          <button onClick={() => setSearchUsers(true)}>
            <PlusSmIcon className="w-9 p1 h-auto hover:bg-gray-300 my-2 rounded-full mr-3"/>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center w-full border-r min-h-screen">
        {searchUsers && <SearchUsers close={() => setSearchUsers(false)}/>}
        {data && data.getChats.map((i: Chat) => {
        return <ChatPreview key={i.id} chat={i} currentUser={props.currentUser}/>
      })}
      </div>
      </>
  )
}
