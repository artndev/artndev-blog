import React, { useContext, useState } from 'react'
import AuthForm from '../components/AuthForm.jsx'
import axios from "../axios.js"
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/Auth.jsx'
import AdminContext from "../contexts/Admin.jsx";


function LoginForm() {
  const { setAuth } = useContext(AuthContext)
  const { setAdmin } = useContext(AdminContext)
  const navigator = useNavigate()
  const [err, setErr] = useState(null)

  const submitCredentials = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    console.log(formData)

    let data = {}
    formData.forEach((val, key) => data[key] = val)

    axios
        .post("/users/login", {
            username: data.username,
            password: data.password
        })
        .then((response) => {
          navigator("/articles")

          return response
        })
        .then((response) => {
          setTimeout(() => {
             setAuth(response.data.answer)
             setAdmin(response.data.answer.is_admin)
          }, 4)
        })
        .catch((err) => {
            console.log(err)

            setErr(err.response.data.message)
        })
  }

  return (
    <>
            <AuthForm 
                formTitle="Login" 
                err={err}
                onSubmit={submitCredentials} 
                btnLink={"/register"}
                btnText={"I want to register"}
            />
    </>
  )
}

export default LoginForm