import { createContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import jwt from 'jsonwebtoken'

const AuthContext = createContext({})
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([]) // auto-decoded
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(cookies?.refresh_token)
  const [userData, setUserData] = useState(cookies?.user_data)

  useEffect(() => {
    // console.log(process.env)
  }, [])

  useEffect(() => {
    try {
      jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET_KEY)
    } catch (err) {}
  }, [accessToken, refreshToken])

  return (
    <AuthContext.Provider
      value={{
        setCookie,
        removeCookie,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
