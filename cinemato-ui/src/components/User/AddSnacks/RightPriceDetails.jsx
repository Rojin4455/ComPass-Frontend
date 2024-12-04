import React from 'react'
import { TbTicketOff } from "react-icons/tb";
import { useSelector } from 'react-redux';
import Loading from '../../Common/Loading';
import { MdDelete } from "react-icons/md";
import { setBooking } from '../../../slices/userBookingSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function RightPriceDetails({movie, isPayment}) {

    const selectedTimeOg = useSelector((state) => state.date.selectedTimeOg)
    const selectedDate = useSelector((state) => state.date.selectedDate)
    const dates = useSelector((state) => state.date.allDates)
    const {selectedTheater,selectedSeats,quantities,addedSnacks, selectedScreen} = useSelector((state) => state.booking)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteSnack = (snackId) => {
            const updatedSnacks = addedSnacks.filter((snack) => snack.id !== snackId);
          const { [snackId]: _, ...updatedQuantities } = quantities;
          
          dispatch(setBooking({
              addedSnacks: updatedSnacks,
              quantities: updatedQuantities
          }));

}

    if (!selectedSeats || !dates || !selectedTimeOg || !selectedTheater) {
        return <Loading loading={true} />;
      }


      const handleCheckout = async () => {
        navigate('/user/booking-payment/',{
          replace:true
        })
      }


  return (
    <div className="border p-6 rounded-lg shadow-md bg-white">
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
      <p className="text-xs text-gray-500 mb-1">Genre: {movie.genres && movie.genres.map((genre) => genre.name).join(', ')}</p>
      <p className="text-xs text-gray-500 mb-1">Time: {selectedTimeOg}</p>
      <p className="text-xs text-gray-500 mb-1">
      Date: {dates && dates[selectedDate] 
        ? `${dates[selectedDate].day} ${dates[selectedDate].month} ${dates[selectedDate].dayOfWeek} ${dates[selectedDate].year}`
        : " "}
      </p>
      <p className="text-xs text-gray-500 mb-1">Theater: {selectedTheater.name} </p>
      <p className="text-xs text-gray-500">{selectedScreen}</p>
    </div>
  </div>

  <div className="border-t border-gray-300 mb-4"></div>


  <div>
        <h5 className="text-sm font-semibold text-gray-700 mb-2">Movie Info</h5>
        <p className="text-xs text-gray-500 mb-1">Tier: {[...new Set(selectedSeats.map((seats) => seats.seat.tier_name))]}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {selectedSeats?.map((seat, index) => (
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
          <p>{selectedSeats?.length} x {selectedSeats[0]?.seat?.tier_price}</p>
          <p className="font-semibold text-gray-800">
            Total: {`₹${selectedSeats.length * parseInt(selectedSeats[0]?.seat?.tier_price)}`}
          </p>
        </div>
        <h5 className="text-sm font-semibold text-gray-700 mb-2">Snacks</h5>
        {addedSnacks && addedSnacks.length > 0 ? (
    <div className="flex flex-col space-y-2 mb-2">
        {addedSnacks.map((snack) => (
            <div key={snack.id} className="flex justify-between text-xs text-gray-500">
              <div className='flex items-center gap-2 text-xs text-gray-500'>
                {!isPayment && (
              <MdDelete size={17} className='cursor-pointer hover:text-red-800' onClick={() => deleteSnack(snack.id)}/>
                )}
                <p>
                    {quantities[snack.id]} x {snack.name} @ ₹{parseFloat(snack.price).toFixed(2)}
                </p>
                </div>
                <p className="font-semibold text-gray-800">
                    Total: ₹{quantities[snack.id] * parseInt(snack.price)}
                </p>
            </div>
        ))}
    </div>
) : (
    <div className="flex flex-col items-center">
        <img src="/assets/snack-image.svg" alt="No Snacks Selected" className="w-10 h-10 mb-2" />
        <p className="text-sm text-gray-500">No snacks are selected</p>
    </div>
)}

      </div>

      
      <div className={`mt-[10%] ${isPayment? 'bg-yellow-100 p-3': '' }`}>
      {!isPayment && (
      <div className="border-t border-gray-300"></div>
      )}

      <div className={`flex justify-between items-center ${!isPayment ? 'mt-4' : ''}`}>
    <p className={`{${isPayment?"text-xs text-gray-500" : "text-base text-gray-700" }font-semibold`}>{isPayment? "Amount Payable" : "Grand Total"}</p>
    <p className="text-base font-semibold text-gray-800">
        ₹{(
            addedSnacks.reduce((total, snack) => {
                return total + (quantities[snack.id] * parseInt(snack.price));
            }, 0) +
            (selectedSeats.length * parseInt(selectedSeats[0]?.seat?.tier_price))
        ).toFixed(2)}
    </p>
</div>

    {!isPayment && (
    <button className="w-full bg-primary hover:bg-primaryhover text-white font-semibold py-2 rounded-md transition duration-300"
    onClick={handleCheckout}
      >
      Proceed to Checkout
    </button>
    )}
    </div>


    {/* <div className="mt-4">
        <div className="flex justify-between text-sm">
          <span>Ticket Price</span>
          <span>$10.00</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span>Snacks</span>
          <span>$15.00</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>$25.00</span>
        </div>
      </div> */}
    </div>
    )
}

export default RightPriceDetails