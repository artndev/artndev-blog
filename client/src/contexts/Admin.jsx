import React, { createContext, useState, useContext, useEffect } from 'react'
import { useAuthContext } from './Auth.jsx'

const AdminContext = createContext({})
export const useAdminContext = () => useContext(AdminContext)

export const AdminProvider = ({ children }) => {
  const { userData } = useAuthContext()
  const [admin, setAdmin] = useState(userData?.is_admin)

  useEffect(() => {
    setAdmin(userData?.is_admin)
  }, [userData])

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminContext
