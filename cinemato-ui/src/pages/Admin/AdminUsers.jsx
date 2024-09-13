import React from 'react'
import Header from '../../components/Admin/Header/Header'
import AdminUsersList from '../../components/Admin/AdminUsersList/AdminUsersList'

function AdminUsers() {
  return (
    <div>
      <Header page="admin/users/"/>
      <div className='pt-20'>
        <AdminUsersList/>
        </div>
      
    </div>
  )
}

export default AdminUsers
