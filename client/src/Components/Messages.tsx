import { ArrowLeftIcon, CogIcon, PlusSmIcon, SearchIcon } from "@heroicons/react/outline"
import { gql, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { Loading } from "./Loading";
import { Error } from "./Error";

const MESSAGES = gql`
  query Query($currentUserHandle: String!) {
    currentUser(handle: $currentUserHandle) {
      Messages {
        User {
          name
          handle
          profilePic
        }
        Messages {
          Content
          DateSent
          Read
        }
        ID
      }
    }
  }
`;

export const Messages = (props: any) => {
  const { loading, error, data } = useQuery(MESSAGES, {variables: {currentUserHandle: props.currentUser.handle }});  
  const [searchBarFocused, setSearchBarFocused] = useState(false)

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
          <CogIcon className="w-9 p-1 h-auto hover:bg-gray-300 my-2 rounded-full mr-3"/>
          <PlusSmIcon className="w-9 p1 h-auto hover:bg-gray-300 my-2 rounded-full mr-3"/>
        </div>
      </div>
      <div className="flex flex-row w-full border-b">
        <ArrowLeftIcon className="w-12 p-2 hover:bg-gray-300 rounded-full h-auto ml-3 my-4" />
        <input id="msg-search" className="p-4 border ml-2 h-10 w-11/12 rounded-full my-4 focus:outline-none focus:border-blue-500" placeholder="Search for people or groups">
        </input>
      </div>
        {searchBarFocused ?
              <div className="w-full h-full flex flex-col text-center">
                <p className="text-s text-gray-600 mt-6">Try searching for people or groups</p>
                </div>:
                data ? data.currentUser.Messages.map((message: {ID: string, User: UserObj, Messages: MessageObj[]}) => {
                  return <div key={message.ID} className="flex flex-row hover:bg-gray-100 justify-between">
                    <div className="flex flex-row">
                    <img src={message.User.profilePic} className="w-12 h-auto rounded-full ml-4 my-4"/>
                    <div className="flex flex-col my-4 ml-4">
                      <h3 className="font-semibold">{message.User.name}</h3>
                      <p className="text-sm">{message.Messages[message.Messages.length-1].Content}</p>
                    </div>
                    </div>
                    <p className="mt-2 mr-2 text-gray-600 text-sm">{message.Messages[message.Messages.length-1].DateSent}</p>
                    </div>
                }) : null
                }

    </div>
  )
}

interface UserObj {
  name: string
  handle: string
  profilePic: string
}

interface MessageObj {
  Content: string
  DateSent: string
  Read: boolean
}