import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from '../axios'
import { store, setToken } from '../tokenManager'

const AuthContext = createContext({})
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'refresh_token',
    'user_data',
  ]) // auto-decoded
  const [accessToken, setAccessToken] = useState(store.token)
  const [refreshToken, setRefreshToken] = useState(cookies?.refresh_token)
  const [userData, setUserData] = useState(cookies?.user_data)

  // useEffect(() => {
  //   console.log(getTokenManager().getToken())
  //   getTokenManager().setToken(accessToken)
  //   console.log('AFTER: ', getTokenManager().getToken())
  // }, [accessToken])

  useEffect(() => {
    store.token = 'Lox'
  })

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

        setToken(access_token)
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
