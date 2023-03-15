import React from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useAxios from "../../shared/hooks/use-http";

const Users = () => {
  const { response, loading, error, errorHandler } = useAxios({
    url: "http://localhost:5000/api/users/",
  });
  return (
    <React.Fragment>
      {/* {error && (
        <ErrorModal
          error={error}
          onClick={() => {
            errorHandler();
          }}
        />
      )} */}
      {loading && <LoadingSpinner />}
      {!loading && response && response.users && (
        <UsersList items={response.users} />
      )}

      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full max-w-xs"
      />
    </React.Fragment>
  );
};

export default Users;
