import { useQuery, gql, useMutation} from "@apollo/client"
import { XCircleIcon } from "@heroicons/react/outline";
import { Error } from "../App/Error";
import { Loading } from "../App/Loading";

export const GET_FOLLOWING = gql`
  query Query {
    currentUser {
      follows {
        name
        handle
        profilePic
      }
    }
  }
`;

export const GET_CREATE_CHAT = gql`
  mutation Mutation($handle: String!) {
    createOrGetChat(handle: $handle) {
      id
    }
  }
`;

export const SearchUsers = (props: {close: any}) => {
  const { loading, error, data } = useQuery(GET_FOLLOWING)
  const [createOrGetChat, {data: chatData}] = useMutation(GET_CREATE_CHAT)
  
  const handleClick = async (userHandle: string) => {
    await createOrGetChat({variables: {
      handle: userHandle
    }})
    if (chatData) {
      window.location.assign(`/messages/${chatData.createOrGetChat.id}`)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.log(error)
    return <Error />
  }

  return (
    <div className="w-3/4 sm:w-1/2 border shadow mt-4 z-10 fixed bg-white">
      <div className="border-b shadow-sm flex flex-row justify-between">
        <h2 className="font-semibold text-lg p-2">Send message to:</h2>
        <button onClick={() => props.close()}>
          <XCircleIcon className="w-10 p-1 h-auto text-red-500 hover:bg-red-50 rounded-full mr-2"/>
        </button>
      </div>
      {data && data.currentUser.follows.map((i: any) => 
        <button key={i.handle} onClick={() => handleClick(i.handle)} className="chat-link border-b w-full hover:bg-gray-100 flex flex-row items-center p-2">
          <img src={i.profilePic} className="w-8 h-auto rounded-full"/>
          <p className="px-2">{i.name}</p>
        </button>
      )}
      <div className="m-8">
        <h3 className="text-xl font-bold">You can only contact users you follow.</h3>
        <p>Find others in Explore.</p> 
      </div>
    </div>
  )
}