import React,{useState} from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker styles
import { TbArrowsExchange } from "react-icons/tb";
import useAxiosInstance from "../../../axiosConfig";
import showToast from "../../../utils/ToastNotifier";

function ScheduleMovieDetailsModal({onClose,showTime, setShowTime,addedTimes, setAddedTimes}) {
    const axiosInstance = useAxiosInstance()

    const [startDate, setStartDate] = useState(showTime.schedules.start_date)
    const [endDate, setEndDate] = useState(showTime.schedules.end_date)

    const changeEndDate = async (newDate) => {
        try {
            const response = await axiosInstance.post('screen/change-schedule/', {
                new_date: newDate,
                scheduleId: showTime.schedules.id
            });
    
            if (response.status === 200) {
                console.log("Date is updated: ", response.data);
                const updatedShowTime = { ...showTime, schedules: { ...showTime.schedules, end_date: response.data.end_date } };
                setShowTime(updatedShowTime);
    
                // Update `addedTimes` with the new end date
                const updatedAddedTimes = addedTimes.map((time) =>
                    time.schedules.id === showTime.schedules.id
                        ? { ...time, schedules: { ...time.schedules, end_date: response.data.end_date } }
                        : time
                );
                setAddedTimes(updatedAddedTimes);
                setEndDate(newDate);
                showToast("success","The end date has been successfully updated.");
            }
        } catch (err) {
            if (err.status === 400) {
                showToast("error",err.response.data.error);
            } else if (err.status === 403) {
                showToast("error","You do not have the required permissions to make this change.");
            } else {
                showToast("error","An unexpected error occurred. Please try again later.");
            }

        }

    


  }
  console.log("show times: ",showTime)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full overflow-hidden animate-spring">
        {/* Modal Header */}
        <div className="flex justify-between items-center bg-[#177D23] text-white px-4 py-3">
          <h2 className="text-lg font-semibold">Movie Details</h2>
          <button
            onClick={onClose}
            className="text-white bg-transparent hover:bg-[#145C1C] rounded-full w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 space-y-6">
          {/* Movie Poster and Title */}
          <div className="flex gap-4">
            <img
              src={showTime.movie.poster_path}
              alt={showTime.movie.title}
              className="w-24 h-36 object-cover rounded-lg shadow"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold">{showTime.movie.title}</h3>
              <p className="text-gray-500 text-sm">{showTime.movie.languages.map((lan) => lan.name).join(', ')} | {showTime.movie.genres.map((g) => g.name).join(", ")}</p>
            </div>
          </div>

          {/* Start Date and End Date Section */}
          <div className="space-y-6 flex space-x-4">
            <div className="flex items-center justify-center">
              {/* Start Date */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Start Date
                </label>
                <ReactDatePicker
                  selected={startDate}
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  dateFormat="yyyy/MM/dd"
                  disabled
                />
              </div>

              {/* Icon for Separation */}
              <div
                className="mx-4 flex justify-center items-center"
                style={{ width: "40px" }}
              >
                <TbArrowsExchange className="text-2xl text-secondary" />
              </div>

              {/* End Date */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  End Date
                </label>
                <ReactDatePicker
                  selected={endDate}
                  onChange={(endDate) => changeEndDate(endDate)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Select End Date"
                  minDate={
                    startDate
                      ? new Date(startDate)
                      : null
                  }
                  disabled={!startDate}
                />
              </div>
            </div>

          </div>

          {/* Additional Information */}
          <div className="space-y-2">
            <h4 className="font-medium">Description:</h4>
            <p className="text-gray-600 text-sm">
              {showTime.movie.description || "No additional information available."}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end bg-gray-100 px-4 py-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-[#B91C1C] rounded hover:bg-[#991B1B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B91C1C]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleMovieDetailsModal;
