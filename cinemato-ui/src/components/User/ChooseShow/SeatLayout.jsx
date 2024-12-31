import React,{useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdChair } from 'react-icons/md'
import { TbTicketOff } from "react-icons/tb";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch,useSelector } from 'react-redux';
import { useRef } from 'react';
import { convertTo12HourFormat } from '../../Theater/Screens/Movie/AddMovieModal';
import useAxiosInstance from '../../../axiosConfig';
import showToast from '../../../utils/ToastNotifier';
import { setDate } from '../../../slices/userSelectedDateSlice';
import SelectSeatNumberModal from './SelectSeatNumberModal';
import { setBooking } from '../../../slices/userBookingSlice';
import { MdOutlineEdit } from "react-icons/md";



function SeatLayout() {
  const location = useLocation()
  const dispatch = useDispatch()

  const [seatData,setSeatData] = useState(location.state.seats)

  // const selectedTimeIndex = location.state.selectedTimeIndex

  // const [selectedSeats, setSelectedSeats] = useState([]);
  const movie = useSelector((state) => state.booking.selectedMovie)
  const screen_name = useSelector((state) => state.booking.selectedScreen)
  // const maxSelectionCount = 5;

  // const times = location.state.times
  const formattedFrontendDate = location.state.formattedFrontendDate
  const theaterId = location.state.theaterId
  const allScreens = location.state.allScreens
  // const selected = location.state.index
  const axiosInstance = useAxiosInstance()
  const selectedTimeIndex = useSelector((state) => state.date.selectedTime)
  const selectedTimeOg = useSelector((state) => state.date.selectedTimeOg)
  const selectedDate = useSelector((state) => state.date.selectedDate)
  const navigate = useNavigate()
  // const [isOpen,setIsOpen] = useState(true)
  // const [isClose,setIsClose] = useState(true)
  const totalSeatCount = useSelector((state) => state.booking.totalSeatCount)
  const [prevTotalSeatCount, setPrevTotalSeatCount] = useState(1)
  const dates = useSelector((state) => state.date.allDates)
  const selectedTheater = useSelector((state) => state.booking.selectedTheater)
  const selectedSeats = useSelector((state) => state.booking.selectedSeats)

  useEffect(()=> {
    return () => dispatch(setBooking({totalSeatCount:null}))
  },[])


  useEffect(()=> {
    dispatch(setBooking({selectedSeats:[]}))
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
  
      dispatch(setBooking({selectedSeats:linearSeats}))
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
                onClick={() => handleSeatClick(rowIndex, columnIndex)}
                
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



  const handleShowTimeClick = async (showTime, index, screen) => {

    try {
        const response = await axiosInstance.post('booking/seat-layout/', {
            theater_id: theaterId,
            screen_name: screen,
            screen_time: showTime,
            date: formattedFrontendDate
        });

        if (response.status === 200) {
            setSeatData(response.data)
            dispatch(setDate({selectedTime:index, selectedTimeOg:showTime}))
            dispatch(setBooking({selectedScreen:screen}))
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


const handleCheckout = async () => {
      try{
        const response = await axiosInstance.post('booking/add-selected-seats/',{
          selected_seats:selectedSeats,
          selected_theater:selectedTheater,
          selected_date:dates[selectedDate],
          selected_time:selectedTimeOg,
          tier:[...new Set(selectedSeats.map((seats) => seats.seat.tier_name))],
          screen_name:screen_name,
          seat_layout:true,
        })

        if (response.status === 200) {
          navigate('/user/add-snacks',{
            replace:true
          })
        }else{
          console.error("error response")
        }

      }catch(er){ 
        console.log("er: ",er)
        if (er.status === 409){
          showToast('error', er.response.data.detail)
        }
        console.error("something went wrong: ",er)

      }

}




  return (
<div className="container mx-auto sm:p-4 flex flex-col lg:flex-row gap-4">
  {totalSeatCount === null && (
    <SelectSeatNumberModal
      seatData={seatData}
      page={'seatLayout'}
      setTotalSeatCount={null}
      totalSeatCount={prevTotalSeatCount}
    />
  )}

  {/* Main Content */}
  <div className="lg:w-3/4 w-full bg-white flex flex-col p-2 rounded-lg shadow-md">
    {/* Showtimes Header */}
    <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-4 gap-4">
      <div className="flex gap-4 overflow-x-auto w-full py-2 scrollbar-hide">
        {Object.entries(allScreens).map(([screen, times], screenIndex) =>
          times.map((timeSlot, index) => (
            <div
              key={index + screenIndex}
              onClick={() => handleShowTimeClick(timeSlot[0], `${index}${screenIndex}`, screen)}
              className={`flex flex-col items-center p-2 rounded-md min-w-[80px] text-xs cursor-pointer transition-all duration-300 ease-in-out shadow-md ${
                `${selectedTimeIndex}` === `${index}${screenIndex}`
                  ? "bg-secondary text-gray-700"
                  : "bg-white text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span className="font-bold text-sm">{convertTo12HourFormat(timeSlot[0])}</span>
              <span className="text-xs mt-1">{timeSlot[1]}</span>
            </div>
          ))
        )}
      </div>
      <button
        className="flex items-center gap-1 justify-center bg-white border border-gray-500 hover:bg-primaryhover text-gray-500 font-semibold py-2 px-4 rounded-lg hover:text-gray-300 shadow-md transition duration-300 ease-in-out text-sm w-full sm:w-auto"
        onClick={() => {
          setPrevTotalSeatCount(totalSeatCount);
          dispatch(setBooking({ totalSeatCount: null }));
        }}
      >
        <MdOutlineEdit />
        <span>{totalSeatCount} Tickets</span>
      </button>
    </div>

    {/* Seat Layout */}
    <div className="w-full bg-white overflow-auto h-full">
      <div className="flex flex-col items-center">
        {Object.keys(seatData).map((tierIndex, index) => (
          <div key={tierIndex + index} className="mb-4 w-full">
            <h4 className="text-sm font-semibold text-gray-700 mb-2 text-center">
              {seatData[tierIndex][0].tier_name.toUpperCase()} {`₹${seatData[tierIndex][0].tier_price}`}
            </h4>
            <div className="p-2 rounded-lg">
              {renderSeatLayout(seatData[tierIndex])}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-6 mb-6 text-xs">
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

        {/* Screen Label */}
        <div className="relative w-full max-w-xs h-4 bg-gray-900 text-white text-center rounded-b-full shadow-lg mx-auto mt-4">
          <div className="absolute -inset-3 bg-gradient-to-t from-transparent to-yellow-100 rounded-b-full opacity-70 blur-sm"></div>
        </div>
        <div className="text-center mt-2">
          <span className="text-[10px] sm:text-xs font-semibold text-gray-800">All eyes on the screen</span>
        </div>
      </div>
    </div>
  </div>

  {/* Booking Summary */}
  <div className="lg:w-1/4 w-full bg-gray-50 p-4 sm:p-5 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-lg font-semibold">Booking Summary</h4>
      <span className="text-xl text-gray-600">
        <TbTicketOff />
      </span>
    </div>

    <div className="border-t border-gray-300 mb-4"></div>

    <div className="flex items-start mb-4">
      <div className="w-16 h-20 overflow-hidden rounded-lg mr-4">
        <img
          src={movie.poster_path}
          alt="Movie Poster"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h5 className="text-base font-semibold text-gray-800">{movie.title}</h5>
        <p className="text-xs text-gray-500 mb-1">
          Genre: {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className="text-xs text-gray-500 mb-1">Time: {selectedTimeOg}</p>
        <p className="text-xs text-gray-500 mb-1">
          Date: {dates[selectedDate] && `${dates[selectedDate].day} ${dates[selectedDate].month} ${dates[selectedDate].dayOfWeek} ${dates[selectedDate].year}`}
        </p>
        <p className="text-xs text-gray-500">Theater: {selectedTheater.name}</p>
      </div>
    </div>

    <div className="border-t border-gray-300 mb-4"></div>

    {selectedSeats.length > 0 ? (
      <>
        <div>
          <h5 className="text-sm font-semibold text-gray-700 mb-2">Movie Info</h5>
          <p className="text-xs text-gray-500 mb-1">
            Tier: {[...new Set(selectedSeats.map((seats) => seats.seat.tier_name))]}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSeats.map((seat, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-third rounded text-xs font-semibold text-gray-700"
              >
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
              Total: ₹{selectedSeats.length * parseInt(selectedSeats[0].seat.tier_price)}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="border-t border-gray-300 mb-4"></div>

          <div className="flex justify-between items-center mb-4">
            <p className="text-base font-semibold text-gray-700">Grand Total</p>
            <p className="text-base font-semibold text-gray-800">
              ₹{(selectedSeats.length * selectedSeats[0].seat.tier_price).toFixed(2)}
            </p>
          </div>

          <button
            className="w-full bg-primary hover:bg-primaryhover text-white font-semibold py-2 rounded-md transition duration-300"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </>
    ) : (
      <div className="flex flex-col items-center mt-8">
        <img
          src="/assets/cinema-seat.svg"
          alt="No Seats Selected"
          className="w-12 h-12 mb-3"
        />
        <p className="text-sm text-gray-500">No seats are selected</p>
      </div>
    )}
  </div>
</div>


  );
};

export default SeatLayout