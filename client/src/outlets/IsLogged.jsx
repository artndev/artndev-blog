import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../contexts/Auth.jsx'

function IsLogged() {
  const { auth } = useContext(AuthContext)

  return <>{auth ? <Outlet /> : <Navigate to="/login" />}</>
}

export default IsLogged
