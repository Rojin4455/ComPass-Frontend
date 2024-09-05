import React from 'react'
import Sidebar from '../../components/User/Profile/Sidebar/Sidebar'
import UserDetails from '../../components/User/Profile/UserDetails/UserDetails'
import MainLayout from '../../components/User/MainLayout'

function UserProfile() {
  return (
    <div>
        <MainLayout>
        <UserDetails />
        <Sidebar/>
        </MainLayout>

    </div>
  )
}

export default UserProfile
