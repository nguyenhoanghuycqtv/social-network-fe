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
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    return setIsLoggedIn(true) & setUserId(uid), [];
  });
  const logout = useCallback(() => {
    return setIsLoggedIn(false) & setUserId(null);
  }, []);
  console.log(userId);
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
    <AuthContext.Provider value={{ isLoggedIn, userId: userId, login, logout }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
