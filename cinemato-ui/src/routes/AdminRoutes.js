import React from 'react'
import {Route,Routes} from 'react-router-dom'
import AdminLogin from '../pages/Admin/AdminLogin'
import AdminHome from '../pages/Admin/AdminHome'
import AdminProtectedRoute from '../routes/AdminProtectedRoute'
import AdminMovies from '../pages/Admin/AdminMovies'
import AdminUsers from '../pages/Admin/AdminUsers'
import AdminTheater from '../pages/Admin/AdminTheater'

function AdminRoutes() {
  return (
    <Routes>
        <Route path={'admin/'} element={<AdminLogin/>}/>
        <Route element={<AdminProtectedRoute/>}>
        <Route path={'admin/home/'} element={<AdminHome/>}/>
        <Route path={'admin/users/'} element={<AdminUsers/>}/>
        <Route path='admin/movies/' element={<AdminMovies/>}/>
        <Route path='admin/theaters/' element={<AdminTheater/>}/>
        </Route>
    </Routes>
  )
}

export default AdminRoutes