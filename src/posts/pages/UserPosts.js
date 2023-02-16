import React from "react";
import { useParams } from "react-router-dom";
import PostList from "../components/PostList";

const POSTS = [
  {
    id: "p1",
    imageUrl:
      "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt445f1c1c3dc3f1b8/63663ac793215e112b37f60f/Casemiro_Man_Utd_2022-23.jpg",
    title: "Hello",
    content: "Hello",
    creator: "u1",
  },
  {
    id: "p2",
    imageUrl:
      "https://vtv1.mediacdn.vn/zoom/550_339/2020/12/31/ibra-16093727779431744658462.jpg",
    title: "Hello",
    content: "Hello",
    creator: "u2",
  },
];

const UserPosts = (props) => {
  const userId = useParams().userId;
  const loadedPosts = POSTS.filter((item) => (item.creator === userId));
  return <PostList items={loadedPosts} />;
};

export default UserPosts;
