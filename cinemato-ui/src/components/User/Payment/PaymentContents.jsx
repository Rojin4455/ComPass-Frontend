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
  <TopBar title={selectedMovie.title} />

  <div className="flex flex-col lg:flex-row justify-between items-start mt-[5rem] gap-6">
    <div className="flex flex-col flex-1 pr-4">
      <EmailInputBar onProceed={handleProceed} />
      <div className="p-4">
        <MiddleCardDetails movie={selectedMovie} />
      </div>
    </div>

    <div className="lg:w-[30%] w-full p-4">
      <RightPriceDetails movie={selectedMovie} isPayment={isPayment} />
    </div>
  </div>
</div>

</MainLayout>




  )
}

export default PaymentContents