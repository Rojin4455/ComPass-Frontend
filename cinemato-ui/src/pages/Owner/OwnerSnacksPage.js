import React from 'react'
import Header from '../../components/Theater/Header/Header'
import AddSnacks from '../../components/Theater/Snacks/AddSnacks'

function OwnerSnacksPage() {
  return (
    <div>
      <Header page='owner/snacks-list/'/>
        <AddSnacks/>
    </div>
  )
}

export default OwnerSnacksPage
