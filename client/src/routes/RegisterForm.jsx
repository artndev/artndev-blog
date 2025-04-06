import React, { useContext } from 'react'
import AuthForm from '../components/AuthForm.jsx'
import axios from '../axios.js'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/Auth.jsx'
import AdminContext from '../contexts/Admin.jsx'
import config from '../config.json'

function RegisterForm() {
  const navigator = useNavigate()
  const { setCookie, setToken, setUserData } = useContext(AuthContext)
  const { setAdmin } = useContext(AdminContext)
  const [err, setErr] = React.useState(null)

  const registerUser = e => {
    e.preventDefault()

    const formData = new FormData(e.target)
    console.log(formData)

    let data = {}
    formData.forEach((val, key) => (data[key] = val))

    axios
      .post('/users/register', {
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

          setCookie('user_data', userData, config.COOKIES_OPTIONS)
          setCookie('token', token, config.COOKIES_OPTIONS)
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
      formTitle="Register."
      err={err}
      onSubmit={registerUser}
      btnLink={'/login'}
      btnText={'I want to login'}
    />
  )
}

export default RegisterForm
