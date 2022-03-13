import React, { useState, lazy, Suspense, useContext } from "react";
import Signup from "./Components/Part/Signup";
import Login from "./Components/Part/Login";
import Admin from "./Components/Part/Admin";
import Home from "./Components/Part/Home";
import Resources from "./Components/Part/Resources";
import College from "./Components/Part/College";
import Profile from "./Components/Part/Profile";
import "./App.css";
import {AuthContext, AuthContextProvider} from "./ContextProvider/ContextProvider";
import HashTag from "./Components/Part/Hashtagss";
import SearchResources from "./Components/Part/SearchPage";
import UserProfile from "./Components/Part/UserProfile";
import HashTagCollege from "./Components/Part/HashTagPosts";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SearchUser from "./Components/Part/SearchUser";
import UserProvider from "./ContextProvider/UserProvider";
import AccountProvider from "./ContextProvider/AccountProvider";
// import Messenger from './Components/Part/Messenger/ChatDialog';
import { CircularProgress } from "@material-ui/core";
import ForgetPassword from "./Components/Part/ForgetPassword";
import VerifyLink from "./Components/Part/VerifyLink";
import ResetPassword from "./Components/Part/ResetPassword";
// import Messenger from "./Components/Messenger";
const Messenger = lazy(() => import('./Components/Part/Messenger/ChatDialog'));
function App() {
  const {user} = useContext(AuthContext);
  return (
    <React.Fragment>
      <AuthContextProvider>
        <AccountProvider>
          <Router>
            <Switch>
              <Route exact path="/">
                {user ? <Home /> : <Signup />}
              </Route>

              {/* <Route exact path="/messenger">
                <Suspense fallback={<CircularProgress />}>
                  <Messenger />
                </Suspense>
              </Route> */}
              
              <Route exact path="/Login">
              { user ? <Redirect to="/home"/> : <Login />}
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
                {user ? <Home /> : <Login />}
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

              <Route exact path="/forgotpassword">
                <ForgetPassword />
              </Route>

              <Route exact path="/searchUser">
                <SearchUser />
              </Route>

              <Route exact path="/user">
                <UserProfile />
              </Route>

                <Route exact path="/forgetPassword">
                <ForgetPassword />
              </Route>

               <Route exact path="/resetPassword/:token">
                <ResetPassword />
              </Route>

              <Route exact path="/verify">
                <VerifyLink />
              </Route>

            </Switch>
          </Router>
        </AccountProvider>
      </AuthContextProvider>
    </React.Fragment>
  );
}

export default App;
