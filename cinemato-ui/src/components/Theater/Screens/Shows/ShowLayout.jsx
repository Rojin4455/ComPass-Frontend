// import React, { useEffect } from 'react'
// import useAxiosInstance from '../../../../axiosConfig'
// import { useSelector } from 'react-redux'

// function ShowLayout({screenId}) {
//     const axiosInstance = useAxiosInstance()
//     const {time,date} = useSelector((state) => state.screendetails.showScreenBacic)
//     console.log("time and date: ",time,date)

//     const formatDateForAPI = (date) => {
//         return `${date.year}-${String(date.date).padStart(2, '0')}-${date.month === "Oct" ? "10" : "11"}`; // Map months or use more dynamic logic
//     };
    
//     useEffect(() => {
//         const fetchLayout = async () => {
//             const formattedDate = formatDateForAPI(date);

//             try{
//                 const response = await axiosInstance.get(`screen/show-screen-details/${screenId}/${formattedDate}/${time}/`)
//                 console.log("response got in show screen: ",response)
//             }catch(error){
//                 console.error("something went wrong",error)
//             }
//         }
//         fetchLayout()
//     },[])

//   return (
//     <div>LayoutStatusDetails</div>
//   )
// }

// export default ShowLayout

import React, { useEffect,useState } from 'react'
import useAxiosInstance from '../../../../axiosConfig'
import { MdChair, MdOutlineEdit } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setContent } from '../../../../slices/OwnerScreenSlice';
import AddSeatLayout from '../AddSeatLayout';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { setShow } from '../../../../slices/OwnerShowSlice';
import showToast from '../../../../utils/ToastNotifier';
import { setDate } from '../../../../slices/userSelectedDateSlice';
import { convertTo12HourFormat } from '../Movie/AddMovieModal';
import { TbTicketOff } from 'react-icons/tb';
import SelectSeatNumberModal from '../../../User/ChooseShow/SelectSeatNumberModal';
import StatusButton from '../../../Common/StatusButton';


