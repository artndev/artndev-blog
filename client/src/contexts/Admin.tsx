import React, { createContext, useState, useContext, useEffect } from 'react'
import { useAuthContext } from './Auth.js'

const AdminContext = createContext<IAdminContext>({} as IAdminContext)
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userData } = useAuthContext()
  const [admin, setAdmin] = useState<boolean | undefined>(userData?.is_admin)

  useEffect(() => {
    setAdmin(userData?.is_admin)
  }, [userData])

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = () => useContext(AdminContext)

export default AdminContext
