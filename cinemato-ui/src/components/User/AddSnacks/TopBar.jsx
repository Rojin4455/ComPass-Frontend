import React,{useEffect, useState} from 'react'
import { IoChevronBack } from "react-icons/io5";
import { IoClose } from 'react-icons/io5'
import useAxiosInstance from '../../../axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { clearBooking } from '../../../slices/userBookingSlice';
import { replace, useNavigate } from 'react-router-dom';
import { clearDates } from '../../../slices/userSelectedDateSlice';

function TopBar({title,isPayment}) {
    const axiosInstance = useAxiosInstance()
    const dates = useSelector((state) => state.date.allDates)
    const {selectedTheater,selectedSeats, selectedScreen} = useSelector((state) => state.booking)
    const movie = useSelector((state) => state.booking.selectedMovie)
    const selectedTimeOg = useSelector((state) => state.date.selectedTimeOg)
    const selectedDate = useSelector((state) => state.date.selectedDate)
    

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isCleared, setIsCleared] = useState(false);


    const handleBack = async () => {
        if (!selectedSeats.length || !selectedTheater || selectedDate === undefined || !selectedScreen) {
            console.warn("Required data is missing. Cannot proceed with booking.");
            return;
        }
        try{
            const response = await axiosInstance.post('booking/add-selected-seats/',{
              selected_seats:selectedSeats,
              selected_theater:selectedTheater,
              selected_date:dates[selectedDate],
              selected_time:selectedTimeOg,
              tier:[...new Set(selectedSeats.map((seats) => seats.seat.tier_name))],
              screen_name:selectedScreen,
            })
            if ([200].includes(response.status)){
                console.log("good response: ",response)
                setIsCleared(true);
            }else{
                console.error("error response: ",response)
            }

                }catch(er){
                  if (er.status === 409){
                    setIsCleared(true)
                  }
                    console.error("something went wrong: ",er)
                }


    }

    useEffect(() => {
        if (isCleared) {
            dispatch(clearBooking());
            dispatch(clearDates());

            navigate('/user/movie-details/', {
                state: { movie },
                replace: true,
            });
        }
    }, [isCleared, dispatch, navigate]);



  return (
    <div className="fixed w-full flex justify-between items-center bg-gray-100 p-6 text-gray-800 z-20">
      <div className="flex items-center space-x-2"
        onClick={handleBack}
      >
        <IoChevronBack className="h-6 w-6 cursor-pointer" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <IoClose className="h-6 w-6 cursor-pointer" />
    </div>  )
}

export default TopBar