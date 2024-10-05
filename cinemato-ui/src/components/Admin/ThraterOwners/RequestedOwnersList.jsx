import React, { useState,useEffect } from 'react'
import useAxiosInstance from '../../../axiosConfig';
import { toast } from 'sonner';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


function RequestedOwnersList() {
  // Sample state with owners
  const [owners, setOwners] = useState([]);

  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axiosInstance.get('admin/get-requested-owners/');
        console.log(response) 
        setOwners(response.data.allOwners);
        console.log("owners: ",owners)
      } catch (error) {
        console.error('Error fetching theater owners:', error);
      }
    };

    fetchOwners();
  }, []);



  // Function to handle approving an owner (remove from list)
  const handleApprove = async (ownerId) => {
    try {
      await axiosInstance.patch(`admin/theater-owners/${ownerId}/approve/`);
      toast.success('Owner approved successfully');
      // Update the UI after approval
      setOwners(owners.map(owner => owner.id === ownerId ? { ...owner, is_approved: true } : owner));
    } catch (error) {
      console.error('Error approving owner:', error);
      toast.error('Failed to approve owner');
    }
  };
  console.log(owners)
  return (
    <div className="container mx-auto p-4">
     <div className="flex items-center mb-4">
        <IoIosArrowRoundBack size={50} className="text-gray-700 cursor-pointer" onClick={() => navigate('/admin/theaters/')}/>
        <h1 className="text-2xl font-bold text-gray-800 ml-4">Requested Theater Owners</h1>
      </div>
      {owners.length === 0 ? (
        <p>No Requested owners found.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Owner Name</th>
              <th className="py-2 px-4 border">Business Name</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {owners
              .map((owner) => (
                <tr key={owner.id}>
                  <td className="py-2 px-4 border text-center">{owner.first_name}</td>
                  <td className="py-2 px-4 border text-center">{owner.business_name}</td>
                  <td className="py-2 px-4 border text-center">{owner.phone}</td>
                  <td className="py-2 px-4 border text-center">{owner.email}</td>
                  <td className="py-2 px-4 border text-center text-red-600">Pending</td>
                  <td className="py-2 px-4 border text-center">
                    {/* Approve Button with Tick Symbol */}
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors"
                      onClick={() => handleApprove(owner.id)}
                    >
                      ✔
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RequestedOwnersList;
