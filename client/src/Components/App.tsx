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
import { MobileSidebar } from './Mobile'

const CURRENTUSER = gql`
  query Query($currentUserHandle: String!) {
    currentUser(handle: $currentUserHandle) {
      name
      posts {
        content
        id
        postDate
        likes {
          name
          handle
        }
        retweets {
          name
          handle
        }
        comments {
          id
          content
          postDate
          author {
            name
            handle
          }
        }
      }
      handle
      blurb
      joinDate
      following
      followers
      bgPic
      profilePic
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
      <div className="flex border-black flex-col-reverse sm:flex-row w-screen h-screen">
        <Sidebar data={data} />
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
