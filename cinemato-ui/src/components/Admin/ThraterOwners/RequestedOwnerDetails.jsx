import React,{useEffect, useState} from "react";
import useAxiosInstance from "../../../axiosConfig";
import showToast from "../../../utils/ToastNotifier";

const RequestedOwnerDetails = ({ notificationId, goBack }) => {

    const [owner, setOwner] = useState({})
    const axiosInstance = useAxiosInstance()
    useEffect(() => {

        const fetchOwnerDetails = async () => {

        
        try{
            const response = await axiosInstance.get(`owner/owner-details/${notificationId}/`)
            if (response.status === 200) {
                console.log("good response,", response)
                setOwner(response.data)
            }else{
                console.error("error response")
            }
        }catch(error){
            console.error("something went wrong")
        }
    }
    fetchOwnerDetails()
    },[])


    const handleApprove = async (ownerId) => {
        try {
          const response = await axiosInstance.patch(`admin/theater-owners/${ownerId}/approve/`);
          if (response.status === 200){
          showToast("success",'Owner approved successfully');
          
          setOwner({...owner, is_approved:true});
          }
        } catch (error) {
          console.error('Error approving owner:', error);
          showToast("error",'Failed to approve owner');
        }
      };

      const handleBlock = async (id) => {
        try {
            const response = await axiosInstance.patch(`admin/theater-owners/${id}/disapprove/`);
            if (response.status === 200){
            showToast("success",'Owner Blocked successfully');
            
            setOwner({...owner, is_approved:false});
            }
          } catch (error) {
            console.error('Error approving owner:', error);
            showToast("error",'Failed to approve owner');
          }
      }




    //   const handleDisapprove = async (ownerId) => {
    //     try {
    //       await axiosInstance.patch(`admin/theater-owners/${ownerId}/approve/`);
    //       showToast("success",'Owner approved successfully');
          
    //       setOwner({...owner, is_approved:true});
    //     } catch (error) {
    //       console.error('Error approving owner:', error);
    //       showToast("error",'Failed to approve owner');
    //     }
    //   };

  if (!owner) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading owner details...</p>
      </div>
    );
  }

  return (
    <div className=" min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <header className="flex justify-between items-center p-6 border-b">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => goBack(false)}
          >
            &larr; Back
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Owner Details</h1>
        </header>

        <div className="p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-700">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-medium">{owner.first_name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">{owner.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <p className="font-medium">{owner.phone}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Registration Date</p>
              <p className="font-medium">
                {new Date(owner.date_joined).toLocaleDateString()}
              </p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-700 mt-6">Additional Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Business Name</p>
              <p className="font-medium">{owner.business_name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Address</p>
              <p className="font-medium">{owner.address? owner.address : "Not Available"}</p>
            </div>
          </div>

          
            {/* <button
              className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
              onClick={() => handleDisapprove(owner.id)}
            >
              Disapprove
            </button> */}
            {owner.is_approved? (
                <div className="flex justify-end mt-6 space-x-4">
            {/* <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
            onClick={() => handleUnBlock(owner.id)}
          >
            Approve
          </button> */}
            <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={() => handleBlock(owner.id)}
            >
            Block
            </button>
            </div>
            ):(
                <div className="flex justify-end mt-6 space-x-4">
                <button
                className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                onClick={() => handleApprove(owner.id)}
              >
                Approve
              </button>
              </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default RequestedOwnerDetails;
