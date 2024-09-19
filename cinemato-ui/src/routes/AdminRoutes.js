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
function AdminRoutes() {
  return (
    <Routes>
        <Route path={'admin/'} element={<AdminLogin/>}/>
        <Route element={<AdminProtectedRoute/>}>
        <Route path={'admin/home/'} element={<AdminHome/>}/>
        <Route path={'admin/users/'} element={<AdminUsers/>}/>
        <Route path='admin/movies/' element={<AdminMovies/>}/>
        <Route path='admin/addmovies/' element={<AddMovies/>}/>
        <Route path='admin/theaters/' element={<AdminTheater/>}/>
        <Route path='admin/addmovie-datail/:id' element={<AddMoviesDetails/>}/>
        </Route>
    </Routes>
  )
}

export default AdminRoutes