import { useCallback, useState } from "react";

const useHttpClient = (requestConfig) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: JSON.stringify(requestConfig.body),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);
  

  sendRequest();
  const cleanError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, cleanError };
};

export default useHttpClient;
