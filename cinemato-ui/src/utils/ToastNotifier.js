import { toast } from "sonner"; // Assuming you're still using Sonner
import "../toastStyles.css"

// General function to show different toast types
const showToast = (type, message) => {
  let toastClass = '';
  console.log("toast",type,message)
  // Set the CSS class based on the type of toast
  switch (type) {
    case 'success':
      toastClass = 'success-toast';
      break;
    case 'error':
      toastClass = 'error-toast';
      break;
    case 'warning':
      console.log("here warining")
      toastClass = 'warning-toast';
      break;
    default:
      toastClass = 'default-toast';
  }

  // Display the toast with the custom message and class
  toast(
    <span className="toast-text">{message}</span>, 
    {
      className: toastClass,
      duration: 4000, // Customize the duration (optional)
    }
  );
};


export default showToast