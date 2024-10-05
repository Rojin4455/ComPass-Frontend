import React from 'react'
import Header from '../../components/Admin/Header/Header'
import OwnerDetails from '../../components/Admin/ThraterOwners/OwnerDetails'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function OwnerDetailsPage() {
  return (
    <div>
      <Header page="admin/theaters/"/>
      <div className='pt-20'>
        <OwnerDetails/>
        </div>
    </div>
  )
}

export default OwnerDetailsPage
