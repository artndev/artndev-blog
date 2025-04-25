import { createContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from '../axios'

const AuthContext = createContext({})
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([]) // auto-decoded
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(cookies?.refresh_token)
  const [userData, setUserData] = useState(cookies?.user_data)

  useEffect(() => {
    if (!refreshToken) return
    if (accessToken) return

    axios
      .get(`/users/refresh`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      .then(response => {
        const { user, access_token } = response.data.answer

        setAccessToken(access_token)
        setUserData(user)
      })
      .catch(err => {
        console.log(err)
      })
  }, [refreshToken, accessToken])

  useEffect(() => {
    console.log(refreshToken, accessToken)
  }, [refreshToken, accessToken])

  return (
    <AuthContext.Provider
      value={{
        setCookie,
        removeCookie,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
