import React, { useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import useAxiosInstance from "../../../axiosConfig";
import showToast from "../../../utils/ToastNotifier";

function DeleteScheduleModal({ onClose, onConfirm, showtime, setResponseStatus }) {
    console.log("show times in delete: ", showtime)
    const axiosInstance = useAxiosInstance()

    const handleDeletechedule = async (showtime) => {
        try {
            const response = await axiosInstance.post('screen/delete-schedule/', {
                scheduleId: showtime.schedules.id
            });
    
            if (response.status === 200) {
                showToast('success',"Schedule deleted successfully.");
                setResponseStatus("success")
            } else {
                showToast("error",response.data.error || "An error occurred while deleting the schedule.");
            }
        } catch (err) {
            console.error("Error deleting schedule: ", err);
            showToast("error",err.response?.data?.error || "Unable to delete schedule. Please try again later.");
        }finally{
            onConfirm(showtime)
        }
    }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full overflow-hidden animate-spring">
        {/* Modal Header */}
        <div className="flex justify-between items-center bg-red-600 text-white px-4 py-2">
          <h2 className="text-lg font-semibold">Delete Schedule</h2>
          <button
            onClick={onClose}
            className="text-white bg-transparent hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 space-y-4">
          <p className="text-gray-700">Are you sure you want to delete the schedule for "{showtime.movie?.title}" at {showtime.time}?</p>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between px-4 py-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeletechedule(showtime)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteScheduleModal
