import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import useAxiosInstance from '../../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import showToast from '../../../utils/ToastNotifier';
import { toast } from 'sonner';
function OwnerSignup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    businessName: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check if each field is empty
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required';
      } else if (formData.phoneNumber.length !== 10) {
        newErrors.phoneNumber = 'Phone number must be 10 digits';
      }
    if (!formData.businessName) newErrors.businessName = 'Business name is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      // If there are errors, set them in the state
      setErrors(validationErrors);
    } else {
      // If there are no errors, clear errors and proceed with form submission
        try{
            const response = await axiosInstance.post('owner/signup/',{
                email: formData.email,
                password: formData.password,
                phone: formData.phoneNumber,
                first_name: formData.fullName,
                business_name: formData.businessName
            })
            if (response.status === 201){
                console.log("owner created successfully",response)
                showToast("success","Owner Created Successfully. You can login after the admin approves")
                navigate('/owner/login/')
                
            }else{
                console.error("error response", response)
                toast.error("Something went wrong")
            }
        }catch(error){
            console.error("something went wrong", error)
            showToast("error","Something went wrong")
        }
      setErrors({});
      console.log('Form Data:', formData);
    }
  };

  const handlePhoneNumberChange = (e) => {
    // Prevent non-numeric values and restrict to 10 characters
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setFormData({
        ...formData,
        phoneNumber: value,
      });
    }
  }

  const handleLogin = async () => {
    navigate('/owner/login/')
  }

  return (
    <div className="relative w-full h-screen bg-cover bg-center bg-white">
      {/* Dark Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-70"></div> */}

      {/* Centered Signup Modal */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md min-h-[600px] border-2 border-grey">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="../../assets/logo-new1.png" alt="Logo" className="h-8 w-auto" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-center mt-8">Theater Owner Signup</h2>
          <p className="mb-4 text-center text-sm">Create an account as a theater owner</p>

          {/* Signup Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md placeholder:text-sm placeholder:font-medium placeholder:text-gray-300 focus:border-primary focus:outline-none"
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md placeholder:text-sm placeholder:font-medium placeholder:text-gray-300 focus:border-primary focus:outline-none"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
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
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>

            {/* Phone Number */}
            <div className="mb-4 relative">
              <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handlePhoneNumberChange}
                className={`mt-1 p-2 w-full border ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                } rounded-md placeholder:text-sm placeholder:font-medium placeholder:text-gray-300 focus:border-primary focus:outline-none`}
                placeholder="Enter your phone number"
                maxLength={10}
              />
              {errors.phoneNumber && (
                <p className="text-danger text-xs">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Business Name */}
            <div className="mb-4">
              <label htmlFor="businessName" className="block text-gray-700 font-medium mb-2">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md placeholder:text-sm placeholder:font-medium placeholder:text-gray-300 focus:border-primary focus:outline-none"
                placeholder="Enter your business name"
              />
              {errors.businessName && <p className="text-danger">{errors.businessName}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                Signup
              </button>
            </div>
          </form>
          <div className='flex gap-2 mt-3'>
            <h1 className='text-grey'>Don't have an account? </h1>
            <h1 className='text-primary cursor-pointer font-semibold' onClick={handleLogin}>Sign in</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerSignup;
