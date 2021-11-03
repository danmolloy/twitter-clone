import { Loading } from "./Loading"
import { gql, useQuery, useMutation } from "@apollo/client"
import { Error } from "./Error";
import { SingleNotification } from "./SingleNotification";

const GET_NOTIFICATIONS = gql`
  query Query {
    currentUser {
      notifications {
        id
        text
        sentFromUser
        read
        tweetId
      }
    }
  }
`;

export const Notifications = () => {
  const { loading, error, data } = useQuery(GET_NOTIFICATIONS)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <div id="notifications-component" className="w-full h-full flex flex-col">
      <div className="flex flex-col border-b">
        <h2 className="text-xl font-semibold pl-3 pt-3 pb-3">
          Notifications
        </h2>
      </div>
      <div className="w-full h-full flex flex-col">
        <SingleNotification notification={data && data.currentUser.notifications[0]}/>
      </div>
    </div>
  )
}