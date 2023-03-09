import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PostList from "../components/PostList";
import useHttpClient from "../../shared/hooks/use-http-client";

const UserPosts = (props) => {
  const [loadedPosts, setLoadedPosts] = useState();
  const userId = useParams().userId;
  return <PostList items={loadedPosts} />;
};

export default UserPosts;
