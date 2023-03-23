import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommentForm from "../components/Comment/CommentForm";
import CommentList from "../components/Comment/CommentList";
import PostItem from "../components/Post/PostItem";
import {
  postComment,
  getAllCommentData,
  getAllCommentDataByPostId,
} from "../app/store/comments-actions";
import { commentsAcions } from "../app/store/comments-slice";
import { counterActions } from "../app/store/test-slice";

const PostDetail = () => {
  const { postId } = useParams();
  const { userId, token } = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts.posts);
  // const comments = useSelector(state => state.comments.comments)
  // const comments = useSelector((state) => {
  //   console.log(state.comments.comments);
  //   return state.comments.comments.filter(
  //     (comment) => comment.location?.id === postId
  //   );
  // });

  useEffect(() => {
    dispatch(getAllCommentDataByPostId(postId));
  }, []);

  const comments = useSelector((state) => state.comments.comments);

  console.log(comments);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = posts.find((post) => post.id === postId);
  const counter = useSelector((state) => state.counter.counter);

  const handleSubmitHandler = (commentEntered) => {
    const data = { content: commentEntered, creator: userId, location: postId };

    dispatch(postComment(data, token, postId));
    console.log("After Post Comment", data);
  };

  const counterHandler = () => {
    dispatch(counterActions.increase());
    console.log(counter);
  };
  return (
    <div className="card">
      <button onClick={counterHandler} className="btn btn-error">
        Click me
      </button>
      {counter}
      {post && (
        <PostItem
          comments={comments}
          post={post}
          image={post.image}
          title={post.title}
          content={post.content}
        />
      )}
      <CommentForm postId={postId} submitHandler={handleSubmitHandler} />
      <CommentList
        // comments={comments.filter((comment) => comment.location.id === postId)}
        comments={comments}
        // postId={postId}
      />
    </div>
  );
};

export default PostDetail;