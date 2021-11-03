import { Link } from 'react-router-dom'
import fromUnixTime from 'date-fns/fromUnixTime'

export const ChatPreview = (props: any) => {
  return (
    <Link to={`/messages/${props.chat.id}`} className="border-b flex flex-row p-4 justify-between hover:bg-gray-100">
      <div className="flex flex-row">
      <img src={props.chat.users[0].profilePic} className="rounded-full w-12"/>
      <div className="flex flex-col ml-4">
        <h3 className="font-semibold">{props.chat.users[0].name}</h3>
        <div className="flex flex-row">
        <p className={props.chat && props.chat.content.filter((i: any) => 
        i.authorHandle !== props.currentUser.handle
        && i.read === false).length > 0 ? "font-bold": "font-medium"}>
          {`${props.chat.content[props.chat.content.length -1].authorHandle}: 
          ${props.chat.content[props.chat.content.length -1].messageText.slice(0, 20)}`}<span className="text-gray-400"> ...</span>
        </p>
        </div>
      </div>
      </div>
      <p className="text-gray-500">{String(fromUnixTime(Number(props.chat.content[props.chat.content.length -1].time))).slice(0, 21)}</p>
    </Link>
  )
}