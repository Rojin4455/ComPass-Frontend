import React, { useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { MdChair } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearBooking, setBooking } from "../../../slices/userBookingSlice";

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

  const formattedDate = `${dates[selectedDate].day}-${dates[selectedDate].month}-${dates[selectedDate].year}`;
  const seatIdentifiers = selectedSeats.map((seat) => seat.seat.identifier).join(", ");
  const snackNames = snacks.map((snack) => snack.name).join(", ");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(clearBooking());
    };
  }, [dispatch]);



  return (
    <div className="w-screen h-full mx-auto p-8 bg-gray-100 rounded-lg space-y-6">
      {/* Top Section - Booking Confirmed Title and Details */}
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
          {/* Top Half Circle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-gray-100 border-x-2 border-b-2 border-gray-100 border-opacity-50 rounded-b-full"></div>

          {/* Vertical Dotted Line */}
          <div
            className="h-full border-r border-gray-300"
            style={{
              borderRight: "2px dashed",
              borderColor: "#D1D5DB",
              height: "100%",
              backgroundClip: "border-box",
            }}
          ></div>

          {/* Bottom Half Circle */}
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
          onClick={() => navigate('/', { replace: true })}

        >
          <IoExitOutline className="mr-2 text-lg" />
          Go to Home
        </button>
      </div>
    </div>
  );
}
