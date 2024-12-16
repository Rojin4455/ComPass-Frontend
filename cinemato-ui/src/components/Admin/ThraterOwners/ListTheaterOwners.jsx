import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAxiosInstance from '../../../axiosConfig';
import { VscBell, VscGitPullRequestNewChanges } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { FaChampagneGlasses } from 'react-icons/fa6';
import showToast from '../../../utils/ToastNotifier';
import ListRequestedOwners from './ListRequestedOwners';


function ListTheaterOwners() {
  const [owners, setOwners] = useState([]);
  const axiosInstance = useAxiosInstance()
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([]);
  const [websocket, setWebsocket] = useState(null);
  const [isRead, setIsRead] = useState(false)
  const [isRequested, setIsRequested] = useState(false)

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

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/notifications/');

    ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if(data.type === "existing_notifications"){
        setNotifications(data.notifications)
      }else if(data.type === "new_notification"){
        const newNotification = {
          id: data.notification.id || Date.now(),
          message: data.notification.message,
          is_read: data.notification.is_read || false,
          created_at: data.notification.created_at || new Date().toISOString()
      };
      setNotifications(prev => [newNotification, ...prev]);
      }
      console.log("this is notification data: ", data)

    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    setWebsocket(ws);

    return () => {
      if (ws) ws.close();
    };
  }, []);


  useEffect(()=> {
    
    const is_read = notifications.some(notification => notification.is_read === false);
    setIsRead(is_read);
    console.log("notification:",notifications)
    console.log("isRead", is_read)
  }, [notifications])


  const handleApprove = async (ownerId) => {
    try {
      await axiosInstance.patch(`admin/theater-owners/${ownerId}/approve/`);
      showToast("success",'Owner approved successfully');
      setOwners(owners.map(owner => owner.id === ownerId ? { ...owner, is_approved: true } : owner));
    } catch (error) {
      console.error('Error approving owner:', error);
      showToast("error",'Failed to approve owner');
    }
  };



  const getRequestedOwners = async () => {
    // navigate('/admin/requested-owners-list/',{
    //   state: {
    //     notifications:notifications
    //   }
    // })
    setIsRequested(true)
  }

  const getOwner = async (ownerId) => {
    try{
    const response = await axiosInstance.get(`admin/owner-details/${ownerId}`)
    if (response.status === 200){
      
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
      {isRequested? ( 
      <ListRequestedOwners notifications={notifications} setNotifications={setNotifications} setIsRequested={setIsRequested}/>
):(
  <>
<h1 className="text-3xl font-bold mb-8 text-center">Theater Owner</h1>
  {owners.length === 0 ? (
    <>
    <p className="text-center text-gray-500">No theater owners found.</p>
    <div className="flex justify-center items-center mt-10">
    <button
  className={`flex items-center gap-2 bg-white text-primary border-2 border-primary rounded-lg px-6 py-3 shadow-lg 
              hover:bg-primary hover:text-white transition-all transform hover:scale-105 ${
                !isRead ? 'relative' : ''
              }`}
  onClick={getRequestedOwners}
>
  <div className="relative">
    <VscBell size={24} />
    {isRead && (
      <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
    )}
  </div>
  <span className="font-medium">Requests</span>
</button>
</div>
    </>
  ) : (
    <>
<div className="flex justify-end mb-6">
<button
  className={`flex items-center gap-2 bg-white text-primary border-2 border-primary rounded-lg px-6 py-3 shadow-lg 
              hover:bg-primary hover:text-white transition-all transform hover:scale-105 ${
                !isRead ? 'relative' : ''
              }`}
  onClick={getRequestedOwners}
>
  <div className="relative">
    <VscBell size={24} />
    {isRead && (
      <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
    )}
  </div>
  <span className="font-medium">Requests</span>
</button>

</div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     
      {owners.map((owner) => (
        <div
          key={owner.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          
        >
          {/* Owner Image (optional if you have owner images) */}
          {/* <img className="w-full h-40 object-cover" src={ownerImage} alt={owner.first_name} /> */}

          {/* Owner Information */}
          <div className="p-6">
            <div onClick={() => getOwner(owner.id)}>
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
            </div>

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

              <div className="space-x-2">
  {!owner.is_approved && (
    <button
      className="bg-green-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-600 transition ease-in-out duration-300 transform hover:-translate-y-1 hover:scale-105 focus:ring-2 focus:ring-green-300 focus:outline-none"
      onClick={() => handleApprove(owner.id)}
    >
      Approve
    </button>
  )}
</div>

            </div>
          </div>
        </div>
      
      )
      )}
    
    </div>
    </>
  )}
  </>
)}
      
  
</div>


  );
}   

export default ListTheaterOwners;
