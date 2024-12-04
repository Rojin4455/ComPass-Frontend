import React, { useState } from 'react';
import ErrorMessage from '../../components/Common/ErrorMessage';

const ErrorShowingPage = () => {
  const [error, setError] = useState('Something went wrong!');

  const handleDismiss = () => {
    console.log('Error message dismissed');
    setError('');
  };

  return (
    <div
  className="flex flex-col items-center justify-center min-h-screen bg-white"
>
  <div
    className="absolute top-20 w-full max-w-md p-6 mx-auto text-white bg-gradient-to-br from-red-800 to-black shadow-xl rounded-lg transform transition-all duration-300 scale-105"
    style={{
      fontFamily: 'Montserrat',
    }}
  >
    {/* Optional Image */}

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
        <p className="mt-1 text-sm opacity-90">Something went wrong. Please try again!</p>
      </div>
    </div>

    {/* Close Button */}
    <button
      className="absolute top-3 right-3 text-2xl text-white focus:outline-none transition-transform transform hover:rotate-90"
      aria-label="Close"
    >
      &times;
    </button>

    {/* Footer Links */}
    <div className="flex justify-between items-center mt-4 text-sm">
      <button
        onClick={() => window.location.reload()}
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
  <div className='w-[35%]'>
    <img
    src='/assets/error-image.webp'
    />
  </div>

  {/* Footer */}
  <footer className="absolute w-full text-center text-gray-600 bottom-0 bg-gray-200 py-6 mt-8 rounded-t-lg">
    <div className="container mx-auto space-y-4">
      {/* Footer Links */}
      <div className="flex justify-center space-x-4 text-sm">
        <a href="/" className="hover:text-gray-100 transition-colors">About Us</a>
        <a href="/" className="hover:text-gray-100 transition-colors">Contact</a>
        <a href="/" className="hover:text-gray-100 transition-colors">Privacy Policy</a>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-4 text-gray-500">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <i className="fab fa-facebook-f hover:text-white"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <i className="fab fa-twitter hover:text-white"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <i className="fab fa-instagram hover:text-white"></i>
        </a>
      </div>

      {/* Footer Text */}
      <p className="text-xs">© 2024 Cinemato. All rights reserved.</p>
    </div>
  </footer>
</div>

  );
};

export default ErrorShowingPage;
