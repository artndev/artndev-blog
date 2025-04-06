import React, { useContext, useState } from 'react'
import AuthForm from '../components/AuthForm.jsx'
import axios from '../axios.js'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/Auth.jsx'
import AdminContext from '../contexts/Admin.jsx'
import config from '../config.json'
import {} from 'react-cookie'

function LoginForm() {
  const navigator = useNavigate()
  const { setCookies, setToken, setUserData } = useContext(AuthContext)
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
          const { token, ...userData } = response.data.answer
          // console.log(token, userData)

          setCookies('user_data', userData, config.COOKIES_OPTIONS)
          setCookies('token', token, config.COOKIES_OPTIONS)
          setUserData(userData)
          setToken(token)
          setAdmin(userData.is_admin)
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
