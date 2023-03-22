import axios from "axios";
import { postsAcions } from "./posts-slice";
import { socket } from "../../socket";
export const getAllPostData = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/");
      const resData = res.data;
      return resData;
    };
    try {
      const resData = await sendRequest();
      const posts = resData.posts;
      dispatch(postsAcions.getAllPost(posts));
    } catch (err) {}
  };
};

export const postPost = (data, token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await axios.post("http://localhost:5000/api/posts/", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const resData = res.data;
      return resData;
    };
    try {
      const resData = await sendRequest();
      const post = resData.post;
      dispatch(postsAcions.addPost(post));
      // await sendRequest();
      // socket.on("createPost", (data) => dispatch(postsAcions.addPost(data.post)));
    } catch (err) {}
  };
};
