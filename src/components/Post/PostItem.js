import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "../User/UserItem";
import { deletePost } from "../../app/store/posts-actions";

// const DUMMY_USERS = [
//   {
//     id: "degea",
//     name: "David De Gea",
//     email: "daviddegea@gmail.com",
//     password: "123456789",
//     image:
//       "https://pbs.twimg.com/profile_images/1677677662570000384/IuKiZeNT_400x400.jpg",
//   },
//   {
//     id: "garnacho",
//     name: "Alejandro Garnacho",
//     email: "alejandrogarnacho@gmail.com",
//     password: "123456789",
//     image:
//       "https://pbs.twimg.com/profile_images/1635048434569822210/UzHEV8t0_400x400.jpg",
//   },
// ];

const PostItem = (props) => {
  const location = useLocation();
  const users = useSelector((state) => state.users.users);
  const user = users?.find((u) => u.id === props.postOwner);
  // const dummyUser = DUMMY_USERS.find((u) => u.id === props.postOwner);
  const { userId, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deletePostHandler = () => {
    dispatch(deletePost(props.postId, token));
    navigate("/");
  };

  return (
    <div className="card w-full mb-12 bg-[#F1F3F6]">
      {user && (
        <UserItem
          image={user.image}
          name={user.name}
          email={user.email}
          id={user.id}
        />
      )}
      {/* {
        <UserItem
          image={dummyUser?.image}
          name={dummyUser?.name}
          email={dummyUser?.email}
          id={dummyUser?.id}
        />
      } */}
      <figure className="m-2">
        {<img src={props.image} />}
        {/* <img src={`http://localhost:5000/${props.image}`} /> */}
      </figure>
      <div className="card-body m-2">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.content}</p>
        <div className="card-actions justify-start">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          <p>{props.comments?.length}</p>
        </div>
      </div>
      {userId === props.post.creator?.id &&
        location.pathname === `/posts/${props.postId}` && (
          <div className="flex justify-start">
            {/* <div className="m-2">
            <button className="btn btn-info">EDIT</button>
          </div> */}
            <div className="m-2">
              <button onClick={deletePostHandler} className="btn btn-error">
                DELETE
              </button>
            </div>
          </div>
        )}
      <div>
        {props.postId && location.pathname !== `/posts/${props.postId}` && (
          <Link to={`/posts/${props.postId}`}>
            <button className="btn btn-primary m-2">
              Detail post and Comment
            </button>
          </Link>
        )}
        {/* <Link to={`/posts/${props.postId}`}>
          <button className="btn btn-primary m-2">
            Detail post and Comment
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default PostItem;
