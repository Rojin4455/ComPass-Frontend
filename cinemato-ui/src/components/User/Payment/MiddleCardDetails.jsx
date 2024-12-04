// MiddleCardDetails.js
import React, {useState} from 'react';
import { FaCcStripe } from "react-icons/fa";
import { ImSpinner2 } from 'react-icons/im'; // Spinner icon
import { BsStripe } from "react-icons/bs";
import { useSelector } from 'react-redux';
import useAxiosInstance from '../../../axiosConfig';
import { loadStripe } from '@stripe/stripe-js';
import showToast from '../../../utils/ToastNotifier'
import { clearBooking } from '../../../slices/userBookingSlice';
import { useDispatch } from 'react-redux';





function MiddleCardDetails({movie}) {
    const [isLoading, setIsLoading] = useState(false);
    const selectedTimeOg = useSelector((state) => state.date.selectedTimeOg)
    const selectedDate = useSelector((state) => state.date.selectedDate)
    const email = useSelector((state) => state.booking.email)
    const phone = useSelector((state) => state.booking.phone)
    const dates = useSelector((state) => state.date.allDates)
    const isProceed = useSelector((state) => state.booking.isProceed)
    const dispatch = useDispatch()
    
    const {selectedTheater,selectedSeats,quantities,addedSnacks, selectedScreen, selectedMovie} = useSelector((state) => state.booking)
    const axiosInstance = useAxiosInstance()

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

    const handleClick = async () => {
        setIsLoading(true);
        if (!email){
          showToast('error','Email Is Mandatory!')
          setIsLoading(false);

          return
        }
        try {
            
            const { data } = await axiosInstance.post('booking/create-payment-intent/', {
                selectedTime:selectedTimeOg,
                selectedDate:dates[selectedDate],
                selectedScreen:selectedScreen,
                selectedTheater:selectedTheater,
                selectedSeats:selectedSeats,
                quantities:quantities,
                addedSnacks:addedSnacks,
                selectedMovie:selectedMovie,
                email:email,
                phone:phone,
            });
      
            const stripe = await stripePromise;
            const { error, success } = await stripe.redirectToCheckout({ sessionId: data.id });
            if (error) console.error("Stripe error:", error.message);
            if (success){
              console.log("stripe success: ", success.message)
              dispatch(clearBooking())
            }
          } catch (error) {
            console.error("Error creating checkout session:", error)
          } finally {
            setIsLoading(false);
          }

      };



  return (
    <div className="p-6  rounded-lg text-gray-800">
      <h2 className="text-lg font-semibold mb-4">Pay Using Card</h2>

      {/* Card Number Input */}
      {/*  */}

      <button
  type="submit"
  onClick={handleClick}
  disabled={!isProceed || isLoading}
  className={`w-full flex flex-col items-center p-4 font-semibold rounded-md transition-colors
    ${isProceed && !isLoading ? 'bg-primary text-gray-200 hover:bg-secondary-dark cursor-pointer' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}
  `}
  style={{ fontFamily: "Montserrat" }}
>
  {isLoading ? (
    <div className="flex items-center space-x-2">
      <ImSpinner2 className="animate-spin text-gray-500" />
      <span>Processing...</span>
    </div>
  ) : (
    <>
      <span className="text-lg">Verify & Pay</span>
      <div className="flex items-center justify-center mt-1 text-xs text-gray-400">
        pay with <BsStripe className="ml-1 text-blue-500 text-base" />
      </div>
    </>
  )}
</button>


    </div>
  );
}

export default MiddleCardDetails;
