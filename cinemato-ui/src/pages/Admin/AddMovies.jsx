import React from 'react'
import Header from '../../components/Admin/Header/Header'
import AdminAddMovies from '../../components/Admin/AdminAddMovies/AdminAddMovies'

function AddMovies() {
  return (
    <div>
      <Header page="admin/movies/"/>
      <div className='pt-20'>
    <AdminAddMovies/>
    </div>
    </div>
  )
}

export default AddMovies
