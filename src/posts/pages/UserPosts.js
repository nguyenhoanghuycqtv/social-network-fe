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
      "https://images2.thanhnien.vn/Uploaded/quocviet/2022_04_10/275292915-1172159740222684-1041239282763399363-n-3652.jpg",
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
