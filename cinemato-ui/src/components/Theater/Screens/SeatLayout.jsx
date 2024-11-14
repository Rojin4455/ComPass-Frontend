import React, { useEffect,useState } from 'react'
import { FaChair } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { setContent } from '../../../slices/OwnerScreenSlice'
import useAxiosInstance from '../../../axiosConfig'
import SeatLayoutDisplay from './SeatLayoutDisplay'
import { setScreen as setScreenAction } from '../../../slices/screenFullDetailsSlice'


function SeatLayout({screen1,isScreen}) {
    console.log("is hereeererecddefiondcenfdinwfeje")
    const [screen,setScreen] = useState()
    const dispatch = useDispatch()
    const axiosInstance = useAxiosInstance()
    //   const { screen, loading, error } = useSelector((state) => state.screendetails);


    useEffect(() => {
        const fetchScreenLayout = async (id) => {
            try{
                const response = await axiosInstance(`theater/screen-details/${id}`)
                setScreen(response.data.data)
                dispatch(setScreenAction({screen:response.data.data}))
                console.log("response fgefef: ",response)
            }catch(error){
                console.error("error: ",error)
            }
        }
        fetchScreenLayout(screen1.id)
    },[])

    if(screen){
        const hasEmptySeats = screen.tiers.some(tier => tier.seats.length === 0);
        
        
        return (
            <div className="seat-layout-section">
      {hasEmptySeats ? (
        <div className="flex flex-col items-center justify-center py-20">
            <FaChair size={50} className="text-secondary mb-4" />
            <p className="text-gray-500 text-sm">Start setting up your seat layout.</p>
            <button
                onClick={() => dispatch(setContent({subContent:"add-seat"}))}
                className="bg-primary text-white py-2 px-6 mt-6 rounded hover:bg-primaryhover transition"
            >
                Create Seat Layout
            </button>
        </div>
        ):(
            <SeatLayoutDisplay screen={screen}/>
        )}
    </div>

)
    }

}

export default SeatLayout