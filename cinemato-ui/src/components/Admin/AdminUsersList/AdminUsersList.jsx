import React, { useState, useEffect } from 'react';
import useAxiosInstance from '../../../axiosConfig';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { FaUserCircle, FaCamera } from 'react-icons/fa';


function AdminUsersList() {
  const [users, setUsers] = useState([]); // Initial data from usersData array
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const axiosInstance = useAxiosInstance();
  const BASE_URL = process.env.REACT_APP_BASE_API_URL;
  const [totalPages,setTotalPages] = useState(0)
  console.log("users: ",users);
  


  // Pagination calculation
  // const indexOfLastUser = currentPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = users

  // const totalPages = Math.ceil(users.length / usersPerPage);



  useEffect(() => {

    const fetchUsers = async () =>{
    
    try{
        const response = await axiosInstance.post('/admin/allusers/',{
          "currentPage":currentPage,
          'usersPerPage':usersPerPage,
        })
        console.log("full response",response.data.allUsers)
        if(response.status === 200){
            console.log("Success",response.data)
            setUsers(response.data.allUsers)
            setTotalPages(Math.ceil(response.data.totalCount/usersPerPage))
        }else{
            console.log("error response",response)
        }
    }catch(error){
        console.error("something went wrong",error)
    }
}
    fetchUsers();
  },[currentPage])
  // Handle status change
  const handleStatusChange = (userId) => {

    const changeStatus = async () => {
      try {
        const response = await axiosInstance.put(`/admin/set-status/${userId}`);
        
        if (response.status === 200) {
          console.log("Status changed successfully");
          
          // Update the local state only after a successful response
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === userId
                ? { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' }
                : user
            )
          );
        } else {
          console.log("Failed to change status");
        }
      } catch (error) {
        console.error("Error changing status:", error);
      }
    };
  
    // Call the async function
    changeStatus();
  };
  

  return (
    <div className="p-4">
      {/* Header section */}
      <div className="flex justify-between items-center mb-4">
        <button className="text-lg font-semibold px-4 py-2 bg-gray-200 rounded-md">
          All ({users.length}) ▼
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left ">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Join Date</th>
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,index) => (
              <tr key={user.id || index} className="border-t">
            <td className="px-4 py-2">
            {/* {user.image ? (
                <img src={user.image} alt="User" className="w-12 h-12 rounded-full" />
            ) : (
                <FaUserCircle className="w-12 h-12 text-gray-400" />
            )} */}
            {user.profile_pic ? (
                
                    <div className="relative w-15 h-17">
                        <img
                            src={`${BASE_URL}media/${user.profile_pic}`}  // Full URL to the image
                            alt="Profile"
                            className="w-14 h-14 rounded-full object-cover"
                        />
                    </div>
                ) : (
                    <FaUserCircle size={55} className="bg-white text-secondary cursor-pointer" />
                )}
            </td>

                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{new Date(user.date_joined).toLocaleDateString()}</td>
                <td className="px-4 py-2">{user.phone?user.phone:"N.A"}</td>
                <td className="px-4 py-2 text-primary">{user.is_active?"True":"False"}</td>
                <td className="px-4 py-2">
                  <button
                    className={`px-4 py-2 rounded-md ${
                      user.status === 'Active'
                        ? 'bg-red-700 text-white'
                        : 'bg-green-700 text-white'
                    }`}
                    onClick={() => handleStatusChange(user.id)}
                  >
                    {user.status === 'Active' ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-md ${
              currentPage === i + 1 ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminUsersList;

