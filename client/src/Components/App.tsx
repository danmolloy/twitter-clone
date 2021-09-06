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

const CURRENTUSER = gql`
  query Query($currentUserHandle: String!) {
    currentUser(handle: $currentUserHandle) {
      name
      posts {
        content
        id
        postDate
      }
      handle
      blurb
      joinDate
      following
      followers
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(CURRENTUSER, {variables: {currentUserHandle: "@dan" }})

  if (loading) {
    return <p>Loading..</p>
  }

  if (error) {
    return <p>Error</p>
  }
  return (
    <Router>
      <div className="flex flex-row w-screen">
        <Sidebar data={data}/>
        <Switch>
          <Route path="/explore" component={Explore}/>
          <Route path="/home">
            <Home data={data}/>
          </Route>
          <Route path="/bookmarks" component={Bookmarks} />
          <Route path="/lists" component={Lists} />
          <Route path="/messages" component={Messages} />
          <Route path="/notifications" component={Notifications} />
          <Route path={`/${data.currentUser.handle.slice(1)}`}>
            <Profile data={data}/>
          </Route>
          <Route path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
        </div>
    </Router>
  );
}

export default App;
