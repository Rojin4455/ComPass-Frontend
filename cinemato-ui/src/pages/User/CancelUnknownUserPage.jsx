import React from 'react'
import CancelUnknownUser from '../../components/User/Profile/SidebarDetails/Bookings/CancelUnknownUser'
import MainLayout from '../../components/User/MainLayout'
import Header from '../../components/User/Home/Header/Header'



function CancelUnknownUserPage() {
  return (
    <>
    <Header/>
        <CancelUnknownUser/>
    </>
  )
}

export default CancelUnknownUserPage