import React, { useContext, useState } from 'react'
import AuthForm from '../components/AuthForm.jsx'
import axios from "../axios.js"
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/Auth.jsx'


function LoginForm() {
  const { setAuth } = useContext(AuthContext)
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
              console.log(response.data.answer)
              setAuth(response.data.answer)
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