import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/User/MainLayout';
import CinemaSelectionNavbar from '../../components/User/ChooseShow/CinemaSelectionNavbar'
import { useLocation } from 'react-router-dom';
import useAxiosInstance from '../../axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../slices/userSelectedDateSlice';

function CinemaSelectionPage() {
    const axiosInstance = useAxiosInstance()
    const [scheduledTheaters,setScheduledTheaters] = useState({})
    const dispatch = useDispatch()

    const getUpcomingDates = (numDays) => {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const dates = [];
        const today = new Date();
        
        for (let i = 0; i < numDays; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
      
          const day = String(date.getDate()).padStart(2, '0');
          const month = months[date.getMonth()];
          const dayOfWeek = daysOfWeek[date.getDay()];
          const year = date.getFullYear()
          
          

          dates.push({ day, month, dayOfWeek, year });
        }
        
        return dates;
      };
      
const dates = getUpcomingDates(5);
dispatch(setDate({allDates:dates}))
const location = useLocation()
// const movie = location.state.movie
const movie = useSelector((state) => state.booking.selectedMovie)



const {lat,lng} = useSelector((state) => state.location)

const fetchTheaters = async () => {
    try {
        const response = await axiosInstance.post('movie/location-theaters/',{
            lat:lat,
            lng:lng,
            id:movie.id
        })
        console.log("location theaters data called :-  ",response.data.data)
        setScheduledTheaters(response.data.data)
    } catch(err) {
        console.log("err",err)
    }
}





useEffect(() => {
    fetchTheaters()
},[])
  return (
    Object.keys(scheduledTheaters).length > 0 && (
    <MainLayout>
    <CinemaSelectionNavbar dates={dates} scheduledTheaters={scheduledTheaters}/>
    {/* <RunningTheaters/> */}
    </MainLayout>
)
  )
}

export default CinemaSelectionPage