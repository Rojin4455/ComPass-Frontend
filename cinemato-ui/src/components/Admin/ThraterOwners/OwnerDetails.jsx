import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import useAxiosInstance from '../../../axiosConfig';

function OwnerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const [ownerData, setOwnerData] = useState(null); // State to hold owner and theater details
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const getOwnerInfo = async (ownerId) => {
      try {
        const response = await axiosInstance.get(`admin/owner-all-details/${ownerId}/`);
        if (response.status === 200) {
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
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Owner Information</h2>
        <p><strong>Name:</strong> {ownerData.first_name} {ownerData.last_name}</p>
        <p><strong>Email:</strong> {ownerData.email}</p>
        <p><strong>Phone:</strong> {ownerData.phone}</p>
      </div>

      {/* Theaters List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Theaters</h2>
        {ownerData.theaters && ownerData.theaters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownerData.theaters.map((theater) => (
              <div key={theater.name} className="bg-white shadow-md rounded p-4">
                <h3 className="text-lg font-bold">{theater.name}</h3>
                <p><strong>Location:</strong> {theater.location}</p>
                <p><strong>Email:</strong> {theater.email}</p>
                <p><strong>Phone:</strong> {theater.phone}</p>
                <p><strong>Total Screens:</strong> {theater.total_screens}</p>
                <p><strong>Screen Types:</strong> {theater.screen_types.join(', ')}</p>
                <p><strong>Food & Beverages:</strong> {theater.is_food_and_beverages ? 'Yes' : 'No'}</p>
                <p><strong>Parking:</strong> {theater.is_parking ? 'Yes' : 'No'}</p>
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
