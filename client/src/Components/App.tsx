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

function App() {
  return (
    <Router>
      <div className="flex flex-row w-screen">
        <Sidebar />
        <Switch>
          <Route path="/explore" component={Explore}/>
          <Route path="/home" component={Home}/>
          <Route path="/bookmarks" component={Bookmarks} />
          <Route path="/lists" component={Lists} />
          <Route path="/messages" component={Messages} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/:user" component={Profile} />
          <Route path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
        </div>
    </Router>
  );
}

export default App;
