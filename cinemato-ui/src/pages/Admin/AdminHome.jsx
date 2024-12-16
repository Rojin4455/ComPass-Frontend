import React from 'react'
import Header from '../../components/Admin/Header/Header'
import AdminDashboard from '../../components/Admin/Dashboard/AdminDashboard'

function AdminHome() {
  return (
    <div>
      <Header page="admin/home/"/>
        <AdminDashboard/>
      
    </div>
  )
}

export default AdminHome
