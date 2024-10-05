import React from 'react'
import Header from '../../components/Theater/Header/Header'
import Movies from '../../components/Theater/Movies/Movies'

function OwnerMoviesPage() {
  return (
    <div>
      <Header page='owner/movies/'/>
      <Movies/>
    </div>
  )
}

export default OwnerMoviesPage
