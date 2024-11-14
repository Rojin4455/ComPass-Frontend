import React from 'react'
import {Route,Routes} from 'react-router-dom'
import UserHome from '../pages/User/UserHome'
import UserProfile from '../pages/User/UserProfile'
import UserProtectedRoute from './UserProtected'
import UserMovieDetailsPage from '../pages/User/UserMovieDetailsPage'
import CinemaSelectionPage from '../pages/User/CinemaSelectionPage'
import UserSeatLayoutPage from '../pages/User/UserSeatLayoutPage'
import SnackSelectionPage from '../pages/User/SnackSelectionPage'


function UserRoutes() {
  return (
    <Routes>
        <Route path='/' element={<UserHome/>}/>
        <Route path='/profile' element={ <UserProtectedRoute><UserProfile/></UserProtectedRoute>} />
        <Route path='/user/movie-details' element={ <UserMovieDetailsPage/>} />
        <Route path='/user/select-cinema' element={ <CinemaSelectionPage/>} />
        <Route path='/user/selected-layout' element={ <UserSeatLayoutPage/> } />
        <Route path='/user/add-snacks' element={ <SnackSelectionPage/> } />
        </Routes>
  )
}

export default UserRoutes