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
      <div className="flex flex-row w-screen h-screen ">
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
        <Route path={`/${data.currentUser.handle.slice(1)}`}>
          <Profile data={data}/>
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
        </Switch>
        </div>
        <div className="hidden lg:flex bg-red-400 w-1/4">
        A sidebar will be here
        </div>
        </div>
    </Router>
  );
}

export default App;
