// ToastNotifier.js
import React from 'react';
import { Toaster } from 'sonner'; // Or 'react-toastify' if you're using that

const ToastNotifier = () => {

  return (
    <div>
      {/* Other components */}
      <Toaster
        position="top-center" // Toasts will appear at the top-center of the screen
        toastOptions={{
          duration: 4000, // Default duration for all toasts
          success: {
            style: {
              background: 'green', // Background color for success toasts
              color: '#fff',        // Text color for success toasts
            },
          },
          error: {
            style: {
              background: 'red',   // Background color for error toasts
              color: '#fff',        // Text color for error toasts
            },
          },
          warning: {
            style: {
              background: 'orange', // Background color for warning toasts
              color: '#fff',         // Text color for warning toasts
            },
          },
          info: {
            style: {
              background: 'blue',   // Background color for info toasts
              color: '#fff',         // Text color for info toasts
            },
          },
          style: {
            fontSize: '16px', // Global font size for all toast messages
          },
        }}
      />
    </div>
  );
};

export default ToastNotifier;
