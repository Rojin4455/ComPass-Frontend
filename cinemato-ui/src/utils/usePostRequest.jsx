import { useState } from "react";
import useAxiosInstance from "../axiosConfig";
const usePostRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const axiosInstance = useAxiosInstance()

  const postData = async (url, payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(url, payload);
      console.log("response: ", response)
      setData(response.data);
    } catch (err) {
        console.log("error response123: ",err.response?.data?.message)
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePostRequest;
