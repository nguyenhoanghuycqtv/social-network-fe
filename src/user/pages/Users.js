import React, { useCallback, useEffect, useState } from "react";
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
      setLoadedUsers(responseData.users);
    };
    fetchUsers();
  }, [sendRequest]);

  // console.log(loadedUsers);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  // const [loadedUsers, setLoadedUsers] = useState();
  // useEffect(() => {
  //   const sendRequest = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch("http://localhost:5000/api/users/");
  //       const responseData = await response.json();
  //       if (!response.ok) {
  //         throw new Error(responseData.message);
  //       }
  //       setLoadedUsers(responseData.users);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //     setIsLoading(false);
  //   };
  //   sendRequest();
  // }, []);
  // const errorHandler = () => {
  //   setError(null);

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
