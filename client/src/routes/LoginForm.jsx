import React, { useContext } from 'react'
import AuthForm from '../components/AuthForm.jsx'
import AuthContext from '../contexts/Auth.jsx'
import axios from "../axios.js"
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const navigator = useNavigate() 

  const submitCredentials = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    let data = {}
    formData.forEach((val, key) => data[key] = val)

    axios
        .post("/users/login", {
            username: data.username,
            password: data.password
        })
        .then((response) => {
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