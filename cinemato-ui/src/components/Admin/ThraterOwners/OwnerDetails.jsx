import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import useAxiosInstance from '../../../axiosConfig';
import { TiTick } from "react-icons/ti";
import { TiTimes } from 'react-icons/ti';
import showToast from '../../../utils/ToastNotifier';

function OwnerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const [ownerData, setOwnerData] = useState(null); // State to hold owner and theater details
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State to handle errors
  const BASE_URL = process.env.REACT_APP_BASE_API_URL




  // const getOwnerInfo = async (ownerId) => {
  //   try {
  //     const response = await axiosInstance.get(`admin/owner-all-details/${ownerId}/`);
  //     if (response.status === 200) {
  //       setOwnerData(response.data.owner_data); // Set owner data from response
  //       setLoading(false); // Stop loading after data is fetched
  //     } else {
  //       setError('Failed to fetch owner details');
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setError('Something went wrong');
  //     setLoading(false);
  //   }
  // };
  
  const handleApprove = async (theaterId) => {
    console.log("handle approve")
    try {
      await axiosInstance.patch(`admin/approve-theater/${theaterId}/`);

      showToast('success','Theater Approved');
      console.log(ownerData)

      const updatedTheaters = ownerData.theaters.map(theater => {
        if (theater.id === theaterId) {
          // Update the is_approved field
          return { ...theater, is_approved: true };
        }
        return theater;
      });
    
      // Update the ownerData state with the modified `is_approved` field
      setOwnerData({
        ...ownerData,
        theaters: updatedTheaters,
      });


      // Update the UI after disapproval
    } catch (error) {
      console.error('Error approving theater:', error);
      showToast('error','Failed to approving theater');
    }
  };

  
  const handleDisapprove = async (theaterId) => {
    console.log("handle disapprove")
    try {
      await axiosInstance.patch(`admin/disapprove-theater/${theaterId}/`);
    
      showToast("success",'Theater Disapproved');
      console.log(ownerData)

      const updatedTheaters = ownerData.theaters.map(theater => {
        if (theater.id === theaterId) {
          // Update the is_approved field
          return { ...theater, is_approved: false };
        }
        return theater;
      });
    
      // Update the ownerData state with the modified `is_approved` field
      setOwnerData({
        ...ownerData,
        theaters: updatedTheaters,
      });



      // Update the UI after disapproval
    } catch (error) {
      console.error('Error disapproving theater:', error);
      showToast('error','Failed to disapprove theater');
    }
  }
  useEffect(() => {
    const getOwnerInfo = async (ownerId) => {
      try {
        const response = await axiosInstance.get(`admin/owner-all-details/${ownerId}/`);
        if (response.status === 200) {
          console.log(response.data.owner_data)
          setOwnerData(response.data.owner_data); // Set owner data from response
          setLoading(false); // Stop loading after data is fetched
        } else {
          setError('Failed to fetch owner details');
          setLoading(false);
        }
      } catch (error) {
        setError('Something went wrong');
        setLoading(false);
      }
    };
    getOwnerInfo(id);
  }, []);



  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>{error}</div>; // Error state

  return (
    <div>
      {/* Back Button */}
      <div className="flex items-center mb-4">
        <IoIosArrowRoundBack
          size={50}
          className="text-gray-700 cursor-pointer"
          onClick={() => navigate('/admin/theaters/')}
        />
        <h1 className="text-2xl font-bold text-gray-800 ml-4">Owner Details</h1>
      </div>

      {/* Owner Info */}
      <div className="bg-white shadow-md rounded p-4 mb-6 px-16">
        <h2 className="text-xl font-bold mb-4">Owner Information</h2>
        <p><strong>Name:</strong> {ownerData.first_name} {ownerData.last_name}</p>
        <p><strong>Email:</strong> {ownerData.email}</p>
        <p><strong>Phone:</strong> {ownerData.phone}</p>
      </div>

      {/* Theaters List */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-center">Theaters</h2>
        {ownerData.theaters && ownerData.theaters.length > 0 ? (
          // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          //   {ownerData.theaters.map((theater) => (
          //     <div key={theater.name} className="bg-white shadow-md rounded p-4">
          //       <h3 className="text-lg font-bold">{theater.name}</h3>
          //       <p><strong>Location:</strong> {theater.location}</p>
          //       <p><strong>Email:</strong> {theater.email}</p>
          //       <p><strong>Phone:</strong> {theater.phone}</p>
          //       <p><strong>Total Screens:</strong> {theater.total_screens}</p>
          //       <p><strong>Screen Types:</strong> {theater.screen_types.join(', ')}</p>
          //       <p><strong>Food & Beverages:</strong> {theater.is_food_and_beverages ? 'Yes' : 'No'}</p>
          //       <p><strong>Parking:</strong> {theater.is_parking ? 'Yes' : 'No'}</p>
          //     </div>
          //   ))}
          // </div>






  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-16 z-10">
  {ownerData.theaters.map((theater, index) => (
    <div
      key={index}
      className={`relative rounded-lg shadow-lg p-4 ${!theater.is_approved && "pointer-events-none"}`}
    >
      {/* Theater Image */}
      <img
        src={`${theater.image_url}`}
        alt={theater.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {/* Theater Info */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-3 text-gray-800">{theater.name}</h2>

        {/* Total Screens */}
        {/* <p className="text-gray-600 mb-2 text-base">
          <strong>Total Screens:</strong> {theater.total_screens}
        </p> */}

        {/* Screen Types */}
        <div className="mb-2">
          <p className="text-base font-semibold text-gray-700 mb-1">Screen Types:</p>
          <div className="flex flex-wrap gap-2">
            {theater.screen_types.map((type) => (
              <span key={type} className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Food & Beverages */}
        <div className="flex items-center mb-2">
          {theater.is_food_and_beverages ? (
            <>
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3h14v2H5V3zM5 7h14v2H5V7zM5 11h14v8H5v-8zM7 15v2h2v-2H7zm8 0v2h2v-2h-2z" />
              </svg>
              <p className="text-green-600 font-semibold text-sm">Food and Beverages Available</p>
            </>
          ) : (
            <>
              <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-1.415 1.415L12 12l-4.95-4.95-1.414 1.414L12 14.828l7.778-7.778z" />
              </svg>
              <p className="text-red-600 font-semibold text-sm">No Food and Beverages</p>
            </>
          )}
        </div>

        {/* Parking Availability */}
        <div className="flex items-center mb-2">
          {theater.is_parking ? (
            <>
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5-6h3a2 2 0 012 2v6a2 2 0 01-2 2h-6a2 2 0 01-2-2v-6a2 2 0 012-2h1" />
              </svg>
              <p className="text-green-600 font-semibold text-sm">Parking Available</p>
            </>
          ) : (
            <>
              <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5h6v2H9V5zM4 12h16v2H4v-2zM4 15h16v2H4v-2z" />
              </svg>
              <p className="text-red-600 font-semibold text-sm">No Parking</p>
            </>
          )}
        </div>

        {/* Location */}
        <p className="text-gray-700 text-base mt-3">
          <strong>Location:</strong> {theater.location}
        </p>

        {/* Approve/Deny Buttons */}
        <div className="flex items-center justify-between mt-4">
          {/* Left side - Approved/Pending Badge */}
          <div className="flex items-left">
            <p className={`text-sm font-semibold px-3 py-1 rounded-full ${theater.is_approved ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              {theater.is_approved ? "Approved" : "Pending"}
            </p>
          </div>

          <div className="flex items-right pointer-events-auto">
            {theater.is_approved ? (
              <button
                className="flex items-center text-white px-4 py-2 bg-red-500 rounded-lg shadow-lg hover:bg-red-600 transition ease-in-out duration-300 transform hover:-translate-y-1 hover:scale-105 focus:ring-2 focus:ring-red-300 focus:outline-none"
                onClick={() => handleDisapprove(theater.id)}
              >
                <TiTimes size={20} className="mr-2 text-white" />
                Deny
              </button>
            ) : (
              <button
                className="flex items-center text-white px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition ease-in-out duration-300 transform hover:-translate-y-1 hover:scale-105 focus:ring-2 focus:ring-green-300 focus:outline-none"
                onClick={() => {
                  console.log("Button clicked, theater ID:", theater.id);
                  handleApprove(theater.id);
                }}
                // onClick={handleApprove}
              >
                <TiTick size={20} className="mr-2 text-white" />
                Approve
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>











        ) : (
          <p>No theaters found for this owner.</p>
        )}
      </div>
    </div>
  );
}

export default OwnerDetails;
