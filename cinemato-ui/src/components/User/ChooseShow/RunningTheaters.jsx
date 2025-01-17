import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { convertTo12HourFormat } from '../../Theater/Screens/Movie/AddMovieModal';
import { FaExclamationTriangle } from 'react-icons/fa';
import useAxiosInstance from '../../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import showToast from '../../../utils/ToastNotifier';
import { useDispatch } from 'react-redux';
import { setDate } from '../../../slices/userSelectedDateSlice';
import { setBooking } from '../../../slices/userBookingSlice';
function RunningTheaters({ scheduledTheaters, dates, selectedDate }) {



    const monthMap = {
        Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05",
        Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10",
        Nov: "11", Dec: "12"
    };

    const isPastTime = (timeString, selectedDate) => {
        const now = new Date();
        const [hour, minute] = timeString.split(':').map(Number);
    
        const selectedDateTime = new Date(
            selectedDate.year,
            new Date(`${selectedDate.month} 1, 2024`).getMonth(),
            selectedDate.day,
            hour,
            minute
        );
    
        return selectedDateTime < now;
    };

    const axiosInstance = useAxiosInstance()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const day = dates[selectedDate]['day']
    // const month = dates[selectedDate]['month']
    // const week = dates[selectedDate]['dayOfWeek']
    // const year = dates[selectedDate]['year']


    const formattedFrontendDate = `${dates[selectedDate]['year']}-${monthMap[dates[selectedDate]['month']]}-${dates[selectedDate]['day']}`;
    let theatersForDate = []
    if (scheduledTheaters[formattedFrontendDate]) {
        theatersForDate = scheduledTheaters[formattedFrontendDate]
        
            ? Object.entries(scheduledTheaters[formattedFrontendDate]).map(([name, details]) => ({
                name,
                address: details.address,
                distance: `${details.distance_km} km away`,
                id:details.theater_id,
                showtimes: {screen:details.screens,time:Object.values(details.screens).flat()},
            }))
            : [];


    }



    const [expandedTheater, setExpandedTheater] = useState(null);

    const toggleExpand = (index) => {
        setExpandedTheater((prevIndex) => (prevIndex === index ? null : index));
    };


    const handleShowTimeClick = async (theater, showTime, screenName, times, timeIndex, allScreens, showTimeOg) => {
        console.log("running theaters user: ", typeof(timeIndex), )

        
        try {
            const response = await axiosInstance.post('booking/seat-layout/', {
                theater_id: theater.id,
                screen_name: screenName,
                screen_time: showTime,
                screen_id: showTimeOg.time[parseInt(timeIndex[1], 10)][2],
                date: formattedFrontendDate
            });


            if (response.status === 200) {
                console.log("Seat layout fetched successfully:", response);
                dispatch(setDate({selectedTime:timeIndex, selectedTimeOg:showTime}))
                dispatch(setBooking({selectedTheater:theater, selectedScreen:screenName}))
                navigate('/user/selected-layout/', {
                    state: {
                        seats: response.data,
                        times: times,
                        formattedFrontendDate:formattedFrontendDate,
                        theaterId:theater.id,
                        screenName: screenName,
                        allScreens: allScreens,
                        index: timeIndex
                    
                    }, 
                    replace:true
                });
            } else {
                console.log("Unexpected response status:", response);
            }
        } catch (error) {
            if (error.response) {
                console.error("Error fetching seat layout:", error.response.data);
    
                switch (error.response.status) {
                    case 404:
                        const errorMessage = error.response.data.error || "Data not found.";
                        showToast("error",`${errorMessage}`);
                        break;
                    case 400:
                        showToast("error","Missing required data or invalid request.");
                        break;
                    default:
                        showToast("error","An unexpected error occurred. Please try again later.");
                        break;
                }
            } else if (error.request) {
                showToast("error","Unable to connect to the server. Please check your connection.");
            } else {
                showToast("error","Something went wrong. Please try again.");
            }
        }
    };




    return (
        <div className="p-10 bg-gray-50">
            <div className="flex flex-col space-y-4">
                {theatersForDate.length !== 0 ? (theatersForDate.map((theater, index) => (
                    <div
                        key={index}
                        className={`flex flex-col justify-between bg-white p-6 border border-gray-300 rounded-lg shadow transition-all duration-300 ${expandedTheater === index ? 'h-auto' : 'h-24'}`}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-0.5">
                                <span className="font-semibold text-lg text-black">{theater.name}</span>
                                <span className="text-sm text-gray-500">{theater.address}</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-gray-500">{theater.distance}</span>
                                <button
                                    className="text-primary"
                                    onClick={() => toggleExpand(index)}
                                >
                                    {expandedTheater === index ? (
                                        <FaMinus size={20} />
                                    ) : (
                                        <FaPlus size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedTheater === index ? 'max-h-96' : 'max-h-0'}`}
                        >
                            {expandedTheater === index && (
          <div className="mt-4 border-t border-gray-300 pt-4">
            <div className="ml-1 grid grid-cols-2 gap-3 mt-4 mb-2 md:grid-cols-3 lg:grid-cols-8">
            {Object.entries(theater.showtimes.screen).map(([screen, times], screnIndex) => (
    [...times]
        .sort((a, b) => {
            const [aHours, aMinutes] = a[0].split(':').map(Number);
            const [bHours, bMinutes] = b[0].split(':').map(Number);
            return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
        })
        .map((time, timeIndex) => (
            <div
                key={`${screen}-${timeIndex}`}
                className={`flex flex-col p-4 w-full border border-[#177D23] rounded-md shadow-sm bg-[#F5FAF6] text-center transform transition-all ${
                    isPastTime(time[0], dates[selectedDate]) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
                }`}
                onClick={() =>
                    !isPastTime(time[0], dates[selectedDate]) &&
                    handleShowTimeClick(
                        theater,
                        time[0],
                        screen,
                        theater.showtimes['time'],
                        `${timeIndex}${screnIndex}`,
                        theater.showtimes.screen,
                        theater.showtimes,
                    )
                }
            >
                <span className="text-sm font-semibold text-[#177D23]">{convertTo12HourFormat(time[0])}</span>
                <span className="text-xs font-semibold text-primary">{time[1]}</span>
            </div>
        ))
))}
            </div>
          </div>
                            )}
                        </div>
                    </div>
                ))) : (
                    <div className="flex flex-col items-center justify-center text-center space-y-4 bg-gradient-to-r from-gray-50 to-gray-100 p-8 border border-gray-300 rounded-lg shadow-lg">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                            <FaExclamationTriangle size={32} className="text-red-500" />
                        </div>
                        <h1 className="text-xl font-semibold text-gray-800">No Theaters Available</h1>
                        <p className="text-gray-600 max-w-md">
                            Unfortunately, there are no theaters showing on this date. Please select another date or check back later for availability.
                        </p>
                    </div>


                )}
            </div>
        </div>

    );
}

export default RunningTheaters;
