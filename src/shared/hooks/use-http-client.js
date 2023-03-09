import { useCallback, useState } from "react";

const useHttpClient = (requestConfig) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, { method = "GET", headers = {}, body = null }) => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const cleanError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, cleanError };
};

export default useHttpClient;
