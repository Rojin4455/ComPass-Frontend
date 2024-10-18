import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import useAxiosInstance from '../../../../axiosConfig';
// import GoogleButton from 'react-google-button';
import { useEffect } from 'react';


function Login({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const axiosInstance = useAxiosInstance();

  const REDIRECT_URI = 'auth/api/login/google/';
  

  
  
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate email and phone
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    if (email && !emailPattern.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }

    if (phone && !phonePattern.test(phone)) {
        setError('Phone number must be exactly 10 digits.');
        return;
    }

    if (!email && !phone) {
        setError('Please enter either an email address or a phone number.');
        return;
    }

    // If validation passes, call onSubmit
    try {

        const requestData = {};
        if (email) {
          requestData.email = email;
        } else if (phone) {
          requestData.phone = phone;
        }
        const response = await axiosInstance.post('request-otp/',requestData);
        
        if (response.status === 200) {
          console.log("submitted successfully");
            if (email){
              onSubmit({"email":email,"phone":""})
            }else if(phone){
              onSubmit({"email":"","phone":phone})
            }
        } else {
            setError('Failed to send OTP. Please try again.');
        }
    } catch (error) {
        console.error('Error sending OTP:', error.response);
        setError('Failed to send OTP. Please try again.');
    }

  };
  
  const onGoogleLoginSuccess = () => {
    
    
    const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const REDIRECT_URI = 'auth/api/login/google/';
    
    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' ');
  
    const params = {
      response_type: 'code',
      client_id: process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID,
      redirect_uri: `${process.env.REACT_APP_BASE_API_URL}${REDIRECT_URI}`,
      prompt: 'select_account',
      access_type: 'offline',
      scope
    };
  
    const urlParams = new URLSearchParams(params).toString();
    window.location = `${GOOGLE_AUTH_URL}?${urlParams}`;
      
  };

  

  

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-30 bg-black bg-opacity-50" 
      onClick={handleOutsideClick}
    >
      <div 
        className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col items-center" 
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        <img src='/assets/Login-logo.jpg' alt="Logo" className='w-32 mb-4'/>
        <h2 className="text-xl font-bold mb-2">Verify Your Information</h2>
        <p className="mb-4 text-center text-sm">Enter your email address or phone number</p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={phone !== ''}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md placeholder:text-sm placeholder:font-medium placeholder:text-gray-300 focus:border-primary focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={email !== ''}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md placeholder:text-sm placeholder:font-medium placeholder:text-gray-300 focus:border-primary focus:outline-none"
              maxLength="10"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 w-full bg-primary text-white rounded-md"
            >
              Proceed
            </button>
          </div>
        </form>

        {/* Divider with "or" */}
        <div className="my-4 flex items-center w-full">
          <hr className="flex-grow border-gray-300"/>
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300"/>
        </div>

        {/* Google Sign-In Button */}
        <button className="flex items-center justify-center px-4 py-2 w-full bg-white text-black rounded-md" onClick={onGoogleLoginSuccess}>
          <img src="/assets/google-logo.png" alt="Google" className="w-6 h-6 mr-2"/>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
