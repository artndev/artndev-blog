import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../contexts/Auth.jsx'


function IsNotLogged() {
  const { auth } = useContext(AuthContext)

  console.log(auth)
  return (
    <>
      {
        !auth
        ? <Outlet />
        : <Navigate to="/" />
      }
    </>
  )
}

export default IsNotLogged