import React, { useState, lazy, Suspense } from "react";
import Signup from "./Components/Part/Signup";
import Login from "./Components/Part/Login";
import Admin from "./Components/Part/Admin";
import Home from "./Components/Part/Home";
import Resources from "./Components/Part/Resources";
import College from "./Components/Part/College";
import Profile from "./Components/Part/Profile";
import "./App.css";
import ContextProvider from "./ContextProvider/ContextProvider";
import HashTag from "./Components/Part/Hashtagss";
import SearchResources from "./Components/Part/SearchPage";
import UserProfile from "./Components/Part/UserProfile";
import HashTagCollege from "./Components/Part/HashTagPosts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchUser from "./Components/Part/SearchUser";
import UserProvider from "./ContextProvider/UserProvider";
import AccountProvider from "./ContextProvider/AccountProvider";
// import Messenger from './Components/Part/Messenger/ChatDialog';
import { CircularProgress } from "@material-ui/core";
// import Messenger from "./Components/Messenger";
const Messenger = lazy(() => import('./Components/Part/Messenger/ChatDialog'))
function App() {
  return (
    <React.Fragment>
      <UserProvider>
        <AccountProvider>
          <Router>
            <Switch>
              <Route exact path="/">
                {localStorage.getItem("jwt") ? <Home /> : <Signup />}
              </Route>
              <Route exact path="/messenger">
                <Suspense fallback={<CircularProgress />}>
                <Messenger/>
                </Suspense>
              </Route>

              <Route exact path="/Login">
                <Login />
              </Route>

              <Route exact path="/resources">
                <Resources />
              </Route>

              <Route exact path="/College">
                <College />
              </Route>

              <Route exact path="/Admindsds">
                <Admin />
              </Route>

              <Route exact path="/Profile">
                <Profile />
              </Route>

              <Route exact path="/home">
                <Home />
              </Route>

              <Route exact path="/hashtag">
                <HashTag />
              </Route>

              <Route exact path="/hashtagCollege">
                <HashTagCollege />
              </Route>

              <Route exact path="/search">
                <SearchResources />
              </Route>

              <Route exact path="/searchUser">
                <SearchUser />
              </Route>

              <Route exact path="/user">
                <UserProfile />
              </Route>

            </Switch>
          </Router>
        </AccountProvider>
      </UserProvider>
    </React.Fragment>
  );
}

export default App;
