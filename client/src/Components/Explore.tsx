import { Error } from "./Error"
import { gql, useQuery } from "@apollo/client"

const GET_USER = gql`
  query Query {
    loggedInUser {
      handle
      name
    }
  }
`;


export const Explore = () => {
  const {loading, error, data} = useQuery(GET_USER)
  return (
    <div className="w-full h-full" id="explore-component">
     <p className="text-center text-gray-500">This feature has not yet been implemented.</p>
     {data && JSON.stringify(data)}
    </div>
  )
}