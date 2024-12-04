import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { setBooking } from '../../../slices/userBookingSlice';
import { useDispatch } from 'react-redux';

function SelectSeatNumberModal({ seatData, page, setTotalSeatCount, setShowCountModal, totalSeatCount }) {
  const [seatCount, setSeatCount] = useState(totalSeatCount)
  console.log("seat count: ",seatCount)
  const [prev, setPrev] = useState(totalSeatCount)
  const dispatch = useDispatch()


  const getVehicleImage = (count) => {
    if (count <= 1) {
      return "/assets/CycleIcon.webp"
    } else if (count === 2) {
      return "/assets/ScootyIcon.jpg"
    } else if (count === 3) {
      return "/assets/AutoIconOg.webp"
    } else if (count === 4) {
      return '/assets/miniCarIcon.avif'
    } else if (count === 5 || count === 6) {
      return '/assets/carIcon.jpg'
    } else if (count === 7 || count === 8) {
      return '/assets/busIcon.jpg'
    } else if (count === 9 || count === 10) {
      return '/assets/bigBus.jpg'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">

      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">

        <div className="p-6">
          <h2 className="text-xl font-semibold text-center mb-6">How Many Seats?</h2>

          <div className="flex justify-center mb-6">
            <img
              src={getVehicleImage(seatCount)}
              alt="Vehicle"
              className="w-36 h-36 object-contain"
            />
          </div>


          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => (
              <button
                key={num + index}
                onMouseEnter={() => setSeatCount(num)}
                onMouseLeave={() => setSeatCount(prev)}
                onClick={() => {
                  setPrev(num);
                  setSeatCount(num);
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
            transition-all duration-500 ease-in-out
            ${seatCount === num
                    ? 'bg-secondary text-gray-600 scale-110 shadow-md'
                    : prev === num
                      ? 'bg-gray-300 text-gray-600'
                      : 'text-gray-600 hover:bg-gray-200 hover:scale-105'}`}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="flex justify-between mb-6 px-14 ">
            {Object.keys(seatData).map((tierIndex, index) => (

              <div className="text-center w-1/4 text-sm"
                key={tierIndex + index}
              >
                <div className="font-semibold">{seatData[tierIndex][0].tier_name.toUpperCase()}</div>
                <div className="text-sm">{` ₹${seatData[tierIndex][0].tier_price}`}</div>
                <div className="text-xs text-green-500">Available</div>
              </div>
            ))}
          </div>

          <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primaryhover transition duration-300"
            onClick={() => {
              if (page && page !== 'showLayout') {
                dispatch(setBooking({ totalSeatCount: seatCount }));
              } else {
                dispatch(setBooking({ totalSeatCount: seatCount }));
                setTotalSeatCount(seatCount);
                setShowCountModal(false)
              }
            }}
          >
            Select Seats
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectSeatNumberModal;
