import React, { useState, useEffect } from 'react';
import useAxiosInstance from '../../../../axiosConfig';
import { useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { TbArrowsExchange } from "react-icons/tb";
import { IoIosAddCircle, IoMdCheckmarkCircle } from "react-icons/io";
import Loading from '../../../Admin/AdminAddMovies/Loading';
import showToast from '../../../../utils/ToastNotifier';
import axios from 'axios';
import { format } from 'date-fns';

const convertTo12HourFormat = (timeString) => {
    // Assuming timeString is in "HH:mm:ss" or "HH:mm" format
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12; // Convert 0 to 12 for AM times
    return `${adjustedHour}:${minutes} ${ampm}`;
};


const AddMovieModal = ({ isOpen, onClose, movie }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showTimes, setShowTimes] = useState([]);
    const axiosInstance = useAxiosInstance();
    const screen_id = useSelector((state) => state.screendetails.screen.id);
    const [movies, setMovies] = useState([]); // For movie titles related to showtimes
    const [selectedTimes, setSelectedTimes] = useState([])
    const [loading, setLoading] = useState(true)
    const {release_date,id} = movie
    const  screenId= useSelector((state) => state.screendetails.screen.id)


    // const handleAddShowTime = () => {
    //     // setShowTimes([...showTimes, '']); // Add an empty time field for new entry
    // };

    // const showTimes = [
    //     {
    //         time: '14:00', // 2 PM in 24-hour format
    //         movie: {
    //             title: 'Inception',
    //             image: 'https://image.tmdb.org/t/p/original/pps3IdtSlYx3wYgANTyFXYL75nH.jpg', // Replace with a valid image URL
    //         },
    //     },
    //     {
    //         time: '16:30', // 4:30 PM in 24-hour format
    //         movie: null
    //     },
    //     {
    //         time: '19:00', // 7 PM in 24-hour format
    //         movie: {
    //             title: 'Interstellar',
    //             image: 'https://image.tmdb.org/t/p/original/pps3IdtSlYx3wYgANTyFXYL75nH.jpg', // Replace with a valid image URL
    //         },
    //     },
    //     {
    //         time: '21:30', // 9:30 PM in 24-hour format
    //         movie: null, // No movie assigned for this showtime
    //     },
    // ];

    useEffect(() => {
        setLoading(true)
        const fetchAllTime = async () => {
            try {
                const response = await axiosInstance.get(`screen/screen-time/${screen_id}`);
                if (response.status === 200) {
                    // Convert showtimes to the correct 'HH:MM' format for time input
                    const showTimeEntries = Object.values(response.data.data)
                    const times = showTimeEntries.map((showtimeEntry) => {
                        const timeString = showtimeEntry.time.start_time.slice(0, 5); // Get HH:MM only
                        const [hours, minutes] = timeString.split(':').map(Number);
                        const date = new Date();
                        date.setHours(hours);
                        date.setMinutes(minutes);
                        
                        // Format the time to 12-hour format with AM/PM
                        // const formattedTime = date.toLocaleTimeString([], {
                        //     hour: '2-digit',
                        //     minute: '2-digit',
                        //     hour12: true,
                        // }).replace('am', 'AM').replace('pm', 'PM'); // Convert am/pm to AM/PM
                
                        return {
                            time: timeString,
                            movie: showtimeEntry.movie !== "None" ? showtimeEntry.movie : null // Include movie object
                        };
                    });

                    setShowTimes(times);
                } else {
                    console.error("error response", response);
                }
            } catch (error) {
                console.error("something went wrong", error);
            }
            setLoading(false)
        };

        fetchAllTime();
    }, []);


    if (loading){
        return <Loading loading={loading}/>
    }



    // const handleShowTimeChange = (index, value) => {
    //     const updatedShowTimes = [...showTimes];
    //     updatedShowTimes[index].time = value;
    //     setShowTimes(updatedShowTimes);
    // };



    // const handleAddMovie = async (index) => {
    //     const selectedTime = showTimes.filter((showTime, i) => i === index)
    //     console.log("selecterd time ", selectedTime[0].time)
    //     setSelectedTimes(selectedTime[0].time)
    //     console.log("selected all times: ", selectedTimes)

    // }
    // const handleChangeMovie = async (index) => {

    // }





    



    const handleToggleTime = (index) => {
        setSelectedTimes((prevSelectedTimes) => {
            if (prevSelectedTimes.includes(index)) {
                // Remove if already selected
                return prevSelectedTimes.filter((timeIndex) => timeIndex !== index);
            } else {
                // Add if not already selected
                return [...prevSelectedTimes, index];
            }
        });
    };
    const selectedShowTimes = selectedTimes.map(index => showTimes[index].time);

    const handleSubmit = async () => {
        if (!startDate){
            showToast('error',"Invalid Start Date")
            return
        }else if(!endDate){
            showToast('error', 'Invalid End Date')
            return
        }else if(new Date(startDate) > new Date(endDate)){
            showToast('error', 'Invalid date')
            return
        }else if(selectedTimes.length === 0){
            showToast('error', 'Please Select A show time')
            return
        }

        try{
            const response = await axiosInstance.post('screen/add-movie-schedule/',{
                start_date:format(startDate,"yyyy-MM-dd"),
                end_date:format(endDate, "yyyy-MM-dd"),
                selected_times:selectedShowTimes,
                movie_id:id,
                screen_id:screenId
            })

            if(response.status === 201){
                showToast('success', "movie scheduled successfully")
                console.log("response: ",response)
                onClose()
            }else{
                console.error("error response : ",response)
            }
        }catch(error){
            showToast("error", "Something Went Wrong")
        }
    }
    console.log("release date: ",release_date, new Date)

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-2xl relative transition-all transform scale-95">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Add Movie Details</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-center">
                                {/* Start Date */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-600 mb-1">Start Date</label>
                                    <ReactDatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        // onChange={() => handleStartDate(date)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
                                        dateFormat="yyyy/MM/dd"
                                        placeholderText="Select Start Date"
                                        minDate={new Date(release_date) > new Date() ? release_date : new Date()} // Use release_date if it’s in the future; otherwise, use today
                                        />
                                </div>

                                {/* Icon Container for Centering */}
                                <div className="mx-4 flex justify-center items-center" style={{ width: '40px' }}>
                                    <TbArrowsExchange className="text-2xl text-secondary" />
                                </div>

                                {/* End Date */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-600 mb-1">End Date</label>
                                    <ReactDatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
                                        dateFormat="yyyy/MM/dd"
                                        placeholderText="Select End Date"
                                        minDate={startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : null}
                                        disabled={!startDate}
                                        
                                    />
                                </div>
                            </div>





                            {/* Show Times */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Show Times</label>
                                <div className="flex flex-wrap items-center justify-start">


                                    {showTimes?.map((showTime, index) => (
                                        <div key={index} className="flex items-center mb-4 w-1/3 p-2">
                                            <div className="w-full p-4 border border-[#177D23] rounded-lg shadow-sm bg-[#F5FAF6] flex flex-col items-center">
                                                <div className="text-lg font-semibold text-[#177D23]">
                                                    {convertTo12HourFormat(showTime.time)}
                                                </div>

                                                {showTime.movie ? (
                                                    // Show movie details if assigned
                                                    <div className="mt-2 p-2 bg-[#72A276] rounded-lg shadow-md flex items-center w-full">
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500${showTime.movie.poster_path}`}
                                                            alt={showTime.movie.title}
                                                            className="w-10 h-10 rounded-md mr-2"
                                                        />
                                                        <div className="flex-1 text-white font-bold truncate w-full overflow-hidden">{showTime.movie.title}</div>
                                                    </div>
                                                ) : (
                                                    // Show "+ Add Movie" button when no movie is added
                                                    <div className='flex items-center flex-raw'>

                                                        <button
                                                            onClick={() => handleToggleTime(index)}
                                                            className="mt-2 bg-[#177D23] text-white py-1 px-2 rounded-md hover:bg-green-900 transition text-xs flex items-center gap-1"
                                                        >
                                                            {selectedTimes.includes(index) ? (
                                                                <IoMdCheckmarkCircle className='text-[#F5FAF6]' />
                                                            ) : (
                                                                <IoIosAddCircle className='text-[#F5FAF6]' />
                                                            )}
                                                            {selectedTimes.includes(index) ? 'Added' : 'Add Movie'}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* <button
                                    type="button"
                                    onClick={handleAddShowTime}
                                    className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    + Add Show Time
                                </button> */}
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-yellow-300 text-gray-600 px-4 py-2 rounded-md hover:bg-secondary transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryhover transition-colors"
                                    onClick={handleSubmit}
                                    
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export {convertTo12HourFormat};

export default AddMovieModal;
