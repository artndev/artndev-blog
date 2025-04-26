import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../contexts/Auth.jsx'

function IsLogged() {
  const { refreshToken } = useAuthContext()

  // useEffect(() => {
  //   console.log(refreshToken)
  // }, [refreshToken])

  return <>{refreshToken ? <Outlet /> : <Navigate to="/login" />}</>
}

export default IsLogged