function ShowLayout({screenId}) {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [status, setStatus] = useState("idle");
  
  const {allSeats,showTime, times, formattedFrontendDate, allScreens,movie, selectedTheater, selectedSeats, selectedDate} = useSelector((state) => state.ownershow)
  const screenDetails = useSelector((state) => state.screendetails)
  const screen_name = Object.keys(allScreens)[0]
  const theaterId = screenDetails.theater
  const selectedTimeIndex = useSelector((state) => state.date.selectedTime)
  const [totalSeatCount, setTotalSeatCount] = useState(1)
  const [showCountModal, setShowCountModal] = useState(false)
  // const dates = useSelector((state) => state.date.allDates)
  

  const axiosInstance = useAxiosInstance()

  const [seatData,setSeatData] = useState(allSeats)
  const {selectedTimeOg} = useSelector((state) => state.date)


  useEffect(()=> {
    dispatch(setShow({selectedSeats:[]}))
  },[seatData])


  let rowIdentifier = 64

  const renderSeatLayout = (seatsArray) => {

    const seatMatrix = Array(seatsArray[0].tier_row)
      .fill(null)
      .map(() => Array(seatsArray[0].tier_column).fill(null));



    seatsArray.forEach((seat) => {
      const row = parseInt(seat.seat_row);
      const column = seat.seat_column;
      seatMatrix[row - 1][column - 1] = seat; 
    });




    const rows = seatMatrix.reduce((acc, row, index) => {
      acc[index] = row;
      return acc;
    }, {});



    const handleSeatClick = (rowIndex, columnIndex) => {
      const seat = rows[rowIndex][columnIndex];
  
      if (!seat || seat.status !== 'available') return;
  
      const currentTier = seat.tier;
      const linearSeats = [];
      let selectedCount = 0;
  
      for (let i = columnIndex; i < rows[rowIndex].length && selectedCount < totalSeatCount; i++) {
          const rightSeat = rows[rowIndex][i];
          if (rightSeat && rightSeat.status === 'available' && rightSeat.tier === currentTier) {
              linearSeats.push({ rowIndex, columnIndex: i, identifier: rightSeat.identifier, seat:rightSeat });
              selectedCount++;
          } else {
              break;
          }
      }
  
      for (let i = columnIndex - 1; i >= 0 && selectedCount < totalSeatCount; i--) {
          const leftSeat = rows[rowIndex][i];
          if (leftSeat && leftSeat.status === 'available' && leftSeat.tier === currentTier) {
              linearSeats.unshift({ rowIndex, columnIndex: i, identifier: leftSeat.identifier, seat:leftSeat });
              selectedCount++;
          } else {
              break;
          }
      }
  
      dispatch(setShow({selectedSeats:linearSeats}))
  };

  
  const isPastTime = (timeString, selectedDate) => {

    const now = new Date();
    
    const [hour, minute] = timeString.split(':').map(Number);
    const selectedDateTime = new Date(
        selectedDate.year,
        new Date(`${selectedDate.month} 1, 2024`).getMonth(),
        selectedDate.date,
        hour,
        minute
    );

    return selectedDateTime < now;
};




    return Object.keys(rows).map((rowIndex, index) => (
      <div key={rowIndex+index} className="flex justify-center relative items-center h-[32px]">
        <div className="absolute -left-5 flex items-center justify-center">
          <span className="font-semibold text-gray-500 text-xs">
            {String.fromCharCode(++rowIdentifier)}
          </span>
        </div>

        {rows[rowIndex].map((seat, columnIndex) => (
            seat ? (
              
              <div
                key={columnIndex}
                onClick={() => {
                  if (!isPastTime(selectedTimeOg, selectedDate)) {
                    handleSeatClick(rowIndex, columnIndex);
                  }
                }}
                
                className={`w-6 h-6 mx-0.5 flex items-center text-xs justify-center rounded-md cursor-pointer 
                  ${selectedSeats.some(
                    
                    selected => seat.identifier === selected.identifier
                  )
                    ? 'bg-yellow-400 text-gray-600'
                    : seat.status === 'available'
                    ? 'bg-white hover:bg-secondary text-gray-600 border border-gray-600'
                    :seat.status === 'reserved' || seat.status === 'booked' ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    
                    : 'bg-green-300 text-gray-600 cursor-not-allowed'
                  }
                `}
              >
                {seat.identifier.replace(/[A-Z]/g, '')}
              </div>
            ) : (
              <div key={columnIndex} className="w-6 h-6 mx-0.5"></div>
            )
        ))}
      </div>
    ));
  };




//   const handleShowTimeClick = async (showTime, index, screen) => {

//     try {
//         const response = await axiosInstance.post('booking/seat-layout/', {
//             theater_id: theaterId,
//             screen_name: screen,
//             screen_time: showTime,
//             date: formattedFrontendDate
//         });

//         if (response.status === 200) {
//             setSeatData(response.data)
//             dispatch(setDate({selectedTime:index, selectedTimeOg:showTime}))
//             dispatch(setShow({allSeats:response.data,selectedScreen:screen}))
//         } else {
//             console.log("Unexpected response status:", response);
//         }
//     } catch (error) {
//         if (error.response) {
//             console.error("Error fetching seat layout:", error.response.data);

//             switch (error.response.status) {
//                 case 404:
//                     const errorMessage = error.response.data.error || "Data not found.";
//                     showToast("error",`${errorMessage}`);
//                     break;
//                 case 400:
//                     showToast("error","Missing required data or invalid request.");
//                     break;
//                 default:
//                     showToast("error","An unexpected error occurred. Please try again later.");
//                     break;
//             }
//         } else if (error.request) {
//             showToast("error","Unable to connect to the server. Please check your connection.");
//         } else {
//             showToast("error","Something went wrong. Please try again.");
//         }
//     }
// };


const handleCheckout = async () => {
  setStatus("loading");

  try {
    const response = await axiosInstance.post("booking/owner-book-seats/", {
      selected_seats: selectedSeats,
      selected_theater: selectedTheater,
      selected_date: selectedDate,
      selected_time: selectedTimeOg,
      tier: [...new Set(selectedSeats.map((seats) => seats.seat.tier_name))],
      screen_name: screen_name,
      seat_layout: true,
    });

    if (response.status === 200) {
      setSeatData(response.data);
      showToast('success', "seats are confirmed successfully")
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000); // Reset to idle after success
      dispatch(setShow({ selectedSeats: [] }));
    } else {
      console.error("error response");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000); // Reset to idle after error
    }
  } catch (er) {
    console.log("er: ", er);
    if (er.response && er.response.status === 409) {
      showToast("error", er.response.data.detail);
    }
    setStatus("error");
    setTimeout(() => setStatus("idle"), 3000); // Reset to idle after catch block
    console.error("something went wrong: ", er);
  }
};

