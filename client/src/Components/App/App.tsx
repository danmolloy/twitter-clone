import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { Home } from '../Home/Home'
import { Explore } from '../Explore/Explore'
import { Messages } from '../Messages/Messages'
import { Notifications } from '../Notifications/Notifications'
import { Profile } from '../Profile/Profile'
import { Sidebar } from "./Sidebar";
import { useQuery, gql } from '@apollo/client'
import { ComposeTweet } from "../Home/ComposeTweet";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { CurrentUserData, CurrentUserVar } from '../../types'
import { SignIn } from "./SignIn";
import { AUTH_TOKEN } from '../../constants'
import { Chat } from "../Messages/Chat";

export const CURRENTUSER = gql`
query Query {
  currentUser {
    name
    handle
    blurb
    joinDate
    bgPic
    profilePic
    chats {
      content {
        read
      }
    }
    follows {
      handle
    }
    followers {
      handle
    }
    notifications {
      id
      text
      sentFromUser
      read
      tweetId
    }
    writtenPosts {
      id
      content
      postDate
      likes {
        handle
      }
    }
  }
}
`;

function App() {
  const { loading, error, data } = useQuery<CurrentUserData, CurrentUserVar>(CURRENTUSER)
  const authToken = localStorage.getItem(AUTH_TOKEN)

  if (!authToken) {
    return  <SignIn />
  }

  if (loading) {
    return <Loading />
  }

  if (error ) {
    console.log(error)
    return <Error />
  }

  return (
    <Router>
      <div id="main-content" className="flex flex-row w-screen h-screen justify-start">
        {authToken && <Sidebar />}
        <div className="sm:ml-24 md:ml-60 mb-0 w-full max-w-2xl sm:mr-2 md:mr-0">
        <Switch>
          <Route path="/explore">
            <Explore currentUserHandle={data && data.currentUser.handle}/>
          </Route>
          <Route path="/home">
            <Home currentUser={data && data.currentUser}/>
          </Route>
          <Route path="/messages/:chatId">
            <Chat currentUser={data && data.currentUser}/>
          </Route>
          <Route path="/messages">
            <Messages currentUser={data && data.currentUser}/>
          </Route>
          <Route exact path="/login">
            <SignIn />
          </Route>
          <Route path="/notifications" component={Notifications} />
          <Route path={'/:userHandle'}>
            <Profile currentUser={data && data.currentUser}/>
          </Route>
          <Route path="/">
            <Redirect to={authToken ? "/home" : "/login"} />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
