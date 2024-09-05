import axios from 'axios';
import { useSelector } from 'react-redux';

const useAxiosInstance = () => {
  const access_token = useSelector((state) => state.user.access_token);
  console.log("access token in config axios :",access_token)
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (access_token) {
        config.headers['Authorization'] = `Bearer ${access_token}`;
        console.log("Config headers:", config.headers);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;