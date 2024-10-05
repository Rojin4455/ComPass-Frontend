import React from 'react'
import {Route,Routes} from 'react-router-dom'
import AdminLogin from '../pages/Admin/AdminLogin'
import AdminHome from '../pages/Admin/AdminHome'
import AdminProtectedRoute from '../routes/AdminProtectedRoute'
import AdminMovies from '../pages/Admin/AdminMovies'
import AdminUsers from '../pages/Admin/AdminUsers'
import AdminTheater from '../pages/Admin/AdminTheater'
import AddMovies from '../pages/Admin/AddMovies'
import AddMoviesDetails from '../pages/Admin/AdminAddMoviesDetails'
import AdminListedMovieDetails from '../components/Admin/AdminListedMovies/AdminListedMovieDetails'
import RequestedOwnersPage from '../pages/Admin/RequestedOwnersPage'
import OwnerDetailsPage from '../pages/Admin/OwnerDetailsPage'
import AdminListedMovieDetailsPage from '../pages/Admin/AdminListedMovieDetailsPage'



function AdminRoutes() {
  return (
    <Routes>
        <Route path={'admin/'} element={<AdminLogin/>}/>
        
        <Route path={'admin/home/'} element={<AdminProtectedRoute><AdminHome/></AdminProtectedRoute>}/>
        <Route path={'admin/users/'} element={<AdminProtectedRoute><AdminUsers/></AdminProtectedRoute>}/>
        <Route path='admin/movies/' element={<AdminProtectedRoute><AdminMovies/></AdminProtectedRoute>}/>
        <Route path='admin/addmovies/' element={<AdminProtectedRoute><AddMovies/></AdminProtectedRoute>}/>
        <Route path='admin/theaters/' element={<AdminProtectedRoute><AdminTheater/></AdminProtectedRoute>}/>
        <Route path='admin/addmovie-datail/:id' element={<AdminProtectedRoute><AddMoviesDetails/></AdminProtectedRoute>}/>
        <Route path='admin/listmovie-datail/' element={<AdminProtectedRoute><AdminListedMovieDetailsPage/></AdminProtectedRoute>}/>
        <Route path='/admin/requested-owners/' element={<AdminProtectedRoute><RequestedOwnersPage/></AdminProtectedRoute>}/>
        <Route path='admin/owner-details/:id/' element={<AdminProtectedRoute><OwnerDetailsPage/></AdminProtectedRoute>}/>
    </Routes>
  )
}

export default AdminRoutes