import React from 'react'
import TheaterAddSnacks from '../../components/Theater/Snacks/TheaterAddSnacks'
import Header from '../../components/Theater/Header/Header'
import SnacksList from '../../components/Theater/Snacks/SnacksList'

function AddTheaterSnacksPage() {
  return (
    <>
    <Header page='owner/theaters/'/>
    <SnacksList/>
    </>
  )
}

export default AddTheaterSnacksPage