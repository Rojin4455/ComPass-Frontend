import React, { useState,useEffect } from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaParking, FaFilm } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Loading from '../../Admin/AdminAddMovies/Loading';
import useAxiosInstance from '../../../axiosConfig';
import { FaPlus } from 'react-icons/fa6';
import { BsPlusSquareDotted } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaSquareParking } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { HiMiniUserGroup } from "react-icons/hi2";






const TheaterDetails = () => {

  const [loading, setLoading] = useState(true);
  const [theater, setTheaterData] = useState({});
  const [screens,setScreens] = useState({})
  const axiosInstance = useAxiosInstance();
  const BASE_URL = process.env.REACT_APP_BASE_API_URL
  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const getTheaters = async (id) => {
      try {
        const response = await axiosInstance.get(`theater/theater-details/${id}`);
        if (response.status === 200) {
          setTheaterData(response.data.data);
          setScreens(response.data.screen_datas)
          console.log(response)
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


  const handleAddScreen = async () => {
    navigate(`/owner/list-screens/${id}`)
  }

  console.log("theater:", theater.name);



  const handleScreenDetails = (id) => {
    navigate('/owner/screen-details/')
    console.log("ID: ",id)
  }
  

  return (
    <>
      <Loading loading={loading} />
      {theater ? (
        <div className="container mx-auto p-4 mt-[6rem]">
          {/* Theater Information */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            {/* Theater Image */}
            {/* <div className="flex justify-center mb-4">
              <img
                src={`${BASE_URL}${theater.photo}`}
                alt={theater.name}
                className="rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2"
              />
            </div> */}

            {/* Theater Name */}
            <h2 className="text-3xl font-bold text-center mb-6">{theater.name}</h2>

            {/* Theater Details in Column Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Location */}
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-xl text-red-500 mr-3" />
                <p className="text-gray-700">
                  <strong>Location:</strong> {theater.location}
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center">
                <FaPhoneAlt className="text-xl text-green-500 mr-3" />
                <p className="text-gray-700">
                  <strong>Phone:</strong> {theater.phone}
                </p>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <MdEmail className="text-xl text-blue-500 mr-3" />
                <p className="text-gray-700">
                  <strong>Email:</strong> {theater.email}
                </p>
              </div>

              {/* Parking */}
              <div className="flex items-center">
                <FaSquareParking className={`text-xl mr-3 ${theater.is_parking ? 'text-orange-500' : 'text-gray-500'}`} />
                <p className="text-gray-700">
                  <strong>Parking:</strong> {theater.is_parking ? 'Available' : 'Not Available'}
                </p>
              </div>

              {/* Food and Beverages */}
              <div className="flex items-center">
                <IoFastFood className={`text-xl mr-3 ${theater.is_food_and_beverages ? 'text-yellow-500' : 'text-gray-500'}`} />
                <p className="text-gray-700">
                  <strong>Food & Beverages:</strong> {theater.is_food_and_beverages ? 'Available' : 'Not Available'}
                </p>
              </div>

              {/* Screen Types */}
              <div className="flex items-center">
                <FaFilm className="text-xl text-purple-500 mr-3" />
                <p className="text-gray-700">
                  <strong>Screen Types:</strong> {theater.screen_types?.join(', ') || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Screen Information */}
          {screens && screens.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {screens.map((screen, index) => (
      <div
        key={index}
        className="bg-white shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-1xl"
        onClick={() => navigate(`/owner/screen-details/${screen.id}/`)}
      >
        {/* Image Thumbnail */}
        {screen.screen_images && screen.screen_images.length > 0 && (
          <div
            className="h-48 w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${screen.screen_images[0].image_url})`,
            }}
            
          />
        )}

        {/* {console.log("First image URL: ", `${BASE_URL}${screen.screen_images[0].image}`)} */}

        {/* Screen Information */}
        <div className="p-6 bg-gray-100 rounded-b-lg shadow-md">
  {/* Screen Name */}
  <h3 className="text-3xl font-extrabold mb-4 text-gray-900"
  >
    {screen.name}
  </h3>

  {/* Screen Type */}
  <div className="mb-4">
    <p className="text-lg text-gray-600">
      <strong className="text-gray-800">Type:</strong>{" "}
      <span className="bg-blue-100 text-primary px-2 py-1 rounded-md">
        {screen.type}
      </span>
    </p>
  </div>

  {/* Capacity with Icon */}
  <div className="flex items-center gap-3 mb-4">
    <p className="text-lg text-gray-600">
      <strong className="text-gray-800">Capacity:</strong>{" "}
      <span className="text-green-700 px-1 py-2-1 rounded-md w-10">
        {screen.capacity}
      </span>
    </p>
    <HiMiniUserGroup className="text-green-700 text-xl" />
  </div>

  {/* Optional Additional Info */}
  {/* <div className="border-t pt-4 mt-4 text-sm text-gray-500">
    <p className="italic">Hover to learn more about the screen.</p>
  </div> */}
</div>

        {/* Optional Hover Effect */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300">
          <div className="p-4">
            <p className="text-white">Click for more details</p>
          </div>
        </div>
      </div>
    ))}

    {/* Add Screen Button */}
    <div
      className="flex justify-center items-center bg-white shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
      onClick={() => console.log('Add Screen Button Clicked')} // Add your onClick functionality here
    >
      <div className="flex flex-col justify-center items-center h-full w-full p-6 cursor-pointer" onClick={handleAddScreen}>
        {/* Plus Icon */}
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        {/* Add Screen Text */}
        <p className="text-lg font-bold text-gray-600 mt-2">Add Screen</p>
      </div>
    </div>
  </div>
          ) : (
            <div className="text-center">
            <p className="text-yellow-600">No screens available for this theater.</p>
            <button 
            
            className="mt-4 w-60 h-16 bg-primary text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center mx-auto hover:bg-primaryhover"
            onClick={handleAddScreen}
          >
            <BsPlusSquareDotted className="mr-2" /> Add Screen
          </button>
          </div>
          )}
        </div>
      
      ) : (
        <p className="text-center text-gray-600">Theater data not available.</p>
      )}
    </>
  );
};

export default TheaterDetails