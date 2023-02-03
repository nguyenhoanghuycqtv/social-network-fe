import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPost from "./posts/pages/NewPost";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPosts from "./posts/pages/UserPosts";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/posts" exact>
            <UserPosts />
          </Route>
          <Route path="/posts/new" exact>
            <NewPost />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
