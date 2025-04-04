import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AdminContext from '../contexts/Admin.jsx'

function IsAdmin() {
  const { admin } = useContext(AdminContext)

  return <>{admin ? <Outlet /> : <Navigate to="/articles" />}</>
}

export default IsAdmin
