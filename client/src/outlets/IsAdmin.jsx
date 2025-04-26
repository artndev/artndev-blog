import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAdminContext } from '../contexts/Admin.jsx'

function IsAdmin() {
  const { admin } = useAdminContext()

  return <>{admin ? <Outlet /> : <Navigate to="/articles" />}</>
}

export default IsAdmin
