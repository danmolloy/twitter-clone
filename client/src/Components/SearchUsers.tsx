import { useQuery, gql} from "@apollo/client"
import { Link } from "react-router-dom";
import { Error } from "./Error";
import { Loading } from "./Loading";

const GET_FOLLOWING = gql`
  query Query {
    currentUser {
      follows {
        name
        handle
      }
    }
  }
`;

export const SearchUsers = () => {
  const {loading, error, data} = useQuery(GET_FOLLOWING)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <div className="w-3/4 h-3/4 border">
      {data && data.currentUser.follows.map((i: any) => 
      <button key={i.handle} onClick={() => {}}>
        {i.name}
      </button>
      )}
    </div>
  )
}