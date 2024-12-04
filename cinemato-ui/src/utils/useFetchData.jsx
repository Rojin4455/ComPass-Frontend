import { useState, useEffect } from "react";
import useAxiosInstance from "../axiosConfig";
export const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.useAxiosInstance.get(url);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
