import { Link } from 'react-router-dom'
import fromUnixTime from 'date-fns/fromUnixTime'

export const ChatPreview = (props: any) => {
  return (
    <Link to={`/messages/${props.chat.id}`} className="border-b flex flex-row p-4 justify-between hover:bg-gray-100 w-full">
      <div className="flex flex-row">
      <img src={props.chat.users.filter((i: any)=> i.handle !== props.currentUser.handle)[0].profilePic} className="rounded-full w-12"/>
      <div className="flex flex-col ml-4">
        <h3 className="font-semibold">{props.chat.users.filter((i: any)=> i.handle !== props.currentUser.handle)[0].name}</h3>
        <div className="flex flex-row">
          {props.chat && props.chat.content.length > 0 
          ? 
       <p className={props.chat && props.chat.content.filter((i: any) => 
        i.authorHandle !== props.currentUser.handle
        && i.read === false).length > 0 ? "font-bold": "font-normal"}>
          {`${props.chat.content[props.chat.content.length -1].authorHandle}: 
          ${props.chat.content[props.chat.content.length -1].messageText}`
        }{props.chat && props.chat.content[props.chat.content.length -1].messageText.length > 19 && <span className="text-gray-400"> ...</span>}
        </p>
        : <p className="text-gray-500">No messages sent</p> }
        </div>
      </div>
      </div>
{props.chat && props.chat.content.length > 0 
          &&        <p className="text-gray-500">{String(fromUnixTime(Number(props.chat.content[props.chat.content.length -1].time))).slice(0, 21)}</p>
 }    </Link>
  )
}