import React from 'react'
// import MovieDetails from '../../components/Theater/Movies/MovieDetails'
import Header from '../../components/Theater/Header/Header'
import MovieDetails from '../../components/Common/MovieDetails'

function OwnerMovieDetailsPage() {
  return (
    <div>
      <Header page="owner/movies/"/>
      <div style={{paddingTop:'4.5rem'}}>
    <MovieDetails page={"owner"}/>
    </div>
    </div>
  )
}

export default OwnerMovieDetailsPage