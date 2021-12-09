import { Loading } from "../App/Loading"
import { gql, useQuery, useMutation } from "@apollo/client"
import { Error } from "../App/Error";
import { SingleNotification } from "./SingleNotification";
import { useEffect } from "react";
import { GET_USER } from '../App/Sidebar'

export const GET_NOTIFICATIONS = gql`
  query {
    getNotificationList {
      handle
      notifications {
        id
        text
        time
        sentFromUser
        read
        tweetId
      }
    }
  }
`;
       
export const READ_NOTIFICATIONS = gql`
  mutation Mutation {
    readNotifications {
      count
    }
  }
`;

export const Notifications = () => {
  const { loading, error, data } = useQuery(GET_NOTIFICATIONS)
  const [readNotifications] = useMutation(READ_NOTIFICATIONS)

  useEffect(() => {
    setTimeout(() => 
    readNotifications({
      refetchQueries: [
        GET_NOTIFICATIONS,
        "getNotificationList",
        GET_USER,
        "getNotifications"
      ]}), 1000)
    
  }, [])

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.log(error)
    return <Error />
  }

  return (
    <div id="notifications-component" className="w-full h-full flex flex-col">
      <div className="flex flex-col border-b border-r">
        <h2 className="text-xl font-semibold pl-3 pt-3 pb-3">
          Notifications
        </h2>
      </div>
      <div className="w-full h-screen flex flex-col border-r">
        {data && data.getNotificationList.notifications.map((i: any) => {
          return <SingleNotification notification={i} key={i.id}/>
        })}
      </div>
    </div>
  )
}