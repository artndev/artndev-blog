import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import AuthForm from '../components/AuthForm'
import AdminContext from '../contexts/Admin'
import AuthContext from '../contexts/Auth'
import ErrorHandler from '../components/ErrorHandler'

const LoginForm = () => {
  const navigator = useNavigate()
  const { setCookie, setRefreshToken, setAccessToken, setUserData } =
    useContext(AuthContext)
  const { setAdmin } = useContext(AdminContext)
  const [err, setErr] = useState<IAxiosErrorResponse>(undefined)

  const submitCredentials = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    let data: Record<string, FormDataEntryValue> = {}
    formData.forEach((val, key) => (data[key] = val))

    axios
      .post('/users/login', {
        username: data.username,
        password: data.password,
      })
      .then(response => {
        navigator('/articles')

        return response
      })
      .then(response => {
        setTimeout(() => {
          const { user, refresh_token, access_token } = response.data.answer

          setCookie('refresh_token', refresh_token, {
            secure: true,
            sameSite: 'none',
            maxAge: 86400,
          })
          setRefreshToken(refresh_token)
          setAccessToken(access_token)
          setUserData(user)
          setAdmin(user.is_admin)
        }, 4)
      })
      .catch(err => {
        console.log(err)

        setErr(err.response)
      })
  }

  return (
    <>
      {!err ? (
        <AuthForm
          formTitle="Login."
          err={err}
          onSubmit={submitCredentials}
          btnLink={'/register'}
          btnText={'I want to register'}
        />
      ) : (
        <ErrorHandler err={err} />
      )}
    </>
  )
}

export default LoginForm
