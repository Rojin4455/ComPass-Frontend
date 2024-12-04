import React, { useState } from 'react';

const ErrorMessage = ({ message, imageUrl, onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <div
      className="relative w-full max-w-md p-6 mx-auto text-white bg-gradient-to-br from-red-800 to-black shadow-xl rounded-lg transform transition-all duration-300 scale-105"
      style={{
        fontFamily: 'Montserrat',
      }}
    >
      {/* Optional Image */}
      {imageUrl && (
        <div className="relative mb-4 w-full h-40 rounded-md overflow-hidden shadow-md">
          <img
            src={imageUrl}
            alt="Error illustration"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Message and Icon */}
      <div className="flex items-start">
        <div className="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-red-500 bg-white rounded-full p-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM9 12h.01M15 12h.01M12 15h.01M12 3v6m-6 6h6m6 6h6"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold">Error Occurred</h2>
          <p className="mt-1 text-sm opacity-90">{message}</p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-2xl text-white focus:outline-none transition-transform transform hover:rotate-90"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Footer Links */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          onClick={() => alert('Retry action here')}
          className="px-3 py-1 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-colors"
        >
          Retry
        </button>
        <a
          href="/"
          className="underline hover:text-gray-300 transition-colors"
        >
          Back to Home
        </a>
      </div>


    </div>
  );
};

export default ErrorMessage;
