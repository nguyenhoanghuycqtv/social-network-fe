import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Users from "./user/pages/Users";
import NewPost from "./posts/pages/NewPost";
import UserPosts from "./posts/pages/UserPosts";
import Root from "./shared/components/Root/Root";
import Error from "./shared/components/Error/Error";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Users /> },
        { path: "/:userId/posts", element: <UserPosts /> },
        { path: "/posts/new", element: <NewPost /> },
        { path: "/", element: <Users /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
