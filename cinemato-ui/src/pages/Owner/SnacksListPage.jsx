import React from 'react'
import Header from '../../components/Theater/Header/Header'
import SnacksList from '../../components/Theater/Snacks/SnacksList'

function SnacksListPage() {
  return (
    <div>
      <Header page='owner/snacks-list/'/>
        <SnacksList/>
    </div>
    )
}

export default SnacksListPage