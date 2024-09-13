import React from 'react'
import Header from '../../components/Admin/Header/Header'
import AdminDashboard from '../../components/Admin/Dashboard/AdminDashboard'

function AdminHome() {
  return (
    <div>
      <Header page="admin/home/"/>
      <div className='pt-20'>
      <p>Hello Home</p>
        <AdminDashboard/>
        </div>
      
    </div>
  )
}

export default AdminHome
