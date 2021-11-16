import { Link } from "react-router-dom"
import fromUnixTime from 'date-fns/fromUnixTime'

export const SingleNotification = (props: any) => {
  return (
    <Link to={`/${props.notification && props.notification.sentFromUser.slice(1)}`} className={props.notification && props.notification.read ? "flex flex-row justify-between border-b w-full mt-0 p-6 hover:bg-gray-100" : "flex flex-row justify-between hover:bg-gray-200 border-b w-full p-6 font-semibold bg-gray-50"}>
      <p className="">{props.notification && props.notification.text}</p>
      <p className="text-gray-500">{props.notification && String(fromUnixTime(Number(props.notification.time))).slice(0, 15)}</p>
    </Link>
  )
}