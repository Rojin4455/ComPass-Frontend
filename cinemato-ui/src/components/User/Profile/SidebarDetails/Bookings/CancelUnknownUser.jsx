import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IoWarningOutline } from 'react-icons/io5';
import useAxiosInstance from '../../../../../axiosConfig';
import showToast from '../../../../../utils/ToastNotifier';

function CancelUnknownUser() {

  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const axiosInstance = useAxiosInstance()

  const bookingId = searchParams.get('booking_id');



  const handleCancelBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('booking/cancel-ticket-unknown/', {
        booking_id: bookingId,
      });

      if (response.status === 200) {
        setSuccess(true);
        showToast('success', 'tickets are cancelled!')
      } else {
        showToast('error','Failed to cancel the booking. Please try again.');
      }
    } catch (err) {
        console.error(err)
        
      showToast('error',err.response.data.message? err.response.data.message :'An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optional: Perform any additional validation or setup here
    if (!bookingId) {
      showToast('error','Invalid URL parameters. Please check the link and try again.');
    }
  }, [bookingId]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200 px-6">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <IoWarningOutline size={32} className="text-red-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Cancel Your Booking</h2>
        </div>
        <p className="mt-4 text-gray-600">
          You are about to cancel your ticket booking. If you cancel, the ticket will no longer be valid, and any associated seats will be released for others to book.
        </p>
        <div className="mt-6 bg-red-100 border border-red-400 rounded-lg p-4">
          <h3 className="text-lg font-medium text-red-600">Important Notice</h3>
          <p className="text-sm text-red-500 mt-2">
            Please note that cancellations are final, and you will not be able to re-book the same ticket. Ensure that you want to proceed before confirming.
          </p>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleCancelBooking}
            className="px-6 py-2 text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
          >
            Confirm Cancellation
          </button>
          <a
            href="/"
            className="text-blue-500 hover:underline text-sm"
          >
            Go Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

export default CancelUnknownUser;
