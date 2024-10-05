import React from 'react'
import Header from '../../components/Admin/Header/Header'
import RequestedOwnersList from '../../components/Admin/ThraterOwners/RequestedOwnersList'
function RequestedOwnersPage() {
  return (
    <div>
      <Header page="admin/theaters/"/>
      <div className='pt-20'>
        <RequestedOwnersList/>
        </div>
    </div>
  )
}

export default RequestedOwnersPage
