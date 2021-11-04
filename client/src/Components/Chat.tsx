import { ArrowLeftIcon } from "@heroicons/react/outline"
import { Link, useParams } from "react-router-dom"
import { useQuery, useMutation, gql } from '@apollo/client'
import { Loading } from "./Loading"
import { Error } from "./Error"
import { ChatMessage } from "./ChatMessage"
import { useEffect, useState } from "react"


const GET_CHAT_BY_ID = gql`
  query Query($chatId: String!) {
    getChatById(chatId: $chatId) {
      id
      content {
        messageText
        authorHandle
        messageId
        read
        author {
          name
          profilePic
        }
      }
      users {
        handle
        name
        profilePic
      }
    }
  }
`;

const READ_MESSAGE = gql`
  mutation Mutation($chatId: String!) {
    readMessages(chatId: $chatId) {
      count
    }
  }
`;

const NEW_MESSAGE = gql`
  mutation Mutation($content: String!, $chatId: String!) {
    newMessage(content: $content, chatId: $chatId) {
      author {
        name
        profilePic
      }
      messageId
      messageText
      read
      authorHandle
    }
  }
`;

export const Chat = (props: any) => {
  const [newMessage, setNewMessage] = useState("")
  let { chatId } = useParams<{chatId: string}>()
  const { loading, error, data, refetch } = useQuery(GET_CHAT_BY_ID, {variables: { chatId: chatId}})
  const [sendMessage] = useMutation(NEW_MESSAGE, {variables: {
    content: newMessage,
    chatId: chatId
    },
    onCompleted: () => refetch()
  })
  const [readMessage] = useMutation(READ_MESSAGE, {variables: { chatId: chatId}})

  const handleClick = async () => {
    await sendMessage();
    setNewMessage("");
  }

  useEffect(() => {
    readMessage()
  }, [])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div id="chat-header" className=" border-b p-2 flex flex-row items-center">
        <Link to="/messages">
        <ArrowLeftIcon className="w-8"/>
        </Link>
        <img src={data && `${data.getChatById.users.filter((i: any) => i.handle !== props.currentUser.handle)[0].profilePic}`} className="rounded-full w-12 h-12 ml-4" />
        <h3 className="ml-4 font-semibold">
        {data && data.getChatById.users.map((i: any) => i.name !== props.currentUser.name && i.name)}
        </h3>
      </div>
      <div id="chat-window" className=" w-full h-full">
        {data && data.getChatById.content.map((i: any) => {
          return <ChatMessage message={i} key={i.messageId} currentUser={props.currentUser}/>
        })}
      </div>
      <div className="flex h-16 w-full justify-center border-t mb-12 sm:mb-0"> 
        <input className="border rounded-full m-4 p-2" placeholder="hello" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
        <button className="tweet-btn" onClick={() => handleClick()}>Send</button>
      </div>
    </div>
  )
}