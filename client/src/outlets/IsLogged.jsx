import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../contexts/Auth.jsx'

function IsLogged() {
  const { refreshToken } = useContext(AuthContext)

  // useEffect(() => {
  //   console.log(refreshToken)
  // }, [refreshToken])

  return <>{refreshToken ? <Outlet /> : <Navigate to="/login" />}</>
}

export default IsLogged
