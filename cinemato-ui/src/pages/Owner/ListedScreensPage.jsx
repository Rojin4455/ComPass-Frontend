import React from 'react'
import ListScreens from '../../components/Theater/Screens/AddScreens'
import Header from '../../components/Theater/Header/Header'

function ListedScreensPage() {
  return (
    <div>
      <Header page='owner/theaters/' />
      <ListScreens/>
    </div>
  )
}

export default ListedScreensPage