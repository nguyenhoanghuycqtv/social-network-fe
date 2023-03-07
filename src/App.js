import React, { useState, useCallback } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Users from "./user/pages/Users";
import NewPost from "./posts/pages/NewPost";
import UserPosts from "./posts/pages/UserPosts";
import Root from "./shared/components/Root/Root";
import Error from "./shared/components/Error/Error";
import Auth from "./user/pages/Auth";
import AuthContext from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => setIsLoggedIn(true), []);
  const logout = useCallback(() => setIsLoggedIn(false), []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Users /> },
        { path: "/:userId/posts", element: <UserPosts /> },
        { path: "/posts/new", element: <NewPost /> },
        { path: "/auth", element: <Auth /> },
      ],
    },
  ]);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
