import React from "react";
import { useParams } from "react-router-dom";
import PostList from "../components/PostList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import useAxios from "../../shared/hooks/use-http";

const UserPosts = (props) => {
  const userId = useParams().userId;

  const { response, loading, error, errorHandler } = useAxios({
    url: `http://localhost:5000/api/posts/user/${userId}`,
  });
  if (response) {
    console.log(response.posts);
  }
  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          error={error}
          onClick={() => {
            errorHandler();
          }}
        />
      )}
      {loading && <LoadingSpinner />}
      {!loading && response && <PostList items={response.posts} />}
    </React.Fragment>
  );
};

export default UserPosts;
