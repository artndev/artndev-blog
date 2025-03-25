import React from 'react'
import AuthForm from '../components/AuthForm.jsx'
import axios from "../axios.js"
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const navigator = useNavigate() 

  const submitCredentials = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    console.log(formData)

    let data = {}
    formData.forEach((val, key) => data[key] = val)

    axios
        .post("/users/login", {
            data: {
                username: data.username,
                password: data.password
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((response) => {
            console.log(response)
            
            localStorage.setItem("auth", JSON.stringify(response.data.answer))
            navigator("/")
        })
        .catch((err) => {
            console.log(err)
        })
  }

  return (
    <>
        <div className="auth__form-container">
            <AuthForm title="Login" onSubmit={submitCredentials} />
        </div>
    </>
  )
}

export default LoginForm