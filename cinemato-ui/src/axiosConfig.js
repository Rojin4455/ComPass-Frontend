import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, setUser } from './slices/userSlice';
import Cookies from 'js-cookie'; // You need this library to manage cookies
import { useNavigate } from 'react-router-dom';



const useAxiosInstance = () => {
  const access_token = useSelector((state) => state.user.access_token);
  const refresh_token = useSelector((state) => state.user.refresh_token);
  const {is_admin,is_user,is_owner} = useSelector((state) => state.user)
  
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate to different routes

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
  });



  const getCsrfToken = () => {
    return Cookies.get('csrftoken'); // This reads the csrftoken from cookies
  };
  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      if (access_token) {

        config.headers['Authorization'] = `Bearer ${access_token}`;
      }
      if (refresh_token) {
        config.headers['RefreshToken'] = refresh_token;
      }
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {

      // Check for the 'Authorization' header in the response
      const authorizationHeader = response.headers['authorization'];
  
      if (authorizationHeader) {
        const tokenParts = authorizationHeader.split(' ');
        
        if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
          const newAccessToken = tokenParts[1];
          dispatch(setUser({ access_token: newAccessToken }));
  
          
        }
      }
  
      return response;
    },
    (error) => {
 // Hook to dispatch Redux actions

    // Handle errors from the backend or network
    if (error.response) {
      
      const authorizationHeader = error.response.headers['authorization'];
      
      if (authorizationHeader) {
        const tokenParts = authorizationHeader.split(' ');
        
        if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
          const newAccessToken = tokenParts[1];
          dispatch(setUser({ access_token: newAccessToken }));
  
          
        }
      }

      const { status, data } = error.response;

      // If refresh token has expired (check status code and error message)
      if (status === 403 && data.error === 'Refresh token expired') {
        // Clear the user state (log the user out)
        

        console.log("refresh token is expired")
        if (is_admin) {
          navigate("/admin/");
        } else if (is_owner) {
          navigate("/theater/login/");
        } else if (is_user) {
          navigate("/");
        }
        dispatch(clearUser()); // Replace this with your logout action
        // Navigate to the login page
      }
    }
      // Handle any errors from the backend or network
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;
