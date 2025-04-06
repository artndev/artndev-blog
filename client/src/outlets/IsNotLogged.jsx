import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../contexts/Auth.jsx'

function IsNotLogged() {
  const { token } = useContext(AuthContext)

  // useEffect(() => {
  //   console.log(token)
  // }, [token])

  return <>{!token ? <Outlet /> : <Navigate to="/articles" />}</>
}

export default IsNotLogged
