import React,{useState} from 'react'
import MiddleCardDetails from './MiddleCardDetails'
import LeftSideOptions from './LeftSideOptions'
import RightPriceDetails from '../AddSnacks/RightPriceDetails'
import { useSelector } from 'react-redux'
import TopBar from '../AddSnacks/TopBar'
import MainLayout from '../MainLayout'
import EmailInputBar from './EmailInputBar'



function PaymentContents() {

const selectedMovie = useSelector((state) => state.booking.selectedMovie)
const isPayment = true

const handleProceed = () => {
    
}

  return (
<MainLayout>
    <div className="w-full flex flex-col justify-between">
        <TopBar title={selectedMovie.title}/>

        <div className=" flex justify-between items-start mt-[5rem]">
            <div className="flex-col flex-1 pr-4">
                <div>
                <EmailInputBar onProceed={handleProceed} />
                </div>
                <div className="p-4">
                <MiddleCardDetails movie={selectedMovie}/>
                </div>
            </div>
            <div className="w-[30%] p-4">
                <RightPriceDetails movie={selectedMovie} isPayment={isPayment}/>
            </div>
        </div>

        {/* <div className="absolute mt-[16rem] flex items-center flex-1 "> */}
            {/* <div className=" p-4">
                <LeftSideOptions />
            </div> */}

        {/* </div> */}
    </div>
</MainLayout>




  )
}

export default PaymentContents