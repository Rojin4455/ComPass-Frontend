import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { BsSearch } from "react-icons/bs";
import { MdLocalMovies } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Login from '../Login/Login'; 
import LoginOtp from '../LoginOtp/LoginOtp';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAxiosInstance from '../../../../axiosConfig';
import { setLocation } from '../../../../slices/userLocationSlice';
import { useDispatch } from 'react-redux';
import LocationModal from '../Location/LocationModal';
import { PlacesContext } from '../../../../context/placesContext';
import { useContext } from 'react';
import { setContent } from '../../../../slices/userProfileSlice';

function Header({page}) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoginOtpOpen, setIsLoginOtpOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const address = useSelector((state) => state.location.address)
  // const page = useSelector((state) => state.userprofile.page)
  const dispatch = useDispatch()


  const isLoaded = useContext(PlacesContext)


  const [nowShowing,setNowShowing] = useState([])
  const [upComing,setUpComing] = useState([])
  const [isLocation, setIsLocation] = useState(false)
  const [loading,setLoading] = useState(true)
  

  

  
  const handleClick = () => {
    // dispatch(setContent({page:'home'}))
    navigate('/')
  };


  const handleLocationClick = () => {
    dispatch(setLocation({display:true}))
  }

  const handleCloseLoginModal = () => {
    setIsLoginOpen(false);
  };

  const handleCloseOtpModal = () => {
    setIsLoginOtpOpen(false);
  };

  const handleLogin = () => {
    setIsLoginOpen(true);
  };

  const handleSubmitLogin = ({email, phone}) => {
    setEmail(email);
    setPhone(phone);
    setIsLoginOpen(false);
    setIsLoginOtpOpen(true); 
  };

  const handleSubmitOtp = () => {
    console.log('OTP submitted');
  };

  const handleProfile = async () => {

        navigate('/profile')

  }


    




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
  //         dispatch(setLocation({isLocation:true,nowShowing:response.data.now_showing,upComing:response.data.upcoming}))
  //         // setNowShowing(response.data.now_showing)
  //         // setUpComing(response.data.upcoming)
  //         // setIsLocation(true)
  //       }else{
  //         console.error("error response: ",response)
  //       }
  //     }catch(err){
  //       if (err.status === 404){
  //         // setIsLocation(false)
  //         dispatch(setLocation({isLocation:false}))
  //         dispatch(setLocation({nowShowing:err.response.data.data.now_showing}))
  //         console.log("error: in directing banner",err)
  //         // setNowShowing(err.response.data.data.now_showing)
  //       } else if(err.status === 406){
  //         console.error("lat or lng is missing")
  //       }
  //     }
  //     setLoading(false)
  //   }
  //     fetchMovies()
    
    
  // },[location.lat,location.lng])




  return (
    <>
  <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10 py-2">
    <nav className="flex justify-between items-center px-4 md:px-8 lg:px-12 h-16">
      {/* Left side: Home and Movies buttons */}
      <div className="flex items-center gap-2 sm:gap-4">
      <button
  onClick={handleClick}
  className={`flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base ${
    page === 'home' ? 'bg-primary text-white' : 'bg-white text-primary border border-gray-700'
  }`}
>
  <IoHome/>
  <span className="hidden sm:inline">Home</span>
</button>

  <button
    onClick={() => {navigate('/movie') }}
    className={`flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base ${
      page === 'movie' ? 'bg-primary text-white ' : 'bg-white text-primary border border-gray-700'
    }`}  >
    <MdLocalMovies />
    <span className="hidden sm:inline">Movies</span>
  </button>
</div>


      <div className="flex-grow flex justify-center items-center"
      >
  {/* <img
    src="/assets/hi5_logo.jpg"
    alt="Logo"
    className="h-10 sm:h-8 lg:h-12 object-contain"
    onClick={handleClick}
  /> */}
</div>



      {/* Right side: Search bar and buttons */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={handleLocationClick}
          className="flex items-center gap-1 px-3 py-1 md:px-4 md:py-2 text-black rounded-full bg-gray-200 text-sm md:text-base"
        >
          <MdLocationPin />
          <span className="hidden sm:inline">
            {address ? address.split(" ")[0] : ""}
          </span>
          <IoIosArrowDown />
        </button>

        {/* Replace Login Button with User's Email if Logged In */}
        {user && user.user && user.is_user ? (
          <button
            className="px-3 py-1 md:px-4 md:py-2 bg-third text-black rounded-full text-sm md:text-base"
            onClick={handleProfile}
          >
            Hey, {user.user.username || user.user.email.split("@")[0] || ""}
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-3 py-1 md:px-4 md:py-2 bg-secondary text-black rounded-full text-sm md:text-base"
          >
            Login
          </button>
        )}

        {/* <div className="text-gray-600">
          <IoNotifications size={20} />
        </div> */}
      </div>
    </nav>
  </header>

  {/* Login Modal Component */}
  <Login
    isOpen={isLoginOpen}
    onClose={handleCloseLoginModal}
    onSubmit={handleSubmitLogin}
  />

  {/* OTP Modal Component */}
  <LoginOtp
    isOpen={isLoginOtpOpen}
    onClose={handleCloseOtpModal}
    onSubmit={handleSubmitOtp}
    email={email}
    phone={phone}
  />


{(location.showModal || location.display) && isLoaded && (
          <LocationModal/>
        )}
</>

  );
}

export default Header;
