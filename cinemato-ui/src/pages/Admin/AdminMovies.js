import React from 'react'
import Header from '../../components/Admin/Header/Header'
// import AdminMovies from '../../components/Admin/AdminListedMovies/AdminListedMovies'
import AdminListedMovies from '../../components/Admin/AdminListedMovies/AdminListedMovies'


function AdminMovies() {
  return (
    <div>
      <Header page="admin/movies/"/>
      <div className='pt-20'>
      <AdminListedMovies/>
        
        </div>
      
    </div>
  )
}

export default AdminMovies
