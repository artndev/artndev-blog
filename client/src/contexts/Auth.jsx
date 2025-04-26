import { createContext, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from '../axios'
import config from '../config.json'

const AuthContext = createContext({})
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['refresh_token'])
  const [refreshToken, setRefreshToken] = useState(cookies?.refresh_token)
  const [accessToken, setAccessToken] = useState(null)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`/users/test`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .catch(err => {
          console.log(err)

          if (config.ACCEPTED_ERR_CODES.includes(err.response.status))
            setAccessToken(null)
        })
    }, 30000)

    return () => clearInterval(interval)
  }, [accessToken])

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

  // useEffect(() => {
  //   console.log('ACCESS_TOKEN: ', accessToken)
  // }, [accessToken])

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

export const useAuthContext = () => useContext(AuthContext)

export default AuthContext

// import React, { useContext, createContext, FC, useState } from 'react'
//import { getTokenManager } from './../tokenManager'

// type AccessTokenContext = [string, React.Dispatch<React.SetStateAction<string>>]

// const AccessTokenProvider: FC = (props) => {
//     const [accessToken, setAccessToken] = useState<string>(null)
//     return <AccessToken.Provider value={[accessToken, setAccessToken]} {...props} />
// }

// const AccessToken = createContext<AccessTokenContext>(null)

// const useAccessToken = (): AccessTokenContext => useContext<AccessTokenContext>(AccessToken)

// export { AccessTokenProvider, useAccessToken }
