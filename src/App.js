import React, { useState, useCallback, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Users from "./user/pages/Users";
import NewPost from "./posts/pages/NewPost";
import UserPosts from "./posts/pages/UserPosts";
import Root from "./shared/components/Root/Root";
import Error from "./shared/components/Error/Error";
import Auth from "./user/pages/Auth";
import AuthContext from "./shared/context/auth-context";
import useAuth from "./shared/hooks/use-auth";
import UpdatePost from "./posts/pages/UpdatePost";

const App = () => {
  const { userId, token, login, logout } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Users /> },
        { path: "/:userId/posts", element: <UserPosts /> },
        { path: "/auth", element: <Auth /> },
        { path: "/posts/new", element: token && <NewPost /> },
        { path: "/posts/:postId", element: <UpdatePost /> },
      ],
    },
  ]);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId: userId, login, logout }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
