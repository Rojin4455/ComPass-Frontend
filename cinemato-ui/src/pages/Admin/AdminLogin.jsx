import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import useAxiosInstance from '../../axiosConfig'
import { setUser,clearUser } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import showToast from '../../utils/ToastNotifier';





function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [PasswordEmpty,setPasswordEmpty] = useState(false)
  const [EmailEmpty,setEmailEmpty] = useState(false)

  const [showPassword, setShowPassword] = useState(false);

  const axiosInstance = useAxiosInstance();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user?.access_token)
  const is_admin = useSelector((state) => state.user?.is_admin)
  const is_user = useSelector((state) => state.user?.is_user)
  const is_owner = useSelector((state) => state.user?.is_owner)

  useEffect(() => {

    if (token && is_admin) {
      // Decode the token to check its expiration
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      if (decodedToken.exp < currentTime) {
        // Token is expired, remove it and navigate to the login page
        dispatch(clearUser());
        
      } else {
        // Token is valid, navigate to the home page
        navigate('/admin/home');
      }
    }
  },[])

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
    // Add your login logic here
    console.log('Form Data:', formData);
    setEmailEmpty(false)
    setPasswordEmpty(false)
    if (!formData.password){
      console.log("no password")
      setPasswordEmpty(true)
    
    }
    if (!formData.email){
      setEmailEmpty(true)
    }

    if (formData.email && formData.password){
      try{
        const response = await axiosInstance.post('admin/login/',{
          "email":formData.email,
          "password":formData.password
        })
        if (response.status === 200){
          console.log("success response in admin login: ",response)
          const user = response.data.email
          const access_token = response.data.access
          const refresh_token = response.data.refresh
          const is_admin = true
          dispatch(clearUser())
          dispatch(setUser({user,access_token,refresh_token,is_admin,is_user:false, is_owner:false}))
          showToast("success","Successfully logging in")
          navigate('home/')
          
        }else{
          showToast('error',"Something went wrong")
        }
      }catch(error){
        console.error("something went wrong: ",error)
        showToast('error',"something went wrong")
      }
    }


  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center bg-primary">
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      
      {/* Centered Modal */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md min-h-[500px]">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="../assets/logo-new1.png" alt="Logo" className="h-8 w-auto" />
          </div>
          <div>
          <h2 className="text-xl font-bold mb-2 text-center mt-8">Verify Your Information</h2>
          <p className="mb-4 text-center text-sm">Login to your admin account</p>
            </div>


          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4 mt-10">
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
              {EmailEmpty && (
                <p className='text-danger'>Email is required</p>
                )}
            </div>


            {/* Password Field */}
            <div className="mb-6 relative">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Password
                </label>
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
                {PasswordEmpty && (
                <p className='text-danger'>Password is required</p>
                )}
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
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
