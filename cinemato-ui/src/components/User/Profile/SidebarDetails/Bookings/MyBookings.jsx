import React, { useEffect, useState } from 'react';
import useAxiosInstance from '../../../../../axiosConfig';
import { MdCancel, MdChair } from 'react-icons/md';
import CancelConfirmationModal from './CancelConfirmModal';

function MyBookings() {
    const [selectedStatus, setSelectedStatus] = useState("pending");
    const axiosInstance = useAxiosInstance()
    const [tickets, setTickets] = useState([])
    const [cancelIsOpen, setCancelIsOpen] = useState(false)

    const statuses = [
        { key: "pending", label: "Pending to Watch" },
        { key: "watched", label: "Watched" },
        { key: "cancelled", label: "Cancelled" },
    ];

    // const tickets = [
    //     { id: 1, movie: "Movie A", status: "pending", date: "2024-11-20" },
    //     { id: 2, movie: "Movie B", status: "cancelled", date: "2024-11-18" },
    //     { id: 3, movie: "Movie C", status: "watched", date: "2024-11-15" },
    // ];


    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axiosInstance.get(`booking/booked-tickets/${selectedStatus}/`)
                if (response.status === 200) {
                    console.log("success response: ", response)
                    setTickets(response.data)
                } else {
                    console.error("error response")
                }
            } catch (er) {
                console.error("something went wrong: ", er)
            }

        }
        fetchTickets()
    }, [selectedStatus, cancelIsOpen])
    console.log("movie tickets: ", tickets)

    // const filteredTickets = tickets.filter(ticket => ticket.status === selectedStatus);

    return (
        <div className="flex flex-col h-screen bg-white">
  {/* Navbar Section */}
  <div
    className="flex p-4 bg-white "
    // style={{
    //   boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
    // }}
  >
    <div
      className="relative w-full p-2 bg-gray-100 rounded-full "
      style={{
        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Animated Indicator */}
      <div
        className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
        style={{
          width: `${100 / statuses.length}%`,
          transform: `translateX(${statuses.findIndex(
            (status) => status.key === selectedStatus
          ) * 100}%)`,
        }}
      ></div>

      {/* Status Buttons */}
      <div className="relative flex justify-between items-center z-0">
        {statuses.map((status) => (
          <button
            key={status.key}
            onClick={() => setSelectedStatus(status.key)}
            className={`relative flex-1 z-10 px-4 py-2 text-sm font-medium text-center rounded-full transition-all duration-200 ease-in-out
              ${
                selectedStatus === status.key
                  ? "text-gray-300 font-semibold"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            style={{
              transform: selectedStatus === status.key ? "translateY(-1px)" : "none",
            }}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  </div>

  {/* Tickets Section */}
  <div className="flex-1 overflow-y-auto p-6">
    <div className="flex flex-col space-y-4 bg-white p-8">
      {tickets.length > 0 ? (
        tickets.map((ticket) => (
          <div
            key={ticket.booking_id}
            className="flex relative bg-gray-100 rounded-md w-full mx-auto"
          >
            <div className="w-1/4 pr-6 p-4 pt-8">
              <img
                src={ticket.movie_poster}
                alt={ticket.movie_title}
                className="w-full h-auto"
              />
            </div>

            <div className="w-1/2 pr-6 p-5 text-xs">
              <h1 className="text-xl font-bold mb-2">{ticket.movie_title}</h1>
              <p className="text-gray-600 mb-1">{ticket.theater_name}</p>
              <p className="text-gray-600 mb-1">{ticket.genres}</p>
              <p className="text-gray-600 mb-4">
                {ticket.show_time} | {ticket.show_date}
              </p>

              <p className="mb-2">Quantity: {ticket.book_ticket.length}</p>
              <div className="flex items-center gap-2 mb-6">
                <MdChair size={18} />
                <span>
                  {ticket.screen_name} -{" "}
                  {ticket.book_ticket
                    .map((seat) => seat.seat_identifier)
                    .join(", ")}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Ticket price</span>
                  <span>
                    Rs{" "}
                    {parseFloat(ticket.book_ticket[0].price)
                      .toString()
                      .replace(/\.00$/, "")}{" "}
                    x {ticket.book_ticket.length}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-300 flex justify-between items-center">
                <span className="text-gray-600">AMOUNT PAID</span>
                <span className="text-2xl font-bold">Rs {ticket.total}</span>
              </div>
            </div>

            <div className="relative px-4">
              {/* Top Half Circle */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-white border-x-2 border-b-2 border-white border-opacity-50 rounded-b-full"></div>

              {/* Vertical Dotted Line */}
              <div
                className="h-full border-r border-white"
                style={{
                  borderRight: "2px dashed",
                  borderColor: "#D1D5DB",
                  height: "100%",
                  backgroundClip: "border-box",
                }}
              ></div>

              {/* Bottom Half Circle */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 border-x-2 border-t-2 border-white rounded-t-full border-opacity-50 bg-white"></div>
            </div>

            <div className="w-1/4 p-6 pr-10 space-y-4">
              <img
                src={ticket.qr_code}
                alt="QR Code"
                className="w-full mb-4"
              />
              <div className="text-center">
                <div className="text-xs text-gray-500">BOOKING ID</div>
                <div className="font-mono font-bold">{ticket.booking_id}</div>
              </div>
              {selectedStatus === 'pending' &&
              <button
  className="group relative flex items-center ml-4 gap-1 justify-center rounded-md bg-white px-4 py-1 text-sm font-medium shadow transition duration-300 ease-in-out hover:bg-red-400 focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
  onClick={() => setCancelIsOpen(true)}

>
  <MdCancel
    className="text-red-500 transition-transform duration-300 group-hover:text-white group-hover:-rotate-90"

    size={16}
  />
  <span className="text-black group-hover:text-white transition-colors duration-300"
  >
    Cancel
  </span>
</button>
}

            </div>
            {cancelIsOpen &&
            <CancelConfirmationModal setCancelIsOpen={setCancelIsOpen} cancelIsOpen={cancelIsOpen} ticket={ticket}/>
}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No tickets available for this status.</p>
      )}
    </div>
  </div>
</div>

    );
}

export default MyBookings;
