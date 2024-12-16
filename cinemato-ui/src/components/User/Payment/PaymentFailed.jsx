import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function PaymentFailed() {
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const messageParam = params.get('message');
    setMessage(messageParam || 'An unexpected error occurred.');

    const disableNavigation = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', disableNavigation);

    return () => {
      window.removeEventListener('popstate', disableNavigation);
    };
  }, [location]);

  return (
    <div className="flex items-center justify-center h-screen bg-dark-blue-900">
      <div className="bg-dark-blue-800 shadow-lg rounded-lg p-8 max-w-md text-center text-white">
        <div className="mb-6">
          <svg
            className="w-20 h-20 text-yellow-400 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">Payment Failed</h1>
        <p className="text-white mb-6">{message}</p>
        <button
          onClick={() => window.location.replace('/')}
          className="bg-primary text-dark-blue-900 hover:bg-primaryhover py-2 px-6 rounded-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default PaymentFailed;
