import React from 'react'
import Header from '../../components/Admin/Header/Header'
import AdminListedMovieDetails from '../../components/Admin/AdminListedMovies/AdminListedMovieDetails'

function AdminListedMovieDetailsPage() {
  return (
    <div>
      <Header page="admin/movies/"/>
      <div style={{paddingTop:'4.5rem'}}>
    <AdminListedMovieDetails/>
    </div>
    </div>
  )
}

export default AdminListedMovieDetailsPage
