import React, { useEffect, useState, useRef } from "react";
import { AiOutlineCheck, AiOutlineGift } from "react-icons/ai";
import { MdChair, MdLocalOffer } from "react-icons/md";
import { IoExitOutline, IoClose } from "react-icons/io5";
import { FiStar, FiPercent } from "react-icons/fi";

const RewardCoupon = ({ isVisible, onClose, couponData }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showCouponDetails, setShowCouponDetails] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsRevealed(true);
            setShowConfetti(true);
            setTimeout(() => setShowCouponDetails(true), 800);
            setTimeout(() => setShowConfetti(false), 3000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const Confetti = () => {
    const pieces = Array.from({ length: 50 }, (_, i) => (
      <div
        key={i}
        className="absolute w-3 h-3 opacity-80"
        style={{
          left: `${Math.random() * 100}%`,
          backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][Math.floor(Math.random() * 6)],
          animation: `confetti-fall ${2 + Math.random() * 3}s linear infinite`,
          animationDelay: `${Math.random() * 2}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    ));
    
    return (
      <div className="fixed inset-0 pointer-events-none z-60">
        {pieces}
      </div>
    );
  };

  if (!isVisible) return null;

  return (
    <>
      <style>
        {`
          @keyframes confetti-fall {
            0% { transform: translateY(-100vh) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(720deg); }
          }
          
          @keyframes card-flip {
            0% { transform: rotateY(0deg) scale(0.8); }
            50% { transform: rotateY(90deg) scale(0.9); }
            100% { transform: rotateY(0deg) scale(1); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
            50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
          }
          
          @keyframes slide-up {
            0% { transform: translateY(30px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          .card-flip {
            animation: card-flip 1s ease-in-out;
          }
          
          .pulse-glow {
            animation: pulse-glow 2s infinite;
          }
          
          .slide-up {
            animation: slide-up 0.6s ease-out forwards;
          }
        `}
      </style>
      
      {showConfetti && <Confetti />}
      
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="relative max-w-lg w-full">
          {/* Countdown Display */}
          {!isRevealed && (
            <div className="text-center mb-8">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                  {countdown}
                </div>
                <div className="flex items-center justify-center mb-4">
                  <AiOutlineGift className="text-4xl text-purple-600 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Surprise Coming!</h2>
                    <p className="text-gray-600">Get ready for your reward...</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Coupon Card */}
          {isRevealed && (
            <div className={`relative ${isRevealed ? 'card-flip' : ''}`}>
              <button
                onClick={onClose}
                className="absolute -top-4 -right-4 z-10 bg-white text-gray-600 hover:text-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <IoClose size={24} />
              </button>

              {/* Main Coupon Card */}
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl overflow-hidden shadow-2xl pulse-glow">
                {/* Header */}
                <div className="relative p-6 text-white">
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-white bg-opacity-20 rounded-full p-3 mr-3">
                          <MdLocalOffer size={32} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">🎉 Congratulations!</h2>
                          <p className="text-sm opacity-90">You've unlocked a special offer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coupon Body */}
                <div className="bg-white relative">
                  {/* Decorative circles */}
                  <div className="absolute -top-4 left-8 w-8 h-8 bg-gray-100 rounded-full"></div>
                  <div className="absolute -top-4 right-8 w-8 h-8 bg-gray-100 rounded-full"></div>
                  
                  <div className="px-6 py-8">
                    {/* Discount Section */}
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-6 py-3 mb-4">
                        {/* <FiPercent className="text-white text-2xl mr-2" /> */}
                        <span className="text-white text-4xl font-bold">{couponData.discount}% OFF</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{couponData.merchant}</h3>
                      <p className="text-gray-600">{couponData.description}</p>
                    </div>

                    {/* Coupon Code */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6 bg-gray-50">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Use Coupon Code</p>
                        <div className="bg-white rounded-lg p-3 border-2 border-purple-500">
                          <p className="font-mono font-bold text-xl text-purple-600">{couponData.code}</p>
                        </div>
                      </div>
                    </div>

                    {/* Validity */}
                    <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
                      <FiStar className="mr-2" />
                      <span>Valid till {couponData.validTill}</span>
                    </div>

                    {/* Action Buttons */}
                    {showCouponDetails && (
                      <div className="space-y-3 slide-up">
                        <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                          📋 Copy Coupon Code
                        </button>
                        <button 
                          onClick={onClose}
                          className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-200"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Bottom decorative circles */}
                  <div className="absolute -bottom-4 left-8 w-8 h-8 bg-gray-100 rounded-full"></div>
                  <div className="absolute -bottom-4 right-8 w-8 h-8 bg-gray-100 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default function BookingSuccess({ bookingDetails }) {
  const {
    movie,
    selectedTimeOg,
    dates,
    selectedDate,
    selectedTheater,
    selectedScreen,
    selectedSeats,
    total,
    ticketTotal,
    snackTotal,
    snacks,
    QrCodeUrl,
    BookingId,
  } = bookingDetails;

  const [showCoupon, setShowCoupon] = useState(false);
  
  // Sample coupon data - you can customize this based on your requirements
  const couponData = {
    discount: 20,
    merchant: "Food Paradise",
    description: "Get discount on your next food order",
    code: "MOVIE20OFF",
    validTill: "Dec 31, 2025"
  };

  const formattedDate = `${dates[selectedDate].day}-${dates[selectedDate].month}-${dates[selectedDate].year}`;
  const seatIdentifiers = selectedSeats.map((seat) => seat.seat.identifier).join(", ");

  useEffect(() => {
    // Show coupon after 2 seconds of component mounting
    const timer = setTimeout(() => {
      setShowCoupon(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-full mx-auto p-8 bg-gray-100 rounded-lg space-y-6">
      {/* Existing booking success content */}
      <div className="text-center space-y-4 bg-green-100 p-6 rounded-lg">
        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white p-2 rounded-full">
            <AiOutlineCheck className="text-xs" />
          </div>
          <h1 className="text-2xl font-bold text-green-600 mt-4">Booking Confirmed!</h1>
        </div>
      </div>

      {/* Existing Booking Details Section */}
      <div className="flex relative bg-white w-2/3 mx-auto shadow-sm">
        <div className="w-1/4 pr-6 p-4 pt-8">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-full h-auto"
          />
        </div>

        <div className="w-1/2 pr-6 p-5 text-xs">
          <h1 className="text-xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-600 mb-1">{selectedTheater.name}</p>
          <p className="text-gray-600 mb-1">
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="text-gray-600 mb-4">
            {selectedTimeOg} | {formattedDate}
          </p>

          <p className="mb-2">Quantity: {selectedSeats.length}</p>
          <div className="flex items-center gap-2 mb-6">
            <MdChair size={18} />
            <span>{selectedScreen} - {seatIdentifiers}</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Ticket price</span>
              <span>Rs {ticketTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Snacks</span>
              <span>Rs {snackTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-300 flex justify-between items-center">
            <span className="text-gray-600">AMOUNT PAID</span>
            <span className="text-2xl font-bold">Rs {total.toFixed(2)}</span>
          </div>
        </div>

        <div className="relative px-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-gray-100 border-x-2 border-b-2 border-gray-100 border-opacity-50 rounded-b-full"></div>
          <div
            className="h-full border-r border-gray-300"
            style={{
              borderRight: "2px dashed",
              borderColor: "#D1D5DB",
              height: "100%",
              backgroundClip: "border-box",
            }}
          ></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 border-x-2 border-t-2 border-gray-100 rounded-t-full border-opacity-50 bg-gray-100"></div>
        </div>

        <div className="w-1/4 p-6 pr-10">
          <img
            src={QrCodeUrl}
            alt="QR Code"
            className="w-full mb-4"
          />
          <div className="text-center">
            <div className="text-xs text-gray-500">BOOKING ID</div>
            <div className="font-mono font-bold">{BookingId}</div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Instructions or Notes */}
      <div className="space-y-2 text-sm text-gray-400">
        <h2 className="text-lg font-bold">Important Instructions:</h2>
        <ul className="list-disc list-inside">
          <li>Please arrive at least 15 minutes before the showtime.</li>
          <li>Outside food and beverages are not allowed inside the theater.</li>
          <li>Show this QR code at the entrance for seamless entry.</li>
          <li>Contact customer support at +91-9876543210 for any queries.</li>
        </ul>
      </div>

      {/* Go to Home Button */}
      <div className="mx-auto flex items-center justify-center relative w-full">
        <button
          className="w-[15%] p-3 rounded-md font-semibold flex items-center justify-center text-gray-200 bg-primary hover:bg-primaryhover transition-colors"
          style={{ fontFamily: "Montserrat" }}
        >
          <IoExitOutline className="mr-2 text-lg" />
          Go to Home
        </button>
      </div>

      {/* Scratch Coupon Modal */}
      <RewardCoupon 
        isVisible={showCoupon}
        onClose={() => setShowCoupon(false)}
        couponData={couponData}
      />
    </div>
  );
}