import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import useAxiosInstance from '../../../axiosConfig';
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';


function ListTheaterOwners() {
  const [owners, setOwners] = useState([]);
  const axiosInstance = useAxiosInstance()
  const navigate = useNavigate()

  // Fetch theater owners from the API
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axiosInstance.get('admin/get-owners/');
        console.log(response) 
        setOwners(response.data.allOwners);
      } catch (error) {
        console.error('Error fetching theater owners:', error);
      }
    };

    fetchOwners();
  }, []);

  // Approve a theater owner
  // const handleApprove = async (ownerId) => {
  //   try {
  //     await axiosInstance.patch(`admin/theater-owners/${ownerId}/approve/`);
  //     toast.success('Owner approved successfully');
  //     // Update the UI after approval
  //     setOwners(owners.map(owner => owner.id === ownerId ? { ...owner, is_approved: true } : owner));
  //   } catch (error) {
  //     console.error('Error approving owner:', error);
  //     toast.error('Failed to approve owner');
  //   }
  // };

  // Disapprove a theater owner
  // const handleDisapprove = async (ownerId) => {
  //   try {
  //     await axiosInstance.patch(`admin/theater-owners/${ownerId}/disapprove/`);
  //     toast.success('Owner disapproved successfully');
  //     // Update the UI after disapproval
  //     setOwners(owners.map(owner => owner.id === ownerId ? { ...owner, is_approved: false } : owner));
  //   } catch (error) {
  //     console.error('Error disapproving owner:', error);
  //     toast.error('Failed to disapprove owner');
  //   }
  // };


  const getRequestedOwners = async () => {
    navigate('/admin/requested-owners/')
  }

  const getOwner = async (ownerId) => {
    try{
    const response = await axiosInstance.get(`admin/owner-details/${ownerId}`)
    if (response.status === 200){
      toast.success("owner details found successfully")
      
      navigate(`/admin/owner-details/${response.data.owner_data.id}`)
    }else{
      console.error(response)
    }
  }catch(error){
    console.error("bad response", error)
  }
}

  return (
    <div className="container mx-auto p-6">
  <h1 className="text-3xl font-bold mb-8 text-center">Theater Owners</h1>
  {owners.length === 0 ? (
    <p className="text-center text-gray-500">No theater owners found.</p>
  ) : (
    <>
<div className="flex justify-end mb-6">
  <button
    className="flex items-center gap-2 bg-primary text-white border-2 border-primary rounded-lg px-6 py-3 shadow-lg hover:bg-primaryhover hover:bg-primaryhover: '#284757',
 transition-all transform hover:scale-105"
 onClick={getRequestedOwners}
  >
    <VscGitPullRequestNewChanges size={24} />
    All Requests
  </button>
</div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     
      {owners.map((owner) => (
        <div
          key={owner.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          onClick={() => getOwner(owner.id)}
        >
          {/* Owner Image (optional if you have owner images) */}
          {/* <img className="w-full h-40 object-cover" src={ownerImage} alt={owner.first_name} /> */}

          {/* Owner Information */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{owner.first_name}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Business:</strong> {owner.business_name}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Phone:</strong> {owner.phone}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Email:</strong> {owner.email}
            </p>

            {/* <p className="text-lg mb-4">
              <strong>Status:</strong>{" "}
              {owner.is_approved ? (
                <span className="text-green-600 font-semibold">Approved</span>
              ) : (
                <span className="text-red-600 font-semibold">Pending</span>
              )}
            </p> */}

            {/* Button Container */}
            <div className="flex justify-between items-center">
              <p
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  owner.is_approved ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}
              >
                {owner.is_approved ? "Approved" : "Pending"}
              </p>

              {/* Approve/Disapprove Buttons */}
              {/* <div className="space-x-2">
                {owner.is_approved ? (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors"
                    onClick={() => handleDisapprove(owner.id)}
                  >
                    Disapprove
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                    onClick={() => handleApprove(owner.id)}
                  >
                    Approve
                  </button>
                )}
              </div> */}
            </div>
          </div>
        </div>
      
      )
      )}
    
    </div>
    </>
  )}
</div>


  );
}

export default ListTheaterOwners;