return (
  <>
  <div className="flex items-center mb-4 gap-0.5 cursor-pointer" onClick={() => dispatch(setContent({ subContent: " " }))}>
  <IoChevronBackOutline size={15} className="text-gray-700 cursor-pointer hover:text-primary transition" />
  <h1 className="text-sm font-bold text-gray-800">Back</h1>
</div>
  <div className="container mx-auto sm:p-2 flex">
    
    {showCountModal &&(
    <SelectSeatNumberModal seatData={seatData} page={'showLayout'} totalSeatCount={totalSeatCount} setTotalSeatCount={setTotalSeatCount} setShowCountModal={setShowCountModal}/>
  )}

  
    <div className="w-3/4 bg-white flex flex-col p-1">
      <div className="flex items-center justify-between w-full mb-6">
    {/* <div
      className="flex gap-4 overflow-x-auto w-full py-2 scrollbar-hide"
    >
      {Object.entries(allScreens).map(([screen, times],screenIndex) => (
      times.map((timeSlot, index) => (
        <div
          key={index+screenIndex}
          onClick={() => handleShowTimeClick(timeSlot[0],`${index}${screenIndex}`, screen)}
          className={`flex flex-col items-center p-2 rounded-md min-w-[80px] text-xs cursor-pointer ${
            `${selectedTimeIndex}` === `${index}${screenIndex}` ? "bg-secondary text-gray-700" : "bg-white text-gray-600"
          }`}
        >
          <span className="font-bold text-sm">{convertTo12HourFormat(timeSlot[0])}</span>
          <span className="text-xs mt-1">{timeSlot[1]}</span>
        </div>
      ))
    ))}
    </div> */}
    <button className="flex items-center gap-1 mr-3 justify-center bg-white border border-gray-500 hover:bg-primaryhover text-gray-500 font-semibold py-2 px-4 rounded-lg hover:text-gray-300 shadow-md transition duration-300 ease-in-out text-sm w-[13%] text-xs"
    onClick={() => setShowCountModal(true)}
    >
    <MdOutlineEdit/>
    <span>{totalSeatCount} Tickets</span>
  </button>
  
  
  
  
  
  </div>
  
  
      <div className="w-full lg:w-full bg-white overflow-auto h-full">
        <div className="flex flex-col items-center">
          {Object.keys(seatData).map((tierIndex, index) => (
            <div key={tierIndex+index} className="mb-2">
              <h4 className="text-xs sm:text-xs font-semibold text-gray-700 mb-1 sm:mb-1 text-center">
                {seatData[tierIndex][0].tier_name.toUpperCase()} {` ₹${seatData[tierIndex][0].tier_price}`}
              </h4>
              <div className="sm:p-2 rounded-lg bg-gray">
                {renderSeatLayout(seatData[tierIndex])}
              </div>
            </div>
          ))}
  <div className="flex items-center gap-4 mt-6 mb-6 text-xs">
    <div className="flex items-center gap-1">
      <div className="w-4 h-4 border border-gray-300 rounded"></div>
      <span className="text-gray-500">Available</span>
    </div>
    
    <div className="flex items-center gap-1">
      <div className="w-4 h-4 bg-yellow-400 rounded"></div>
      <span className="text-gray-500">Selected</span>
    </div>
    
    <div className="flex items-center gap-1">
      <div className="w-4 h-4 bg-gray-200 rounded"></div>
      <span className="text-gray-500">Occupied</span>
    </div>
  </div>
  
        </div>
  
  
        <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md h-4 bg-gray-900 text-white text-center rounded-b-full shadow-lg mx-auto mt-4 sm:mt-8">
          <div className="absolute -inset-3 bg-gradient-to-t from-transparent to-yellow-100 rounded-b-full opacity-70 blur-sm"></div>
        </div>
        <div className="text-center mt-2">
          <span className="text-[10px] sm:text-xs font-semibold text-gray-800">All eyes on the screen</span>
        </div>
      </div>
    </div>
  
  
    <div className="w-1/4 bg-gray-50 p-4 sm:p-5 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-lg font-semibold">Booking Summary</h4>
      <span className="text-xl text-gray-600">
        <TbTicketOff />
      </span>
    </div>
  
    <div className="border-t border-gray-300 mb-4"></div>
  
    <div className="flex items-start mb-4">
      <div className="w-16 h-25 mt-1 overflow-hidden rounded-lg mr-4">
        <img src={movie.poster_path} alt="Movie Poster" className="w-full h-full object-cover" />
      </div>
      <div>
        <h5 className="text-base font-semibold text-gray-800">{movie.title}</h5>
        <p className="text-xs text-gray-500 mb-1">Genre: {movie.genres && movie.genres? movie.genres.map((genre) => genre.name).join(', ') : ""}</p>
        <p className="text-xs text-gray-500 mb-1">Time: {selectedTimeOg}</p>
        <p className="text-xs text-gray-500 mb-1">
          Date: {selectedDate && `${Object.values(selectedDate)}`}
        </p>
        
        <p className="text-xs text-gray-500">Theater: {selectedTheater?.name? selectedTheater.name:""}</p>
      </div>
    </div>
  
    <div className="border-t border-gray-300 mb-4"></div>
  
    {selectedSeats.length > 0 ? (
      <>
        <div>
          <h5 className="text-sm font-semibold text-gray-700 mb-2">Movie Info</h5>
          <p className="text-xs text-gray-500 mb-1">Tier: {[...new Set(selectedSeats.map((seats) => seats.seat.tier_name))]}</p>
  
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSeats.map((seat, index) => (
              <span key={index} className="px-2 py-1 bg-third rounded text-xs font-semibold text-gray-700">
                {seat.identifier}
              </span>
            ))}
          </div>
        </div>
  
        <div className="border-t border-gray-300 mb-4"></div>
  
        <div>
          <h5 className="text-sm font-semibold text-gray-700 mb-2">Tickets</h5>
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <p>{selectedSeats.length} x {selectedSeats[0].seat.tier_price}</p>
            <p className="font-semibold text-gray-800">
              Total: {`₹${selectedSeats.length * parseInt(selectedSeats[0].seat.tier_price)}`}
            </p>
          </div>
        </div>
        <div className='mt-[70%]'>
        <div className="border-t border-gray-300"></div>
  
        <div className="flex justify-between items-center mb-4">
        <p className="text-base font-semibold text-gray-700">Grand Total</p>
        <p className="text-base font-semibold text-gray-800">
        ₹{(selectedSeats.length * selectedSeats[0].seat.tier_price).toFixed(2)}
        </p>
      </div>
  
      <StatusButton status={status} handleClick={handleCheckout} />

      </div>
  
        <div className="border-t border-gray-300"></div>
      </>
    ) : (
      <div className="flex flex-col items-center mt-8">
        <img src="/assets/cinema-seat.svg" alt="No Seats Selected" className="w-12 h-12 mb-3"/>
        <p className="text-sm text-gray-500">No seats are selected</p>
      </div>
    )}
  </div>
  
  </div>
  </>
  
    );


}

export default ShowLayout;