import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import AuthForm from '../components/AuthForm'
import AdminContext from '../contexts/Admin'
import AuthContext from '../contexts/Auth'

const RegisterForm = () => {
  const navigator = useNavigate()
  const { setCookie, setRefreshToken, setAccessToken, setUserData } =
    useContext(AuthContext)
  const { setAdmin } = useContext(AdminContext)
  const [err, setErr] = React.useState<IAxiosErrorResponse>(undefined)

  const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    console.log(formData)

    let data: Record<string, FormDataEntryValue> = {}
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
