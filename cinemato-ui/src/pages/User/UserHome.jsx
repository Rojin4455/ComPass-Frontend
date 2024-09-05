import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/User/MainLayout';
import Banner from '../../components/User/Home/Banner/Banner';
import RecommendedMovies from '../../components/User/Home/RecommendedMovies/RecommendedMovies';
import NowShowing from '../../components/User/Home/NowShowing/NowShowing';
import ComingSoon from '../../components/User/Home/ComingSoon/ComingSoon';
import axiosInstance from '../../axiosConfig';
import { useDispatch,useSelector } from 'react-redux';
import { setUser,setError  } from '../../slices/userSlice';

function UserHome() {
  const [data, setData] = useState(null);
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataString = urlParams.get('data');
    if (dataString) {
      const parsedData = Object.fromEntries(new URLSearchParams(dataString));
      setData(parsedData);
      console.log("Received data: ", parsedData);
    }
  }, []);

  // useEffect(() => {
  //   const setCookie = async () => {
  //     try {
  //       const response = await axiosInstance.post('set-token/', {
  //         'user_id': data['user_id'],
  //       });
  //       console.log(response);
  //       return response;
  //     } catch (error) {
  //       console.error("Error setting cookie:", error);
  //       return null;
  //     }
  //   };
  
  //   if (data) {
  //     setCookie().then(response => {
  //       if (response && response.status === 200) {  // Check response.status
  //         console.log("Action dispatched in home page", response.data.requestData);
  //         dispatch(setUser(response.data.requestData));

  //       }
  //     });
  //   }
  // }, [data]);


  useEffect(() => {
    const setCookie = async () => {
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

          // Dispatch the setUser action to update the Redux state
          dispatch(setUser({ user, access_token, refresh_token }));

          console.log('Token set and user state updated successfully:', response);
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

    // Call the setCookie function when the component mounts
    setCookie();
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