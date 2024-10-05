import React from 'react'
import Header from '../../components/Theater/Header/Header'
import Theaters from '../../components/Theater/Theaters/Theaters'

function OwnerTheatersPage() {
  return (
    <div>
      <Header page='owner/theaters/'/>
      <Theaters/>
    </div>
  )
}

export default OwnerTheatersPage
