import { createSlice } from "@reduxjs/toolkit";
const initialPostsSlice = {
  posts: [
    {
      id: "degea1",
      title: "Farewell",
      content:
        "Manchester will always be in my heart, Manchester has shaped me and will never leave me.We’ve seen it all. 🤘🏼❤️",
      image:
        "https://pbs.twimg.com/media/F0hJx4qXsAEFMbK?format=jpg&name=large",
      creator: {
        id: "degea",
        // name: "David De Gea",
        // email: "daviddegea@gmail.com",
        // password: "123456789",
        // image:
        //   "https://pbs.twimg.com/profile_images/1677677662570000384/IuKiZeNT_400x400.jpg",
      },
      comments: [],
    },
    {
      id: "garnacho1",
      title: "19",
      content: "19🥳👶🏼",
      image:
        "https://pbs.twimg.com/media/Fz9LrUxX0AABTYT?format=jpg&name=large",
      creator: {
        id: "garnacho",
        // name: "Alejandro Garnacho",
        // email: "alejandrogarnacho@gmail.com",
        // password: "123456789",
        // image:
        //   "https://pbs.twimg.com/profile_images/1635048434569822210/UzHEV8t0_400x400.jpg",
      },
      comments: [],
    },
  ],
};
const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostsSlice,
  reducers: {
    addPost(state, action) {
      // state.posts = [...state.posts, ...action.payload];
      state.posts.push(action.payload);
    },
    updatePost(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    deletePost(state, action) {
      // const { id } = action.payload;
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      console.log("PostafterDelete", state.posts);
    },
    getAllPost(state, action) {
      // state.posts = [...state.posts, action.payload];
      state.posts = action.payload;
    },
  },
});

export const postsAcions = postsSlice.actions;

export default postsSlice;
