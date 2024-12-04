import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import RunningTheaters from "./RunningTheaters";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../../slices/userSelectedDateSlice";
import { setBooking } from "../../../slices/userBookingSlice";


const CinemaSelection = ({dates, scheduledTheaters }) => {
  const dateWrapperRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const dispatch = useDispatch()
  const selectedDate = useSelector((state) => state.date.selectedDate)

  const movie = useSelector((state) => state.booking.selectedMovie)
  useEffect(() => {
    const handleScroll = () => {
      if (dateWrapperRef.current) {
        setCanScrollLeft(dateWrapperRef.current.scrollLeft > 0);
      }
    };
    const wrapper = dateWrapperRef.current;
    wrapper.addEventListener("scroll", handleScroll);
    return () => wrapper.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    dispatch(setBooking({selectedSeats:[]}))
},[])

  const scrollRight = () => {
    if (dateWrapperRef.current) {
      dateWrapperRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (dateWrapperRef.current) {
      dateWrapperRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  return (
    <>
    <div className="p-10">
  <h1 className="text-2xl font-bold mb-3">{movie.movieTitle}</h1>
  <div className="flex gap-2 mb-5">
    {movie.genres.map((genre, index) => (
      <span
        key={index}
        className="px-3 py-1 border border-gray-500 rounded-full text-sm text-gray-700"
      >
        {genre.name}
      </span>
    ))}
  </div>

  <div className="flex items-center justify-between border-t border-gray-300">
    <div className="flex items-center">
      {canScrollLeft && (
        <FaChevronLeft
          onClick={scrollLeft}
          size={25}
          className="cursor-pointer px-2 focus:outline-none"
        />
      )}
      <div
        ref={dateWrapperRef}
        className="flex gap-4 overflow-x-auto w-3/5 py-2 scrollbar-hide"
      >
        {dates.map((date, index) => (
          <div
            key={index}
            onClick={() => dispatch(setDate({selectedDate:index}))}
            className={`flex flex-col items-center p-4 rounded-md min-w-[80px] text-sm cursor-pointer ${
              selectedDate === index ? "bg-primary text-white" : "bg-white text-gray-500"
            }`}
          >
            <span className="text-sm mb-1">{date.dayOfWeek}</span>
            <span className="font-bold text-lg">{date.day}</span>
            <span className="text-xs">{date.month}</span>
          </div>
        ))}
      </div>
      {dates.length > 4 && (
        <FaChevronRight
          onClick={scrollRight}
          size={25}
          className="cursor-pointer px-2 focus:outline-none"
        />
      )}
    </div>

    <div className="ml-auto flex items-center relative">
  {isSearchVisible ? (
    <div className="flex items-center border-b-2 border-gray-300 transition-all duration-300 ease-in-out">
      <IoSearchOutline
        size={20}
        className={`cursor-pointer text-gray-500 transition-transform duration-300 ease-in-out ${isSearchVisible ? 'translate-x-[-10px]' : ''}`}
      />
      <input
        type="text"
        placeholder="Search cinema"
        className="border-0 outline-none py-1 placeholder-gray-400 transition-all duration-300 ease-in-out"
        onBlur={() => setIsSearchVisible(false)}
        autoFocus
      />
      
    </div>
  ) : (
    <IoSearchOutline
      size={30}
      className="cursor-pointer text-gray-500 transition-transform duration-300 ease-in-out"
      onClick={() => setIsSearchVisible(true)}
    />
  )}
</div>





  </div>
</div>
<RunningTheaters scheduledTheaters={scheduledTheaters} dates={dates} selectedDate={selectedDate}/>
</>

  );
};

export default CinemaSelection;
