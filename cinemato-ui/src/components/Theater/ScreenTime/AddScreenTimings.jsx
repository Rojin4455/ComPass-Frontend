import React, { useState, useEffect } from 'react';
import { FaClock, FaTrash } from 'react-icons/fa';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css'; // Assuming you're using this package for clock styles
import { IoChevronBackOutline } from "react-icons/io5";
import { setContent } from '../../../slices/OwnerScreenSlice';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosInstance from '../../../axiosConfig';
import showToast from '../../../utils/ToastNotifier';

const ScreenTimingsSetup = ({ screenId }) => {
  const [selectedHour, setSelectedHour] = useState(new Date().getHours() % 12 || 12); // default to current hour
  const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes()); // default to current minute
  const [amPm, setAmPm] = useState(new Date().getHours() >= 12 ? 'PM' : 'AM'); // default to AM/PM based on current time
  const [selectedTime, setSelectedTime] = useState(''); // current time in "HH:MM:SS" format by default
  const [addedTimes, setAddedTimes] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();
  const axiosInstance = useAxiosInstance();

  // Format selected time to "HH:MM:SS" without date information
  const getSelectedTime = () => {
    const hours = amPm === 'PM' && selectedHour !== 12 ? selectedHour + 12 : selectedHour;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}:00`;
    return formattedTime;
  };

  // Fetch previously added times on mount
  useEffect(() => {
    const fetchAllTime = async () => {
      try {
        const response = await axiosInstance.get(`screen/screen-time/${screenId}`);
        if (response.status === 200) {
          const showtimeEntries = Object.values(response.data.data);
          const times = showtimeEntries.map((showtimeEntry) => (
            showtimeEntry.time.start_time.slice(0, 5) // Get HH:MM only
          ));
          setAddedTimes(times);
        } else {
          console.error("Error response", response);
        }
      } catch (error) {
        console.error("Something went wrong", error);
        let message = error.response.data.message?  error.response.data.message : "Something Went Wrong"
        showToast("error",message)
      }
    };
    fetchAllTime();
  }, []);

  // Check if the new time is at least 3 hours apart from existing times
  const isTimeValid = (newTime) => {
    const [newHours, newMinutes] = newTime.split(':').map(Number);
    const newTimeInMinutes = newHours * 60 + newMinutes;

    return addedTimes.every((time) => {
      const [hours, minutes] = time.split(':').map(Number);
      const timeInMinutes = hours * 60 + minutes;
      const diffInHours = Math.abs(newTimeInMinutes - timeInMinutes) / 60;
      return diffInHours >= 3;
    });
  };

  const handleAddTime = async () => {
    const newTime = getSelectedTime();
    if (isTimeValid(newTime)) {
      try {
        const response = await axiosInstance.post('screen/screen-time/add/', {
          time: newTime,
          screen_id: screenId,
        });

        if (response.status === 200) {
          setAddedTimes([...addedTimes, newTime]);
        } else {
          console.log("Error response:", response);
        }
      } catch (error) {
        console.error("Something went wrong", error);
        let message = error.response.data.message?  error.response.data.message : "Something Went Wrong"
        showToast("error",message)
      }

      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const toggleAmPm = () => {
    setAmPm(amPm === 'AM' ? 'PM' : 'AM');
  };

  const handleRemoveTime = async (index) => {
    const timeToRemove = addedTimes[index];
    try {
      const response = await axiosInstance.delete('screen/screen-time/remove/', {
        data: {
          time: timeToRemove,
          screen_id: screenId,
        }
      });
      if (response.status === 200) {
        setAddedTimes(addedTimes.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error("Something went wrong", error);
      let message = error.response.data.message?  error.response.data.message : "Something Went Wrong"
      showToast("error",message)
    }
  };

  return (
    <div className="screen-timings-section p-6">
      <div className="flex items-center mb-4 gap-0.5 cursor-pointer" onClick={() => dispatch(setContent({ subContent: " " }))}>
        <IoChevronBackOutline size={15} className="text-gray-700 cursor-pointer hover:text-primary transition" />
        <h1 className="text-sm font-bold text-gray-800">Back</h1>
      </div>
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-2xl text-gray-700 mb-6">Set Screen Timings</h2>

        <Clock value={new Date()} renderMinuteMarks renderSecondHand={false} hourHandWidth={5} minuteHandWidth={3} />

        <div className="flex items-center space-x-4 mb-4 mt-6">
          <select value={selectedHour} onChange={(e) => setSelectedHour(Number(e.target.value))} className="border rounded p-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
              <option key={hour} value={hour}>{hour}</option>
            ))}
          </select>
          <span>:</span>
          <select value={selectedMinute} onChange={(e) => setSelectedMinute(Number(e.target.value))} className="border rounded p-2">
            {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
              <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>
            ))}
          </select>
          <button onClick={toggleAmPm} className="bg-gray-200 px-4 py-2 rounded-md">{amPm}</button>
        </div>

        <div className="mt-4 text-lg">
          Selected Time: {getSelectedTime()}
        </div>

        <button onClick={handleAddTime} className="bg-primary text-white py-2 px-6 mt-6 rounded hover:bg-primaryhover transition">Save Time</button>

        {!isValid && <p className="text-red-500 mt-2">The time should be at least 3 hours apart from existing times.</p>}

        <div className="mt-8 w-full">
          <h3 className="text-lg font-semibold text-gray-800">Added Screen Timings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {addedTimes.length > 0 ? (
  addedTimes.map((timeString, index) => {
    // Split the time string to create a Date object
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    
    return (
      <div key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex items-center justify-between transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center space-x-4">
          <FaClock className="text-green-800 text-2xl" />
          <span className="text-xl font-medium text-gray-700">
            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
          </span>
        </div>
        <button onClick={() => handleRemoveTime(index)} className="text-red-700 hover:text-red-900">
          <FaTrash size={18} />
        </button>
      </div>
    );
  })
) : (
  <p className="text-gray-500 col-span-full text-center">No times added yet. Start by selecting a time above.</p>
)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenTimingsSetup;
