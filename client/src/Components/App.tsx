import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import { Home } from './Home'
import { Explore } from './Explore'
import { Bookmarks } from './Bookmarks'
import { Messages } from './Messages'
import { Notifications } from './Notifications'
import { Profile } from './Profile'
import { Sidebar } from "./Sidebar";
import { useQuery, gql } from '@apollo/client'
import { ComposeTweet } from "./ComposeTweet";
import { RightBar }  from './RightBar'
import { Loading } from "./Loading";
import { Error } from "./Error";
import { CurrentUserData, CurrentUserVar } from '../types'
import { SignIn } from "./SignIn";
import { AUTH_TOKEN } from '../constants'
import { Chat } from "./Chat";

export const CURRENTUSER = gql`
query Query {
  currentUser {
    name
    handle
    blurb
    joinDate
    bgPic
    profilePic
    follows {
      handle
    }
    followers {
      handle
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
    return <Error />
  }

  return (
    <Router>
      <div id="main-content" className="flex flex-row w-screen h-screen justify-start">
        {authToken && <Sidebar currentUser={data && data.currentUser}/>}
        <div className="sm:ml-24 md:ml-60 mb-0 border-r w-full max-w-2xl sm:mr-2">
        <Switch>
          <Route path="/compose/tweet">
            <ComposeTweet currentUser={data && data.currentUser} updatePage={() => alert('Posted!')}/>
          </Route>
          <Route path="/explore">
            <Explore currentUserHandle={data && data.currentUser.handle}/>
          </Route>
          <Route path="/home">
            <Home currentUser={data && data.currentUser}/>
          </Route>
          <Route path="/bookmarks">
            <Bookmarks currentUser={data && data.currentUser} />
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
          <RightBar />
        </div>
    </Router>
  );
}

export default App;
