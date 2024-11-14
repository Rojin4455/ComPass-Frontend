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
import { useDispatch } from 'react-redux';
import { setContent } from '../../../slices/OwnerScreenSlice';
import { setScreen } from '../../../slices/screenFullDetailsSlice';
import SnackDetailModal from './SnackDetailModal';






const TheaterDetails = () => {

  const [loading, setLoading] = useState(true);
  const [theater, setTheaterData] = useState({});
  const [screens,setScreens] = useState({})
  const axiosInstance = useAxiosInstance();
  const [snacks, setSnacks] = useState([])
  const BASE_URL = process.env.REACT_APP_BASE_API_URL
  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true);
    const getTheaters = async (id) => {
      try {
        const response = await axiosInstance.get(`theater/theater-details/${id}`);
        if (response.status === 200) {
          setTheaterData(response.data.data);
          dispatch(setScreen({theater:response.data.data.id}))
          setScreens(response.data.screen_datas)
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


  useEffect(() => {
    const fetchAddedSnacks = async () => {
        try{
          const response = await axiosInstance.get(`theater/theater/get-added-snack/${id}/`)
          if (response.status === 200) {
            console.log('success response: ',response)

            const snackItems = response.data.data.flatMap((item) => ({
              id: item.id,
              name: item.snack_item.name,
              description: item.snack_item.description,
              is_vegetarian: item.snack_item.is_vegetarian,
              image_url: item.snack_item.image_url,
              calories: item.snack_item.calories,
              category_name: item.snack_item.category_name,
              price: item.price,
              stock: item.stock,
            }));


            setSnacks(snackItems)

          }else{
            console.error("error response: ",response)
          }
        }catch(error){
          console.error("something went wrong: ",error)
        }
    }

    fetchAddedSnacks()
  },[])


  const handleAddScreen = async () => {
    navigate(`/owner/list-screens/${id}`)
  }




  const handleScreenDetails = (id) => {
    navigate('/owner/screen-details/')
  }
  

  const onAddSnack = () => {
    dispatch(setContent({snackContent:'theater'}))
    
    navigate('/owner/theater-add-snacks/')

  }


  const [selectedSnack, setSelectedSnack] = useState(null);

  // Function to handle showing the modal
  const handleSnackClick = (snack) => {
    setSelectedSnack(snack);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setSelectedSnack(null);
  }

  return (
    <>
      <Loading loading={loading} />
      {theater ? (
        <div className="container mx-auto p-4 mt-[6rem]">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">

            <h2 className="text-3xl font-bold text-center mb-6">{theater.name}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-x-60">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-xl text-red-500 mr-3" />
                <p className="text-gray-700">
                  <strong>Location:</strong> {theater.location}
                </p>
              </div>

              <div className="flex items-center">
                <FaPhoneAlt className="text-xl text-green-500 mr-3" />
                <p className="text-gray-700">
                  <strong>Phone:</strong> {theater.phone}
                </p>
              </div>

              <div className="flex items-center">
                <MdEmail className="text-xl text-blue-500 mr-3" />
                <p className="text-gray-700">
                  <strong>Email:</strong> {theater.email}
                </p>
              </div>

              <div className="flex items-center">
                <FaSquareParking className={`text-xl mr-3 ${theater.is_parking ? 'text-orange-500' : 'text-gray-500'}`} />
                <p className="text-gray-700">
                  <strong>Parking:</strong> {theater.is_parking ? 'Available' : 'Not Available'}
                </p>
              </div>

              <div className="flex items-center">
                <IoFastFood className={`text-xl mr-3 ${theater.is_food_and_beverages ? 'text-yellow-500' : 'text-gray-500'}`} />
                <p className="text-gray-700">
                  <strong>Food & Beverages:</strong> {theater.is_food_and_beverages ? 'Available' : 'Not Available'}
                </p>
              </div>

              <div className="flex items-center">
                <FaFilm className="text-xl text-purple-500 mr-3" />
                <p className="text-gray-700">
                  <strong>Screen Types:</strong> {theater.screen_types?.join(', ') || 'N/A'}
                </p>
              </div>
            </div>
          </div>


          <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex items-center">
      <button
        className="flex flex-col items-center justify-center bg-gray-200 text-gray-700 rounded-md w-20 h-20 shadow-lg hover:bg-gray-300 transition-all duration-300 mr-4"
        onClick={onAddSnack}
      >
        <BsPlusSquareDotted className="text-3xl font-bold" />
        <span className="text-xs mt-1">Add Snacks</span>
      </button>

      <div className="flex overflow-x-auto space-x-4">
        {snacks.map((snack) => (
          <div
            key={snack.id}
            className="relative flex-shrink-0 w-20 h-20 cursor-pointer"
            onClick={() => handleSnackClick(snack)}
          >
            <img
              src={snack.image_url}
              alt={snack.name}
              className="w-full h-full object-cover rounded-md shadow-md hover:opacity-70 transition duration-300"
            />
            <div className="absolute inset-0 flex items-center bg-black bg-opacity-60 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-xs font-semibold text-center">{snack.name}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedSnack && (
        <SnackDetailModal snack={selectedSnack} onClose={closeModal} setSnacks={setSnacks} snacks={snacks} />
      )}
    </div>


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