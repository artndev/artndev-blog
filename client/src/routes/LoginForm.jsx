import React, { useContext, useState } from 'react'
import AuthForm from '../components/AuthForm.jsx'
import axios from '../axios.js'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/Auth.jsx'
import AdminContext from '../contexts/Admin.jsx'
import config from '../config.json'

function LoginForm() {
  const navigator = useNavigate()
  const { setCookie, setRefreshToken, setAccessToken, setUserData } =
    useContext(AuthContext)
  const { setAdmin } = useContext(AdminContext)
  const [err, setErr] = useState(null)

  const submitCredentials = e => {
    e.preventDefault()

    const formData = new FormData(e.target)
    console.log(formData)

    let data = {}
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

          console.log(user, refresh_token, access_token)
          setCookie('refresh_token', refresh_token.value, {
            secure: true,
            sameSite: 'none',
            maxAge: 86400,
          })
          setRefreshToken(refresh_token.value)
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
    <AuthForm
      formTitle="Login."
      err={err}
      onSubmit={submitCredentials}
      btnLink={'/register'}
      btnText={'I want to register'}
    />
  )
}

export default LoginForm
