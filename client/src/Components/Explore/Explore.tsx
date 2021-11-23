import { Error } from "../App/Error"
import { gql, useQuery } from "@apollo/client"
import { UserExplore } from "./UserExplore";
import { ExploreUser } from "../../types";
import { Header } from "../App/Header";
import { Loading } from "../App/Loading";

export const ALL_USERS = gql`
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

  if (error) {
    console.log(error)
    return <Error />
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="w-full h-screen" id="explore-component">
      <Header pageTitle="Explore" blurb="A complete list of users"/>
      <div className="border-r min-h-screen">
      {data && data.getAllUsers.map((i: ExploreUser) => {
        return <UserExplore currentUserHandle={props.currentUserHandle && props.currentUserHandle} user={i} key={i.handle}/>
      })}
      </div>
    </div>
  )
}