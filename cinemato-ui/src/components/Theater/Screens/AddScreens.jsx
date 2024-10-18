import React, { useState,useEffect } from 'react';
import ToastNotifier from '../../../utils/ToastNotifier';
import { FaUpload } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Admin/AdminAddMovies/Loading';
import useAxiosInstance from '../../../axiosConfig';
import './ListScreens.css'
import axios from 'axios';
import { IoIosCloseCircleOutline } from "react-icons/io";



function AddScreens() {
  const [screenName, setScreenName] = useState('');
  const [tiers, setTiers] = useState([]);
  const [totalTiers, setTotalTiers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [theater, setTheaterData] = useState({});
  const [selectedScreenType, setSelectedScreenType] = useState(''); // To track the selected type
  const [nameError,setNameError] = useState("")
  const navigate = useNavigate();

  const [screenTypes, setScreenTypes] = useState()

  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [imageError,setImageError] = useState(null)

  const {id}= useParams()
  const axiosInstance = useAxiosInstance()
  // const [theaterImages, setTheaterImages] = useState(null);

  // useEffect(() => {
  //   if (tiers.length > 5){
  //       ToastNotifier("warning","Number of tiers not exceed more than 5")
  //   }
  // },[tiers])

  useEffect(() => {
    setLoading(true);
    const getTheaters = async (id) => {
      try {
        const response = await axiosInstance.get(`theater/theater-details/${id}/`);
        if (response.status === 200) {
          setTheaterData(response.data.data);
          setScreenTypes(response.data.data.screen_types)
        } else {
          console.log("Error response", response);
        }
      } catch (error) {
        console.log("Error found in get theaters", error);
      }
      setLoading(false);
    };
    getTheaters(id);
  }, []);


  const [imageFiles, setImageFiles] = useState([]);  // To store actual files

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
  
    // Update imagePreviews state correctly
    setImagePreviews((prev) => [...prev, ...newImagePreviews]);
    setImageFiles((prev) => [...prev, ...files]);  // Store actual files

  
    // Clear any previous errors
    setErrors({});
    setImageError("");  // Reset error on new image upload
  };
  
  const removeImage = (index) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);

    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);
  
    // Check if array is empty after removal to show validation error
    if (updatedPreviews.length === 0) {
      setImageError("Image Field Cannot Be Empty");
    } else {
      setImageError("");
    }
  };
  
  // Use useEffect to manage validation when imagePreviews updates
  useEffect(() => {
    if (imagePreviews.length === 0) {
      setImageError("Image Field Cannot Be Empty");
    } else {
      setImageError("");
    }
  }, [imagePreviews]);

  

  // Handle the number of tiers and create empty tier fields accordingly
  const handleTierCountChange = (e) => {
    const count = parseInt(e.target.value);
    setTotalTiers(count);
    const newTiers = Array.from({ length: count }, () => ({ name: '', price: '', capacity: '' }));
    setTiers(newTiers);
  };

  // Handle changes in tier details
  const handleTierChange = (index, field, value) => {
    const updatedTiers = tiers.map((tier, i) => i === index ? { ...tier, [field]: value } : tier);
    setTiers(updatedTiers);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("screen name, tiers, images: ", screenName, tiers, imagePreviews);
  
    // Inline Validation for Form Inputs
    if (screenName.trim() === "" && tiers.length === 0 && !selectedScreenType && imagePreviews.length < 1) {
      ToastNotifier("error", "Please Fill All Fields");
      return;
    }
    
    if (screenName.trim() === "") {
      ToastNotifier("error", "Enter a valid Screen Name");
      return;
    }
  
    for (let i = 0; i < tiers.length; i++) {
      const tier = tiers[i];
      if (!tier.name || tier.name.trim() === "") {
        ToastNotifier("error", `Tier ${i + 1} name is required`);
        return;
      } else if (!tier.price || tier.price <= 0) {
        ToastNotifier("error", `Tier ${i + 1} price must be a positive number`);
        return;
      } else if (!tier.capacity || tier.capacity <= 0) {
        ToastNotifier("error", `Tier ${i + 1} capacity must be a positive number`);
        return;
      }
    }
  
    if (tiers.length === 0) {
      ToastNotifier("error", "At least one tier is required");
      return;
    } else if (tiers.length > 5) {
      ToastNotifier("error", "Number of tiers cannot exceed 5");
      return;
    }
  
    if (imagePreviews.length < 1) {
      ToastNotifier("error", "Image field is mandatory");
      return;
    }

  
    if (!selectedScreenType) {
      ToastNotifier("error", "Please select the Screen Type");
      return;
    }

    const formData = new FormData();

    // Append screen basic details
    formData.append('name', screenName);
    formData.append('type', selectedScreenType);
    console.log("images: ",imagePreviews)

    // Append image files
    // imagePreviews.forEach((file,index) => {
    //   formData.append(`screen_images_${index}`, file);
    // });

    imageFiles.forEach((file, index) => {
      formData.append(`screen_images[]`, file);  // Unique key for each file
    });
    const transformedTiers = tiers.map(tier => ({
      name: tier.name,
      price: parseFloat(tier.price),
      total_seats: parseInt(tier.capacity, 10)
    }));

    // Append tiers as JSON
    formData.append('tiers', JSON.stringify(transformedTiers));



  
    const screenData = {
      screenName,
      tiers,
      imagePreviews,
      selectedScreenType,
    };
    console.log("form Data: " ,formData)
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    try {
      const response = await axiosInstance.post(`theater/add-screen/${id}/`,
        formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log(response);
        ToastNotifier("success", "Screen added successfully");
        navigate(`/owner/theater-details/${id}/`)
        
      } else {
        console.error("Error response:", response);
        ToastNotifier("error", "Something went wrong");
      }
    } catch (error) {
      ToastNotifier("error", "Something went wrong");
      console.error(error);
    }
  
    console.log("Screen Data:", screenData);
  };



  const handleScreenTypeSelect = (type) => {
    setSelectedScreenType(type); // Update selected type
  };


  return (
    <>
    <Loading loading={loading} />
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-2xl transform transition-all duration-500 hover:shadow-lg mt-[6rem]">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-primary uppercase tracking-wide">Add Screen to Theater</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Screen Name */}
        <div className="relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">Screen Name</label>
          <input
            type="text"
            value={screenName}
            onChange={(e) => {
              setScreenName(e.target.value);
              if(e.target.value.trim() === ""){
                setNameError("Enter a valid Name")
              }else{
                setNameError("")
              }
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-blue-500 hover:border-blue-500 transition duration-300 shadow-md"
            placeholder="Enter screen name"
          />
          {nameError && <p className='text-[#ef4b4b] text-sm font-extralight tracking-wider'>{nameError}</p>}
        </div>

        {/* Total Tiers */}
        <div className="relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">Total Tiers</label>
          <input
            type="number"
            value={totalTiers}
            onChange={handleTierCountChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-blue-500 hover:border-blue-500 transition duration-300 shadow-md"
            placeholder="Enter number of tiers"
            
          />
          {tiers.length > 5 && <p className='text-[#ef4b4b] text-sm font-extralight tracking-wider'>Number of tiers not exceed more than 5</p>}
        </div>

        {/* Dynamic Tier Fields */}
        {tiers.length > 0 && tiers.length < 6 && (
  <div className="space-y-6 transition-all ease-in-out transform">
    {tiers.map((tier, index) => (
      <div
        key={index}
        className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-500 transform hover:-translate-y-1 opacity-0 animate-fade-in"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <h4 className="text-xl font-medium subpixel-antialiased font-sans text-black mb-4">Tier {index + 1} Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier Name */}
          <div className="relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tier Name</label>
            <input
              type="text"
              value={tier.name}
              onChange={(e) => handleTierChange(index, 'name', e.target.value)}
              className={`w-full px-4 py-2 border ${tier.name === '' ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-blue-500 hover:border-blue-500 transition duration-300 shadow-md`}
              placeholder="Enter tier name"
            />
          </div>

          {/* Tier Price */}
          <div className="relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tier Price</label>
            <input
              type="number"
              value={tier.price}
              onChange={(e) => handleTierChange(index, 'price', e.target.value)}
              className={`w-full px-4 py-2 border ${tier.price <= 0 ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-blue-500 hover:border-blue-500 transition duration-300 shadow-md`}
              placeholder="Enter price"
              min={1}
            />
          </div>

          {/* Tier Capacity */}
          <div className="relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tier Capacity</label>
            <input
              type="number"
              value={tier.capacity}
              onChange={(e) => handleTierChange(index, 'capacity', e.target.value)}
              className={`w-full px-4 py-2 border ${tier.capacity <= 0 ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-blue-500 hover:border-blue-500 transition duration-300 shadow-md`}
              placeholder="Enter capacity"
              min={1}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
)}


    <label className="block text-gray-700 text-sm font-bold mb-2">Select Screen Type</label>
      <div className="flex space-x-4">  {/* Flex container for buttons in a row */}
        {screenTypes?.map((type, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleScreenTypeSelect(type)}
            className={`px-4 py-2 rounded-lg focus:outline-none transition-colors 
              ${selectedScreenType === type ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {type}
          </button>
        ))}
      </div>


        {/* Theater Images */}
        <div className="flex flex-col space-y-2">
    <label className="block text-sm font-medium text-gray-700">Upload Theater Images</label>

    <div className="relative border-dashed border-2 border-gray-300 rounded-md p-4 hover:border-blue-400 transition-colors">
      <input
        type="file"
        name="photos"
        multiple
        onChange={handleImageUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center justify-center space-y-2">
        {/* Display previews of uploaded images */}
        {imagePreviews.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Theater preview ${index + 1}`}
                  className="h-32 w-32 object-cover rounded-md border"
                />
                {/* <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 text-red-500 bg-white p-1 shadow-md"
                >
                  &times;
                </button> */}
                <IoIosCloseCircleOutline className='absolute top-1 right-1 text-white' size={20} onClick={() => removeImage(index)}/>
              </div>
            ))}
          </div>
        ) : (
          <>
            <FaUpload className="text-4xl text-gray-400" />
            <p className="text-gray-500">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400">Images should be in JPG, PNG format, max size 5MB</p>
          </>
        )}
      </div>
      {errors.photos && <p className="text-red-500 text-sm">{errors.photos}</p>}
    </div>
    {imageError && <p className='text-[#ef4b4b] text-sm font-extralight tracking-wider'>{imageError}</p>}
  </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-10 rounded-lg hover:primary  focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-xl transform hover:scale-105"
          >
            Finish
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default AddScreens;
