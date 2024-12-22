import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaTheaterMasks } from 'react-icons/fa'; // Theater-related icon
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";// Fix import for jwt-decode
import useAxiosInstance from '../../../axiosConfig';
import { setUser,clearUser } from '../../../slices/userSlice';
import showToast from '../../../utils/ToastNotifier';

function OwnerLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [PasswordEmpty, setPasswordEmpty] = useState(false);
  const [EmailEmpty, setEmailEmpty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const axiosInstance = useAxiosInstance();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user?.access_token);
  const is_owner = useSelector((state) => state.user?.is_owner)


  useEffect(() => {
    if (token && is_owner) {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        dispatch(clearUser());
      } else {
        navigate('/owner/home');
      }
    }
  }, [token, dispatch, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailEmpty(!formData.email);
    setPasswordEmpty(!formData.password);

    if (formData.email && formData.password) {
      try {
        const response = await axiosInstance.post('owner/login/', {
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 200) {
          const { user, token } = response.data;
          dispatch(clearUser())
          dispatch(setUser({ user: user.email, access_token: token.access, refresh_token: token.refresh, is_owner:true, is_admin:false, is_user:false ,id: user.id }));
          showToast("success","Successfully logged in")
          navigate('owner/home/');
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          showToast("success",error.response.data.error.non_field_errors[0])
          console.error("Validation error:", error.response.data.error.non_field_errors[0]);
        }else{
          showToast('error',"Invalid Credentials")
        }
      }

      
    }
  };


  const handleSignup = async () => {
    navigate('/owner/signup/')
  }

  return (
    <div className="relative w-full h-screen bg-cover bg-center bg-white">
      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-60"></div> */}
      
      {/* Centered Form */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md min-h-[500px] border-2 border-grey">
          
          {/* Theater Logo and Title */}
          <div className="flex justify-center mb-6">
            <FaTheaterMasks size={48} className="text-secondary" /> {/* Theater icon */}
          </div>
          <h2 className="text-2xl font-bold text-center text-primary">Theater Login</h2>
          <p className="text-center text-sm text-gray-500 mb-4">Sign in to manage your theater</p>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md placeholder:text-sm placeholder:font-medium placeholder:text-gray-300 focus:border-primary focus:outline-none"
                placeholder="Enter your email"
              />
              {EmailEmpty && <p className="text-danger">Email is required</p>}
            </div>

            {/* Password Field */}
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md placeholder:text-sm placeholder:font-medium placeholder:text-gray-300 focus:border-primary focus:outline-none"
                  placeholder="Enter your password"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </div>
              </div>
              {PasswordEmpty && <p className="text-danger">Password is required</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                Login
              </button>
            </div>
          </form>
          <div className='flex gap-2 mt-3'>
            <h1 className='text-grey'>Don't have an account? </h1>
            <h1 className='text-primary cursor-pointer font-semibold' onClick={handleSignup}>Sign up</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerLogin;
