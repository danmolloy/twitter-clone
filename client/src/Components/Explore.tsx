import { Error } from "./Error"
import { gql, useQuery } from "@apollo/client"
import { UserExplore } from "./UserExplore";
import { ExploreUser } from "../types";

const ALL_USERS = gql`
  query Query {
    getAllUsers {
      name
      handle
      blurb
      profilePic
      followers {
        handle
      }
    }
  }
`;


export const Explore = (props: {currentUserHandle: string | undefined}) => {
  const {loading, error, data} = useQuery(ALL_USERS)

  return (
    <div className="w-full h-full" id="explore-component">
      {data && data.getAllUsers.map((i: ExploreUser) => {
        return <UserExplore currentUserHandle={props.currentUserHandle && props.currentUserHandle} user={i} key={i.handle}/>
      })}
    </div>
  )
}