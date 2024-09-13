import React from 'react'
import {Route,Routes} from 'react-router-dom'
import UserHome from '../pages/User/UserHome'
import UserProfile from '../pages/User/UserProfile'
import UserProtectedRoute from './UserProtected'

function UserRoutes() {
  return (
    <Routes>
        <Route path='/' element={<UserHome/>}/>
          <Route element={ <UserProtectedRoute/> }>
            <Route path='profile/' element={ <UserProfile/>} />

          <Route/>
        </Route>
    </Routes>
  )
}

export default UserRoutes