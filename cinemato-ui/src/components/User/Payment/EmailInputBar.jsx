import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setBooking } from '../../../slices/userBookingSlice';
import { useDispatch } from 'react-redux';
import { AiOutlineCheck, AiOutlineEdit, AiOutlineDown, AiOutlineUp } from "react-icons/ai";



function EmailInputBar({ onProceed }) {
    // const loggedInUser = useSelector((state) => state.user.user);
    const visitorEmail = useSelector((state) => state.booking.email ? state.booking.email : null)
    const userEmail = useSelector((state) => state.user?.user?.email? state.user.user.email : null )
    const [testEmail, setTestEmail] = useState(visitorEmail? visitorEmail : userEmail)
    const [testPhone, setTestPhone] = useState(useSelector((state) => state.booking.phone ? state.booking.phone : null))
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    console.log("is open : ",isOpen, "visitor: ",visitorEmail,"user email: ",userEmail,"phone: ",testPhone)
    const isProceed = useSelector((state) => state.booking.isProceed)
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch()

    const [errors, setErrors] = useState({ email: '', phone: '' });



    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        setVerified(false)
    }, [testEmail, testPhone]);

    const validateInputs = () => {
        let emailError = '';
        let phoneError = '';

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!testEmail) {
            emailError = 'Email is required.';
        } else if (!emailRegex.test(testEmail)) {
            emailError = 'Please enter a valid email address.';
        }

        // Phone validation
        if (testPhone) {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(testPhone)) {
                phoneError = 'Phone number must be 10 digits.';
            }
        }

        setErrors({ email: emailError, phone: phoneError });
        return !emailError && !phoneError;
    };

    const handleProceed = async () => {
        if (!validateInputs()) return;

        setLoading(true);
        setVerified(false);

        dispatch(setBooking({ email: testEmail }))
        dispatch(setBooking({ phone: testPhone }))
        await new Promise((resolve) => setTimeout(resolve, 500));
        setLoading(false);
        setVerified(true);
        dispatch(setBooking({ isProceed: true }))

        onProceed(testEmail, testPhone);
    };

    return (
        <div className="w-full bg-white p-6 border rounded-md mb-4 border-gray-200">
  <div
    className="bg-primary p-3 text-gray-100 flex justify-between items-center cursor-pointer"
    onClick={() => setIsOpen(!isOpen)}
  >
    {isOpen && !isEditing ? (
      <span>Share Your Contact Details</span>
    ) : (
      <div className="flex justify-between w-full items-center">
        <span className="pl-4 text-sm sm:text-base">
          Tickets sent to: <strong>{testEmail || "No Email"} / {testPhone || "No Phone"}</strong>
        </span>
        <AiOutlineEdit
          className="text-gray-300 hover:text-white ml-4 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
            setIsOpen(true);
          }}
        />
      </div>
    )}
    {isOpen ? <AiOutlineUp className="text-gray-100" /> : <AiOutlineDown className="text-gray-100" />}
  </div>

  {isOpen && (
    <div className="mt-4">
      {!isEditing || !isProceed ? (
        <div className="flex flex-col space-y-4">
          <input
            type="email"
            className={`w-full p-3 rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"} outline-none`}
            placeholder="Enter your email"
            value={testEmail}
            onChange={(e) => {
              setTestEmail(e.target.value);
              dispatch(setBooking({ isProceed: false }));
            }}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

          <input
            type="text"
            className={`w-full p-3 rounded-md border ${errors.phone ? "border-red-500" : "border-gray-300"} outline-none`}
            placeholder="Phone number (optional)"
            value={testPhone}
            onChange={(e) => {
              const phoneInput = e.target.value.replace(/[^0-9]/g, "");
              if (phoneInput.length <= 10) {
                setTestPhone(phoneInput);
                dispatch(setBooking({ isProceed: false }));
              }
            }}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

          <button
            onClick={() => {
              handleProceed();
              setIsEditing(false);
            }}
            disabled={loading || verified}
            className={`w-full p-3 rounded-md font-semibold flex items-center justify-center bg-secondary hover:bg-yellow-300 transition-colors ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? (
              <span className="animate-spin w-5 h-5 border-2 border-t-2 border-t-white border-secondary rounded-full"></span>
            ) : verified ? (
              <>
                <AiOutlineCheck className="mr-2 text-lg" />
                Finished
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      ) : null}
    </div>
  )}
</div>

    );
}

export default EmailInputBar;
