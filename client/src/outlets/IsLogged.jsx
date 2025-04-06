import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../contexts/Auth.jsx'

function IsLogged() {
  const { token } = useContext(AuthContext)

  // useEffect(() => {
  //   console.log(token)
  // }, [token])

  return <>{token ? <Outlet /> : <Navigate to="/login" />}</>
}

export default IsLogged
