import React from 'react'
import Header from '../../components/Theater/Header/Header'
import AddTheaterForm from '../../components/Theater/Theaters/AddTheaterForm'

function OwnerAddTheaterPage() {
  return (
    <div>
      <Header page='owner/theaters/'/>
      <AddTheaterForm/>
    </div>
  )
}

export default OwnerAddTheaterPage
