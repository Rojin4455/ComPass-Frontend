import React, { useState } from "react";
import ReactDOM from "react-dom";
import './cancelModal.css'
import usePostRequest from "../../../../../utils/usePostRequest";
import showToast from "../../../../../utils/ToastNotifier";
import useAxiosInstance from "../../../../../axiosConfig";
const CancelConfirmationModal = ({setCancelIsOpen, cancelIsOpen, ticket}) => {

    const { data, loading, error, postData } = usePostRequest();
    const axiosInstance = useAxiosInstance()


//   const handleCancelClick = () => {
//     setIsModalOpen(true);
//   };

  const handleCloseModal = () => {
    setCancelIsOpen(false);
  };

  const handleConfirm = async () => {
        try{
            const response =  await axiosInstance.post('booking/cancel-ticket/', {
                ticket:ticket
            })
            if (response.status === 200){
                
                showToast('success', response.data?.message? response.data.message: 'movie cancelled successfully')
            }else{
                console.log("error response: ",response)
            }
        }catch(error){
            console.log("reponse: ",error)
            const message = error.response.data.message
            showToast('error', message)
        }finally{
            setCancelIsOpen(false)
        }

  };

  return (
    <div className="relative">
  {cancelIsOpen &&
    ReactDOM.createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
        {/* Modal Container with Spring Animation */}
        <div
          className="bg-white rounded-xl shadow-2xl p-8 w-96 relative animate-spring"
        >
          {/* Close Icon (Optional) */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          >
            ✖
          </button>

          {/* Modal Header */}
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Confirm Cancellation
          </h2>

          {/* Modal Message */}
          <p className="text-gray-700 mb-6">
            Are you sure you want to cancel this ticket? This action is
            irreversible, and your ticket will be forfeited.
          </p>

          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={handleCloseModal}
              className="flex-1 py-2 px-4 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Keep Ticket
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-2 px-4 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition"
            >
              Confirm Cancel
            </button>
          </div>
        </div>
      </div>,
      document.body
    )}
</div>


  );
};

export default CancelConfirmationModal;
