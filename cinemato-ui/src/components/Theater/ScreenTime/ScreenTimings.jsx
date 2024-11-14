import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setContent } from '../../../slices/OwnerScreenSlice';
import { FaClock } from 'react-icons/fa';
import useAxiosInstance from '../../../axiosConfig';

function ScreenTimings({ screenId }) {
    const dispatch = useDispatch();
    const axiosInstance = useAxiosInstance();
    const [addedTimes, setAddedTimes] = useState([]);

    useEffect(() => {
        const fetchAllTime = async () => {
            try {
                const response = await axiosInstance.get(`screen/screen-time/${screenId}`);
                if (response.status === 200) {
                    const showtimeEntries = Object.values(response.data.data);
                    
                    const times = showtimeEntries.map((showtimeEntry) => {
                        const timeString = showtimeEntry.time.start_time.slice(0, 5); // Get HH:MM only
                        const [hours, minutes] = timeString.split(':').map(Number);
                        const date = new Date();
                        date.setHours(hours);
                        date.setMinutes(minutes);
                        
                        // Format the time to 12-hour format with AM/PM
                        const formattedTime = date.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        }).replace('am', 'AM').replace('pm', 'PM'); // Convert am/pm to AM/PM
                
                        return {
                            time: formattedTime,
                            movie: showtimeEntry.movie !== "None" ? showtimeEntry.movie : null // Include movie object
                        };
                    });

                    setAddedTimes(times);
                    console.log("times: ",times)
                } else {
                    console.error("Error response", response);
                }
            } catch (error) {
                console.error("Something went wrong", error);
            }
        };
        fetchAllTime();
    }, [screenId]);

    return (
        <div className="screen-timings-section">
            {addedTimes.length > 0 && (
                <div className="times-list mb-6">
                    <h3 className="text-xl font-bold mb-6 text-center text-gray-700">Scheduled Screen Times</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {addedTimes.map((showtime, index) => (
                            <div
                                key={index}
                                className="p-3 border border-[#177D23] rounded-lg shadow-sm bg-[#F5FAF6] text-[#177D23] text-center transform transition-all hover:scale-105"
                            >
                                <span className="text-lg font-bold">{showtime.time}</span>
                                {showtime.movie ? (
                                    <div className="mt-2">
                                        <p className="font-medium">{showtime.movie.title}</p>
                                        {/* <img 
                                            src={`https://image.tmdb.org/t/p/w500${showtime.movie.backdrop_path}`} // Adjust property based on actual API response
                                            alt={showtime.movie.title}
                                            className="w-16 h-16 mt-2 mx-auto rounded"
                                        /> */}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 mt-2">No movie scheduled</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="flex flex-col items-center justify-center py-20">
                <FaClock size={50} className="text-green-500 mb-4" />
                <p className="text-gray-500 text-sm">Set the timings for this screen.</p>
                <button
                    onClick={() => dispatch(setContent({ subContent: "add-time" }))}
                    className="bg-primary text-white py-2 px-6 mt-6 rounded hover:bg-primaryhover transition"
                >
                    Set Screen Timings
                </button>
            </div>
        </div>
    );
}

export default ScreenTimings;
