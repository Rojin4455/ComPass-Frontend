import React from 'react'
import {Route,Routes} from 'react-router-dom'
import UserHome from '../pages/User/UserHome'
import UserProfile from '../pages/User/UserProfile'
import UserProtectedRoute from './UserProtected'

function UserRoutes() {
  return (
    <Routes>
        <Route path='/' element={<UserHome/>}/>
            <Route path='/profile' element={ <UserProtectedRoute><UserProfile/></UserProtectedRoute>} />
    </Routes>
  )
}

export default UserRoutes