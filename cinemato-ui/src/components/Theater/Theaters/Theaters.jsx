import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosInstance from '../../../axiosConfig';
import { RiFunctionAddLine } from "react-icons/ri";
import Loading from '../../Admin/AdminAddMovies/Loading';


const Theaters = () => {

  const navigate = useNavigate()
  const axiosInstance = useAxiosInstance()
  const BASE_URL = process.env.REACT_APP_BASE_API_URL;
  const [theatersData,setTheatersData] = useState([])
  const [loading,setLoading] = useState(true)
  // const theatersData = [
  //   {
  //     name: "Cineplex Cinema",
  //     screens: 10,
  //     screenTypes: ["IMAX", "3D", "2D"],
  //     capacity: 3000,
  //     photo: "https://assets.isu.pub/document-structure/230701091706-b2e53eac9b6daa0d187fa60a3b8a8b23/v1/15b8e3576daab01478c8c7a2e13111f8.jpeg",
  //     foodAndBeverages: true,
  //     location: "123 Main St, New York, NY"
  //   },
  //   {
  //     name: "Downtown Cinema",
  //     screens: 5,
  //     screenTypes: ["2D"],
  //     capacity: 1500,
  //     photo: "https://www.indiaretailing.com/wp-content/uploads/2018/07/pvr-cinemas-1-2-1-1-1-2.jpg",
  //     foodAndBeverages: false,
  //     location: "456 Elm St, San Francisco, CA"
  //   }
  // ];


  useEffect(() => {
    setLoading(true)
    const getTheaters = async () => {
      try{
        const response = await axiosInstance.get('theater/get-theaters/')
        if (response.status===200){
          console.log("success response: ",response)
          setTheatersData(response.data)
          
        }else{
          console.log("error response", response)
        }
      }catch(error){
        console.log("error found in get theaters",error)

      }
      setLoading(false)
    }
    getTheaters();
  },[])


  const handleAddTheater = async () => {
    navigate('/owner/add-theater/')
  }


  const handleTheaterDetails = async (theaterId) => {
    try {
      const response = await axiosInstance.get(`theater/theater-details/${theaterId}`)
      if (response.status === 200){
        console.log("theater response got success:123 ",response)
        navigate(`/owner/theater-details/${theaterId}/`)

      }else{
        console.error("error response: ",response)

      }
    }catch(error){
      console.error("something went wring: ",error)
    }
  }


  return (
    
    <div className="pt-[6rem] p-4">
    {loading?(
      <Loading loading={loading}/>
    ):(
      <>
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold text-center">Theaters</h1>
  <div className="flex justify-end">
    <button
      className="flex items-center gap-2 bg-yellow-100 text-black border-2 border-secondary rounded-full px-4 py-2 hover:bg-yellow-200 hover:border-secondary transition-all"
      onClick={handleAddTheater}
    >
      <RiFunctionAddLine size={30} />
      Add Theater
    </button>
  </div>
</div>

  
      {theatersData.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">No theaters listed</h2>
          <div className="flex justify-center">
    <button
      className="flex items-center gap-2 bg-yellow-100 text-black border-2 border-secondary rounded-full px-4 py-2 hover:bg-yellow-200 hover:border-secondary transition-all"
      onClick={handleAddTheater}
    >
      <RiFunctionAddLine size={30} />
      Add Theater
    </button>
  </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {theatersData.map((theater, index) => (
    <div
      key={index}
      className={`relative bg-white rounded-lg shadow-lg ${
        !theater.is_approved && "opacity-80 pointer-events-none "
      }` }
      onClick={theater.is_approved ? () => handleTheaterDetails(theater.id) : null} 
    >
      <img
        src={`${theater.image_url}`}
        alt={theater.name}
        className="w-full h-60 object-cover rounded-t-lg"
      />


      <div className="p-6 bg-white rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          {theater.name}
        </h2>

        {/* <p className="text-gray-600 mb-3 text-lg">
          <strong>Total Screens:</strong> {theater.total_screens}
        </p> */}

        <div className="mb-3">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Screen Types
          </p>
          <div className="flex flex-wrap gap-2">
            {theater.screen_types.map((type) => (
              <span
                key={type}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center mb-3">
          {theater.is_food_and_beverages ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3h14v2H5V3zM5 7h14v2H5V7zM5 11h14v8H5v-8zM7 15v2h2v-2H7zm8 0v2h2v-2h-2z"
                />
              </svg>
              <p className="text-green-600 font-semibold">
                Food and Beverages Available
              </p>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 5.636l-1.415 1.415L12 12l-4.95-4.95-1.414 1.414L12 14.828l7.778-7.778z"
                />
              </svg>
              <p className="text-red-600 font-semibold">No Food and Beverages</p>
            </>
          )}
        </div>

        <div className="flex items-center mb-3">
          {theater.is_parking ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 9l3 3-3 3m5-6h3a2 2 0 012 2v6a2 2 0 01-2 2h-6a2 2 0 01-2-2v-6a2 2 0 012-2h1"
                />
              </svg>
              <p className="text-green-600 font-semibold">Parking Available</p>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5h6v2H9V5zM4 12h16v2H4v-2zM4 15h16v2H4v-2z"
                />
              </svg>
              <p className="text-red-600 font-semibold">No Parking</p>
            </>
          )}
        </div>

        <p className="text-gray-700 text-lg mt-4">
          <strong>Location:</strong> {theater.location}
        </p>

      </div>
                          {!theater.is_approved && (
        <div className="absolute inset-0 flex items-center">
        <div className="bg-red-600 text-center text-white min-w-full items-center">
          <p className="text-lg font-bold">Admin has not approved this theater</p>
        </div>
      </div>
      )}


    </div>
  ))}
</div>

      )}
      </>
      )}
      
    </div>
  );
  
};

export default Theaters;
