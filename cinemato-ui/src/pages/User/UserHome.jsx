import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/User/MainLayout';
import Banner from '../../components/User/Home/Banner/Banner';
import RecommendedMovies from '../../components/User/Home/RecommendedMovies/RecommendedMovies';
import NowShowing from '../../components/User/Home/NowShowing/NowShowing';
import ComingSoon from '../../components/User/Home/ComingSoon/ComingSoon';
import useAxiosInstance from '../../axiosConfig';
import { useDispatch } from 'react-redux';
import { setUser,setError  } from '../../slices/userSlice';

function UserHome() {
  const [data, setData] = useState(null);
  // const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataString = urlParams.get('data');
    if (dataString) {
      const parsedData = Object.fromEntries(new URLSearchParams(dataString));
      setData(parsedData);
    }
  }, []);



  useEffect(() => {
    const setToken = async () => {
      if (data){
      try {
        const response = await axiosInstance.post('set-token/', {
          user_id: data.user_id,
        });

        // Check if the request was successful
        if (response.status === 200) {
          const { requestData, token } = response.data;

          // Extracting necessary data
          const user = requestData;
          const access_token = token.access;
          const refresh_token = token.refresh;
          const is_user = true

          // Dispatch the setUser action to update the Redux state
          console.log("user, access, refresh",user,access_token,refresh_token)
          dispatch(setUser({ user, access_token, refresh_token,is_user }));

          console.log('Token set and user state updated successfully:', response);
          window.history.replaceState({}, document.title, window.location.pathname);
        } else {
          // Handle unexpected response status
          console.error('Unexpected response:', response);
          dispatch(setError('Unexpected response status: ' + response.status));
        }
      } catch (error) {
        // Handle errors (e.g., network issues, server errors)
        console.error('Error setting cookie:', error);
        dispatch(setError('Error setting cookie: ' + error.message));
      }
    };
  }

    // Call the setCookie function when the component mounts
    setToken();
  }, [data, dispatch]);


  return (
    <>
      <MainLayout>
        <Banner />
        <RecommendedMovies />
        <NowShowing />
        <ComingSoon />
      </MainLayout>
    </>
  );
}

export default UserHome;