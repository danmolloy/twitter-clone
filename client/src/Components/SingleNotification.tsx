import { Link } from "react-router-dom"

export const SingleNotification = (props: any) => {
  return (
    <Link to={`/${props.notification && props.notification.sentFromUser.slice(1)}`} className={props.notification && props.notification.read ? "border-b w-full mt-0 p-6 hover:bg-gray-100" : "hover:bg-gray-200 border-b w-full p-6 font-semibold bg-gray-50"}>
      <p className="">{props.notification && props.notification.text}</p>
    </Link>
  )
}