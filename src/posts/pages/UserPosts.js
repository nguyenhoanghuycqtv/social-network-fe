import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostList from "../components/PostList";
import useHttpClient from "../../shared/hooks/use-http-client";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const UserPosts = (props) => {
  const [loadedPosts, setLoadedPosts] = useState();
  const {
    isLoading,
    error,
    sendRequest,
    cleanError: errorHandler,
  } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responeData = await sendRequest(
          `http://localhost:5000/api/posts/user/${userId}`
        );
        setLoadedPosts(responeData.posts);
      } catch (err) {
        error.push(err);
      }
    };
    fetchPosts();
  }, [sendRequest, userId]);
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
      {isLoading && <LoadingSpinner />}
      {loadedPosts && <PostList items={loadedPosts} />}
    </React.Fragment>
  );
};

export default UserPosts;
