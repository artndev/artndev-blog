import "../styles/css/Articles.css";
import React, { useContext, useEffect, useState } from 'react'
import ArticleBack from '../components/ArticleBack.jsx'
import axios from "../axios.js"
import AuthContext from '../contexts/Auth.jsx'
import { useNavigate } from 'react-router-dom'


function Profile() {
    const navigator = useNavigate() 
    const { auth } = useContext(AuthContext)
    const [data, setData] = useState([])
    const [err, setErr] = useState(null)

    const logout = (e) => {
        e.preventDefault()
    
        axios
            .post("/users/logout")
            .then(() => navigator("/"))
            .catch((err) => {
                console.log(err)
    
                setErr(err.response.data.message)
            })
    }

    useEffect(() => {
        axios
            .get("/saves")
            .then((response) => {
                setData(response.data.answer)
            })
            .catch((err) => {
                console.log(err)

                setErr(err.response.data.message)
            })
    }, [])

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    return (
        <>
            <div className="profile__container">
                <div className="profile__container-group">
                    <span>
                        {
                            auth 
                            ? auth.username 
                            : "Unknown"
                        }
                    </span>
                    <form className="profile__form" method="post" onSubmit={logout}>
                        <button type="submit" className="profile__form-btn">
                            Logout
                        </button>
                    </form>
                </div>
                <div className="articles__container">
                    {
                        data.length > 0
                        ? data.map((val, i) => {
                            return <ArticleBack
                                key={i} 
                                title={val.Title}
                                text={val.Text}
                                updated={(new Date(val.Updated)).toLocaleDateString().replaceAll(".", "/")} 
                            />
                        })
                        : (err || "There are no articles left")
                    }
                </div>
            </div>
        </>
    )
}

export default Profile