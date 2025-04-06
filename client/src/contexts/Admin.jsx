import React, { createContext, useState, useContext, useEffect } from 'react'
import AuthContext from './Auth.jsx'

const AdminContext = createContext({})
export const AdminProvider = ({ children }) => {
  const { userData } = useContext(AuthContext)
  const [admin, setAdmin] = useState(userData?.is_admin)

  // useEffect(() => {
  //   console.log(admin)
  // }, [admin])

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminContext
