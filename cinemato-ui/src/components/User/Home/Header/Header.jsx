import React, { useState } from 'react';
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

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoginOtpOpen, setIsLoginOtpOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();



  
  const handleClick = () => {
    navigate('/');
  };

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

        navigate('/profile/')

  }

  console.log("user instance in header: ",user)

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-2">
        <nav className="flex justify-between items-center relative px-4 md:px-8 lg:px-12 h-16">
          {/* Left side: Home and Movies buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleClick}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full"
            >
              <IoHome />
              Home
            </button>
            <button
              onClick={handleClick}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full"
            >
              <MdLocalMovies />
              Movies
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex-grow flex justify-center items-center">
            <img
              src="/assets/logo-new1.png"
              alt="Logo"
              className="min-h-[90%] max-w-40"
            />
          </div>

          {/* Right side: Search bar and buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleClick}
              className="flex items-center px-4 py-2 text-black rounded-full bg-gray-200"
              disabled
            >
              <MdLocationPin />
              Kochi
              <IoIosArrowDown />
            </button>
            
            {/* Replace Login Button with User's Email if Logged In */}
            {user && user.user && user.is_user? (
              <button 
                className="px-4 py-2 bg-third text-black rounded-full"
                onClick={handleProfile}
              >
                
                Hey, {(user.user.username ? user.user.username : user.user.email?user.user.email.split("@")[0]:"")}
                </button>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-secondary text-black rounded-full"
              >
                Login
              </button>
            )}

            <div className=''>
              <IoNotifications size={24} />
            </div>
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
    </>
  );
}

export default Header;
