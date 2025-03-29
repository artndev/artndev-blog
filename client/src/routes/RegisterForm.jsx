import React, { useContext } from "react";
import AuthForm from '../components/AuthForm.jsx'
import axios from "../axios.js"
import { useNavigate } from 'react-router-dom'
import AuthContext from "../contexts/Auth.jsx";


function RegisterForm() {
    const { setAuth } = useContext(AuthContext)
    const navigator = useNavigate() 
    const [err, setErr] = React.useState(null)
  
    const registerUser = (e) => {
      e.preventDefault()
  
      const formData = new FormData(e.target)
      console.log(formData)
  
      let data = {}
      formData.forEach((val, key) => data[key] = val)
  
      axios
          .post("/users/register", {
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
                formTitle="Register" 
                err={err}
                onSubmit={registerUser} 
                btnLink={"/login"}
                btnText={"I want to login"}
            />
        </>
    );
}

export default RegisterForm;