import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (axiosParams) => {
  const [response, setResponse] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (params) => {
    setLoading(true);
    try {
      const result = await axios.request(params);
      if (result) {
        setResponse(result.data);
      }
      return result.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return { response, loading, error, errorHandler, fetchData };
};

export default useAxios;
