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
import { Lists } from './Lists'
import { Messages } from './Messages'
import { Notifications } from './Notifications'
import { Profile } from './Profile'
import { Sidebar } from "./Sidebar";
import { useQuery, gql } from '@apollo/client'
import { ComposeTweet } from "./ComposeTweet";
import { RightBar }  from './RightBar'
import { Loading } from "./Loading";

const CURRENTUSER = gql`
query Query($currentUserHandle: String!) {
  currentUser(handle: $currentUserHandle) {
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
  const { loading, error, data } = useQuery(CURRENTUSER, {variables: {currentUserHandle: "@danmolloy" }})


  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p>Error</p>
  }
  return (
    <Router>
      <div className="flex flex-row w-screen h-screen justify-start">
        <Sidebar data={data} />
        <div className="sm:ml-24 md:ml-60 mb-0 border-r w-full max-w-2xl sm:mr-2">
        <Switch>
        <Route path="/compose/tweet">
          <ComposeTweet user={data.currentUser}/>
        </Route>
        <Route path="/explore" component={Explore}/>
        <Route path="/home">
          <Home data={data}/>
        </Route>
        <Route path="/bookmarks">
          <Bookmarks currentUser={data.currentUser} />
        </Route>
        <Route path="/lists">
          <Lists user={data.currentUser}/>
        </Route>
        <Route path="/messages">
          <Messages currentUser={data.currentUser}/>
        </Route>
        <Route path="/notifications" component={Notifications} />
        <Route path={'/:userHandle'}>
          <Profile data={data}/>
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
        </Switch>
        </div>
        <RightBar />
        </div>
    </Router>
  );
}

export default App;
