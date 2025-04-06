import React, { createContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const AuthContext = createContext({})
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([]) // auto-decoded
  const [token, setToken] = useState(cookies?.token)
  const [userData, setUserData] = useState(cookies?.user_data)

  return (
    <AuthContext.Provider
      value={{
        setCookie,
        removeCookie,
        token,
        setToken,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
