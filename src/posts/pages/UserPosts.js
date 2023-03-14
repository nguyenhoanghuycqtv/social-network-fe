import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PostList from "../components/PostList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import useAxios from "../../shared/hooks/use-http";

const UserPosts = (props) => {
  const userId = useParams().userId;
  const [error, setError] = useState(null);

  const { response, loading } = useAxios({
    url: `http://localhost:5000/api/posts/user/${userId}`,
  });
  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          error={error}
          onClick={() => {
            setError(null);
          }}
        />
      )}
      {loading && <LoadingSpinner />}
      {!loading && response && <PostList items={response.posts} />}
    </React.Fragment>
  );
};

export default UserPosts;
