import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useHttpClient from "../../shared/hooks/use-http-client";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const {
    isLoading,
    error,
    sendRequest,
    cleanError: errorHandler,
  } = useHttpClient({ url: "http://localhost:5000/api/users/", method: "GET" });
  useEffect(() => {
    const fetchUsers = async () => {
      const responseData = await sendRequest();
      console.log(responseData);
      setLoadedUsers(responseData.users);
    };
    fetchUsers();
  }, [sendRequest]);

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
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
