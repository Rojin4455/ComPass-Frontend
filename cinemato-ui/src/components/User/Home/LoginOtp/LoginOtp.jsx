import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import useAxiosInstance from '../../../../axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setUser,clearUser } from '../../../../slices/userSlice';




function LoginOtp({ isOpen, onClose, onSubmit, email, phone }) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(20);
    const [timerActive, setTimerActive] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const axiosInstance = useAxiosInstance();
       
    useEffect(() => {
        if (isOpen) {
            setTimeLeft(20);
            setTimerActive(true);
            setOtp(["", "", "", "", "", ""]); // Optional: Reset OTP fields
        }
    }, [isOpen]);

    useEffect(() => {
        let timer;
        if (isOpen && timerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setTimerActive(false);
        }
        return () => clearInterval(timer);
    }, [isOpen, timerActive, timeLeft]);
    

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (value.match(/^[0-9]$/)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            // Move focus to the next input
            if (index < otp.length - 1) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        } else if (value === "") {
            // Move focus to the previous input if deleting
            if (index > 0) {
                document.getElementById(`otp-${index - 1}`).focus();
            }
        }
    };
    const afterSubmit = async () => {
        
        try {
            const otpString = otp.join('');

            const response = await axiosInstance.post('verify-otp/', {
                otp: otpString,
                email: email || null,
                phone: phone || null
            },
        {
            withCredentials:true
        });          
            // Handle the response if needed
            if (response.status === 200) {
                const user = response.data.requestData
                const access_token = response.data.token.access
                const refresh_token = response.data.token.refresh
                const is_admin = response.data.requestData.is_admin
                dispatch(setUser({user,access_token,refresh_token,is_admin}))
                console.log("otp verification success");
                

                onClose();
            } else {
                // Handle any error messages from the response
                console.error('OTP verification failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error submitting OTP:', error);
        }
    }

    const handleSubmit = async (e=null) => {

        if (e) {
            e.preventDefault();
        }
        afterSubmit(); 
    
    
        
    };
    

    const onResendOtp = async () => {
        try {
            const requestData = {};
    
            if (email) {
                requestData.email = email;
            } else if (phone) {
                requestData.phone = phone;
            }
            const response = await axiosInstance.post('resend-otp/', requestData);
            console.log("response", response.status);
            
            if (response.status === 200) {
                console.log("otp resend success",response);
                
                
                 // Directly call the afterSubmit function
            } else {
                console.error('OTP Resend failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error resending OTP:', error);
        }
    };

    const handleResendOtp = () => {
        setTimeLeft(20);
        setTimerActive(true);
        setOtp(["", "", "", "", "", ""]);
        onResendOtp(); // Call onResendOtp to handle OTP resend logic
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-30 bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div 
                className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col items-center" 
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
            >
                <img src='/assets/Login-logo.jpg' alt="Logo" className='w-32 mb-4'/>
                <h2 className="text-xl font-bold mb-2">Enter OTP</h2>
                <p className="text-center text-sm">
                Enter the OTP sent to your {email && email.trim() ? "email" : "phone"}
                </p>
                <p className='mb-4 font-bold'>{email ? email : phone}</p>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="flex justify-center mb-4 gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                className="w-10 h-10 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:border-primary"
                                maxLength="1"
                            />
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 w-full bg-primary text-white rounded-md"
                        >
                            Verify OTP
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    {timerActive ? (
                        <p className="text-sm text-gray-600">Resend OTP in {timeLeft}s</p>
                    ) : (
                        <button
                            onClick={handleResendOtp}
                            className="text-primary font-medium"
                        >
                            Resend OTP
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginOtp;
