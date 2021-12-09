import { ArrowLeftIcon } from "@heroicons/react/outline"
import { Link, useParams, useHistory } from "react-router-dom"
import { useQuery, useMutation, gql } from '@apollo/client'
import { Loading } from "../App/Loading"
import { Error } from "../App/Error"
import { ChatMessage } from "./ChatMessage"
import { useEffect, useState } from "react"
import { GET_USER } from '../App/Sidebar'
import { Author, User } from "../../types"


export const GET_CHAT_BY_ID = gql`
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

export const READ_MESSAGE = gql`
  mutation Mutation($chatId: String!) {
    readMessages(chatId: $chatId) {
      count
    }
  }
`;

export const NEW_MESSAGE = gql`
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

export const Chat = (props: {currentUser: User | undefined}) => {
  const [newMessage, setNewMessage] = useState("")
  let { chatId } = useParams<{chatId: string}>()

  let history = useHistory();

  function handleLink() {
    history.push(`/${data && data.getChatById.users.filter((i: Author) => i.handle !== props.currentUser?.handle)[0].handle.slice(1)}`);
  }
  const { loading, error, data } = useQuery(GET_CHAT_BY_ID, {variables: { chatId: chatId}})
  const [sendMessage] = useMutation(NEW_MESSAGE, {variables: {
    content: newMessage,
    chatId: chatId
    },
    refetchQueries: [
      GET_CHAT_BY_ID,
      "getChatById"
    ]
  })
  const [readMessage] = useMutation(READ_MESSAGE, {variables: { chatId: chatId}})

  const handleClick = async () => {
    await sendMessage();
    setNewMessage("");
  }


  useEffect(() => {
    setTimeout(() => readMessage({
      refetchQueries: [
        READ_MESSAGE,
        "readMessages",
        GET_USER,
        "getNotifications"
      ]
    }), 1000)
  }, [])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  return (
    <div className="border-r min-h-full w-full flex flex-col justify-between ">
      <div id="chat-header" className="border-b border-r p-2 flex flex-row items-center z-10 bg-white w-full fixed max-w-2xl">
        <Link to="/messages">
        <ArrowLeftIcon id="messages-link" className="w-10 hover:bg-gray-100 rounded p-1"/>
        </Link>
        <button className="chat-profile-link flex flex-row items-center hover:bg-gray-100 rounded justify-center" onClick={() => handleLink()}>
          <img src={data && `${data.getChatById.users.filter((i: any) => i.handle !== props.currentUser?.handle)[0].profilePic}`} className="rounded-full w-12 h-12 ml-4" />
          <h3 className="mx-4 font-semibold">
          { data && data.getChatById.users.map((i: any) => i.name !== props.currentUser?.name && i.name)}
          </h3>
        </button>
      </div>
      <div id="chat-window" className=" mt-16 w-full mb-16">
        {data && data.getChatById.content.map((i: any) => {
          return <ChatMessage message={i} key={i.messageId} currentUser={props.currentUser}/>
        })}
      </div>
      <div className="flex flex-row justify-center items-center mb-16 bottom-0 sm:mb-0 flex border-t border-r bg-white z-10 fixed w-full md:-ml-0 max-w-2xl"> 
        <input id="chat-input" className="border rounded-full m-4 p-2" placeholder="hello" value={newMessage} onKeyDown={(e) => e.key === "Enter" && handleClick()} onChange={(e) => setNewMessage(e.target.value)}/>
        <button id="send-msg-btn" className="tweet-btn" onClick={() => handleClick()}>Send</button>
      </div>
    </div>
  )
}