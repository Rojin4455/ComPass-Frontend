import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/User/MainLayout';
import Banner from '../../components/User/Home/Banner/Banner';
import RecommendedMovies from '../../components/User/Home/RecommendedMovies/RecommendedMovies';
import NowShowing from '../../components/User/Home/NowShowing/NowShowing';
import ComingSoon from '../../components/User/Home/ComingSoon/ComingSoon';
import useAxiosInstance from '../../axiosConfig';
import { useDispatch } from 'react-redux';
import { setUser,setError  } from '../../slices/userSlice';
import { useSelector } from 'react-redux';
import LocationModal from '../../components/User/Home/Location/LocationModal';
import { useContext } from 'react';
import { PlacesContext } from '../../context/placesContext';
import showToast from '../../utils/ToastNotifier';
import SectionDivider from '../../components/User/Home/SectionDivider';
import Loading from '../../components/Admin/AdminAddMovies/Loading';
import NoMovieRunning from '../../components/User/Home/NoMovieRunning';
import { setContent } from '../../slices/userProfileSlice';
import FutureShowings from '../../components/User/Home/FutureShowings/FutureShowings';
import Footer from '../../components/User/Home/Footer/Footer';

function UserHome() {
  const [data, setData] = useState(null);
  // const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const axiosInstance = useAxiosInstance();
  const isLoaded = useContext(PlacesContext)
  const [nowShowing,setNowShowing] = useState([])
  const [upComing,setUpComing] = useState([])
  const [isLocation, setIsLocation] = useState(false)
  const [loading,setLoading] = useState(true)



  


  

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataString = urlParams.get('data');
    if (dataString) {
      const parsedData = Object.fromEntries(new URLSearchParams(dataString));
      setData(parsedData);
    }
  }, []);


  const location = useSelector((state) => state.location)

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     setLoading(true)
  //     try{
  //       const response = await axiosInstance.post(`movie/location-movies/`,{
  //         lat:location.lat,
  //         lng:location.lng
  //       })
  //       if (response.status === 200){
  //         console.log("movie response: ",response)
  //         setNowShowing(response.data.now_showing)
  //         setUpComing(response.data.upcoming)
  //         setIsLocation(true)
  //       }else{
  //         console.error("error response: ",response)
  //       }
  //     }catch(err){
  //       if (err.status === 404){
  //         setIsLocation(false)
          
  //         console.log("error: in directing banner",err)
  //         setNowShowing(err.response.data.data.now_showing)
  //       } else if(err.status === 406){
  //         console.error("lat or lng is missing")
  //       }
  //     }
  //     setLoading(false)
  //   }
  //     fetchMovies()
    
    
  // },[location.display, location.lat,location.lng])
  
  const fetchActiveSubscription = async () => {
    try {
      const response = await axiosInstance.get('subscription/active/');
      console.log("active plans: ", response.data);
      return response.data
    } catch (error) {
      console.error("Failed to fetch active subscription:", error);
    }
  };
  
  


  useEffect(() => {
    const setToken = async () => {
      if (data){
      try {
        const response = await axiosInstance.post('set-token/', {
          user_id: data.user_id,
        });

        if (response.status === 200) {
          const { requestData, token } = response.data;

          const user = requestData;
          const access_token = token.access;
          const refresh_token = token.refresh;
          const is_user = true

          const subscription = fetchActiveSubscription()

          dispatch(setUser({ user, access_token, refresh_token,is_user, is_admin:false, is_owner:false, subscription:subscription }));

          window.history.replaceState({}, document.title, window.location.pathname);
        } else {
          console.error('Unexpected response:', response);
          dispatch(setError('Unexpected response status: ' + response.status));
        }
      } catch (error) {
        console.error('Error setting cookie:', error);
        dispatch(setError('Error setting cookie: ' + error.message));
      }
    };
  }

    setToken();
  }, [data, dispatch]);



  // useEffect(() => {

  // }, [location]);

  console.log("location: ",location)
  return (
    <>
      <MainLayout page={'home'}>
        {/* {loading? (<Loading loading={loading} />):( */}
          <>
        {/* {(location.showModal || location.display) && isLoaded && (
          <LocationModal/>
        )} */}
        {location.isLocation? (
          <>
        <Banner movies={location.nowShowing}/>
        <RecommendedMovies movies={location.nowShowing}/>
        <SectionDivider title="Now Showing" />
        <NowShowing movies={location.nowShowing}/>
        {/* <FutureShowings movies={location.futureShowing} /> */}
        <ComingSoon movies={location.upComing}/>
        </>
      ):(
        <>
        <Banner movies={location.nowShowing}/>
        <NoMovieRunning/>
        <SectionDivider/>
        </>
      )}
       <Footer/>
      </>
    {/* )} */}
   
      </MainLayout>
    </>
  );
}

export default UserHome;