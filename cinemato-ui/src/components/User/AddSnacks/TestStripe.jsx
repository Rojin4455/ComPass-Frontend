// TestStripe.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import useAxiosInstance from '../../../axiosConfig';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function TestStripe() {
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxiosInstance();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Create checkout session on the backend
      const { data } = await axiosInstance.post('booking/create-payment-intent/', {
        amount: 2000
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) console.error("Stripe error:", error.message);
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`p-3 bg-secondary rounded-md text-white font-semibold ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-yellow-300'}`}
    >
      {loading ? 'Processing...' : 'Pay with Stripe Checkout'}
    </button>
  );
}

export default TestStripe;
