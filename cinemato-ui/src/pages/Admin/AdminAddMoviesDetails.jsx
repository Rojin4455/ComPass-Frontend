import React from 'react'
import Header from '../../components/Admin/Header/Header'
import AdminAddMovies from '../../components/Admin/AdminAddMovies/AdminAddMovies'
import AdminAddMovieDetails from '../../components/Admin/AdminAddMovies/AdminAddMovieDetails'

function AddMoviesDetails() {
  return (
    <div>
      <Header page="admin/movies/"/>
      <div style={{paddingTop:'4.5rem'}}>
    <AdminAddMovieDetails/>
    </div>
    </div>
  )
}

export default AddMoviesDetails
