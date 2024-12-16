import React from 'react'
import Header from '../../components/Admin/Header/Header'
import MovieDetails from '../../components/Common/MovieDetails'

function AdminListedMovieDetailsPage() {
  return (
    <div>
      <Header page="admin/movies/"/>
      <div style={{paddingTop:'4.5rem'}}>
    <MovieDetails/>
    </div>
    </div>
  )
}

export default AdminListedMovieDetailsPage
