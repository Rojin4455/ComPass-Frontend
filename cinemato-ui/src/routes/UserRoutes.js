import React from 'react'
import {Route,Routes} from 'react-router-dom'
import UserHome from '../pages/User/UserHome'
import UserProfile from '../pages/User/UserProfile'
import UserProtectedRoute from './UserProtected'
import UserMovieDetailsPage from '../pages/User/UserMovieDetailsPage'
import CinemaSelectionPage from '../pages/User/CinemaSelectionPage'
import UserSeatLayoutPage from '../pages/User/UserSeatLayoutPage'
import SnackSelectionPage from '../pages/User/SnackSelectionPage'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import TestStripe from '../components/User/AddSnacks/TestStripe'
import UserPaymentPage from '../pages/User/UserPaymentPage'
import BookingSuccessPage from '../pages/User/BookingSuccessPage'
import ErrorShowingPage from '../pages/User/ErrorShowingPage'
import CancelUnknownUserPage from '../pages/User/CancelUnknownUserPage'



function UserRoutes() {
  return (
    <Routes>
        <Route path='/' element={<UserHome/>}/>
        <Route path='/profile' element={ <UserProtectedRoute><UserProfile/></UserProtectedRoute>} />
        <Route path='/user/movie-details' element={ <UserMovieDetailsPage/>} />
        <Route path='/user/select-cinema' element={ <CinemaSelectionPage/>} />
        <Route path='/user/selected-layout' element={ <UserSeatLayoutPage/> } />
        <Route path='/user/add-snacks' element={ <SnackSelectionPage/> } />,
        <Route path='/test-stripe' element={<TestStripe/>} />
        <Route path='/user/booking-payment' element={<UserPaymentPage/>} />
        <Route path='/user/booking-success' element={<BookingSuccessPage/>} />
        <Route path='/user/booking-error' element={<ErrorShowingPage/>} />
        <Route path='/user/cancel-unknown-ticket' element={<CancelUnknownUserPage/>} />
        </Routes>
  )
}

export default UserRoutes