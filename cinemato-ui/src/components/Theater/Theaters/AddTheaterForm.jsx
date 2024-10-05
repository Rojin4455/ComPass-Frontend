import React, { useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa'; // Import an upload icon for better visuals
import { FaLocationArrow } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import useAxiosInstance from '../../../axiosConfig';
import PlacesAutoComplete from './GoogleMap/PlacesAutoComplete';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';




// import PlacesAutocomplete from 'react-places-autocomplete'; // For Google Places API Autocomplete

const AddTheaterForm = () => {

  const [errors, setErrors] = useState({});
    const axiosInstance = useAxiosInstance()
  const [theaterData, setTheaterData] = useState({
    name: '',
    location: '',
    lat:'',
    lng:'',
    email: '',
    phone: '',
    screens: 1,
    screenTypes: [],
    foodAndBeverages: false,
    parking: false,
    photo: null,
  });



  const navigate = useNavigate();

  const screenOptions = ["IMAX", "Dolby Atmos", "3D", "2D", "4DX"]; // Screen options

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTheaterData({
      ...theaterData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setTheaterData({
      ...theaterData,
      [name]: checked
    });
  };

  const handleScreenTypeChange = (option) => {
    setTheaterData(prevState => ({
      ...prevState,
      screenTypes: prevState.screenTypes.includes(option)
        ? prevState.screenTypes.filter(type => type !== option)
        : [...prevState.screenTypes, option]
    }));
  };

  const [imagePreview, setImagePreview] = useState(null); // For previewing the uploaded image

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTheaterData({
        ...theaterData,
        photo: file
      });
      // Create an image preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


    const validate = () => {
      const newErrors = {};
  
      // Name validation
      if (!theaterData.name) {
        newErrors.name = 'Theater name is required.';
      }
  
      // Location validation
      if (!theaterData.address) {
        newErrors.address = 'Location is required.';
      }
  
      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!theaterData.email) {
        newErrors.email = 'Email is required.';
      } else if (!emailPattern.test(theaterData.email)) {
        newErrors.email = 'Invalid email format.';
      }
  
      // Phone number validation (only digits, 10-15 characters)
      const phonePattern = /^\d{10,15}$/;
      if (!theaterData.phone) {
        newErrors.phone = 'Phone number is required.';
      } else if (!phonePattern.test(theaterData.phone)) {
        newErrors.phone = 'Phone number must be between 10 and 15 digits.';
      }
  
      // Image upload validation
      if (!theaterData.photo) {
        newErrors.photo = 'Theater image is required.';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

  const handleSubmit = async (e) => {



    e.preventDefault();
    console.log('Theater data:', theaterData);

    
    if (!validate()) {
      return;
    }

    
    const formData = new FormData();
    formData.append('name', theaterData.name);
    formData.append('location', theaterData.address);
    formData.append('lat', theaterData.lat);
    formData.append('lng', theaterData.lng);
    formData.append('email', theaterData.email);
    formData.append('phone', theaterData.phone);
    formData.append('photo', theaterData.photo);  // Ensure this is a file input
    formData.append('screen_types', JSON.stringify(theaterData.screenTypes));  // JSON stringified
    formData.append('total_screens', theaterData.screens);
    formData.append('is_food_and_beverages', theaterData.foodAndBeverages);
    formData.append('is_parking', theaterData.parking);
  
    try {
      const response = await axiosInstance.post('theater/add-theater/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      if (response.status === 201) {
        console.log('Theater created successfully', response);
        toast.success('Theater created successfully. After admin approval, you can add screens.');
        navigate('/owner/theaters/')
      } else {
        console.log('Error found:', response);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg space-y-4 max-w-4xl mx-auto mt-[6rem]">
      <h1 className="text-3xl font-bold mb-4">Add Theater</h1>

      {/* Theater Name */}
      <div className="flex flex-col space-y-2">
        <label className="block text-sm font-medium text-gray-700">Theater Name</label>
        <input
          type="text"
          name="name"
          value={theaterData.name}
          onChange={handleInputChange}
          className="pl-4 pr-1 border-b border-gray-300 h-8 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-primary transition duration-300"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Location with Google Places API */}
      <div className="flex flex-col space-y-2">
  <label className="block text-sm font-medium text-gray-700">Location (Google Autocomplete)</label>
  


  <PlacesAutoComplete setTheaterData={setTheaterData} theaterData={theaterData}/>
  {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
  
  {/* Uncomment and adjust the PlacesAutocomplete when integrating */}
  {/* <PlacesAutocomplete
    value={theaterData.location}
    onChange={value => setTheaterData({ ...theaterData, location: value })}
    onSelect={address => setTheaterData({ ...theaterData, location: address })}
  >
    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      <div className="relative">
        <input
          {...getInputProps({
            placeholder: 'Type to search for location...',
            className: 'w-full rounded-md border-gray-300 shadow-sm',
          })}
        />
        <div className="absolute z-10 bg-white border rounded-md shadow-lg w-full">
          {loading && <div className="p-2">Loading...</div>}
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              {...getSuggestionItemProps(suggestion, {
                className: 'p-2 hover:bg-gray-100 cursor-pointer',
              })}
            >
              {suggestion.description}
            </div>
          ))}
        </div>
      </div>
    )}
  </PlacesAutocomplete> */}
</div>

      {/* Email and Phone */}
      {/* <div className="grid grid-cols-2 gap-4"> */}
        <div className="flex flex-col space-y-2">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={theaterData.email}
            onChange={handleInputChange}
            className="pl-4 pr-1 border-b w-1/3 h-8 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-primary transition duration-300"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="block text-sm h-8 font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={theaterData.phone}
            onChange={handleInputChange}
            className="pl-4 pr-1 border-b border-gray-300 w-1/3 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-primary transition duration-300"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
      {/* </div> */}

      <div className="flex items-center space-x-4">
  <label className="block text-sm font-medium text-gray-700">Number of Screens</label>
  
  {/* Custom number input with left and right buttons */}
  <div className='flex items-center space-x-2'>
    <button
      type="button"
      onClick={() => setTheaterData({ ...theaterData, screens: Math.max(1, theaterData.screens - 1) })}
      className="bg-gray-200 text-gray-700 rounded-l-md px-3 py-2 hover:bg-gray-300 transition"
    >
      -
    </button>
    <h1>
    {theaterData.screens}
    </h1>
    <button
      type="button"
      onClick={() => setTheaterData({ ...theaterData, screens: theaterData.screens + 1 })}
      className="bg-gray-200 text-gray-700 rounded-r-md px-3 py-2 hover:bg-gray-300 transition"
    >
      +
    </button>
    </div>

</div>


      {/* Screen Type Selection */}

<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">Screen Type</label>
  <div className="flex flex-wrap gap-2">
    {screenOptions.map((option, index) => (
      <button
        type="button"
        key={index}
        onClick={() => handleScreenTypeChange(option)}
        className={`relative flex items-center justify-between px-4 py-2 rounded-md border ${
          theaterData.screenTypes.includes(option)
            ? 'bg-secondary text-black'
            : 'bg-primary text-white'
        }`}
      >
        {/* Option Text */}
        <span>{option}</span>

        {/* Show the close icon when the option is selected */}
        {theaterData.screenTypes.includes(option) && (
          <IoCloseOutline
            className="ml-2 text-black text-2xl"
          />
        )}
      </button>
    ))}
  </div>
</div>


      {/* Image Upload */}
      <div className="flex flex-col space-y-2">
        <label className="block text-sm font-medium text-gray-700">Upload Theater Image</label>

        <div className="relative border-dashed border-2 border-gray-300 rounded-md p-4 hover:border-blue-400 transition-colors">
          <input
            type="file"
            name="photo"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            {/* Display preview if an image is uploaded */}
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Theater preview"
                className="h-32 w-32 object-cover rounded-md border"
              />
            ) : (
              <>
                <FaUpload className="text-4xl text-gray-400" />
                <p className="text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">Image should be in JPG, PNG format, max size 5MB</p>
              </>
            )}
          </div>
          {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
        </div>

        {/* Optional: Button to remove the uploaded image */}
        {imagePreview && (
          <button
            type="button"
            onClick={() => {
              setImagePreview(null);
              setTheaterData({ ...theaterData, photo: null });
            }}
            className="mt-2 text-red-500 underline text-sm"
          >
            Remove Image
          </button>
        )}
      </div>

      {/* Food/Beverages and Parking */}
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="foodAndBeverages"
            checked={theaterData.foodAndBeverages}
            onChange={handleCheckboxChange}
            className="rounded border-gray-300"
          />
          <label className="block text-sm font-medium text-gray-700">Food/Beverages</label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="parking"
            checked={theaterData.parking}
            onChange={handleCheckboxChange}
            className="rounded border-gray-300"
          />
          <label className="block text-sm font-medium text-gray-700">Parking</label>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryhover"
          
        >
          Add Theater
        </button>
      </div>


      <input type="text" className="border-b border-gray-300 w-full p-2 focus:outline-none focus:border-primary transition duration-300" />


    </form>
  );
};

export default AddTheaterForm;
