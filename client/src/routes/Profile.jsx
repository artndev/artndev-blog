import "../styles/css/Profile.css";
import React, { useContext, useEffect, useState } from 'react'
import ArticleBack from '../components/ArticleBack.jsx'
import axios from "../axios.js"
import AuthContext from '../contexts/Auth.jsx'
import { Link, useNavigate } from 'react-router-dom'
import config from "../config.json"
import AdminContext from "../contexts/Admin.jsx";
import exit from "../imgs/exit.svg"


function Profile() {
    const navigator = useNavigate()  
    const { admin, setAdmin } = useContext(AdminContext)
    const { auth, setAuth } = useContext(AuthContext)
    const [data, setData] = useState(null)

    const logout = (e) => {
        e.preventDefault()
    
        axios
            .post("/users/logout")
            .then(() => navigator("/articles"))
            .then(() => {
                setTimeout(() => {
                    setAuth(null)
                    setAdmin(null)
                }, 4)
            })
            .catch((err) => {
                console.log(err)
    
                //alert(err.response.data.message)
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

                //alert(err.response.data.message)
            })
    }, [])

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    return (
        <>
            <div className="profile__container">
                <div className="profile__subcontainer">
                    <div className="profile__group">
                        <div className="profile__info">
                            You are logged as <strong>@{ auth?.username }</strong> ({
                                admin 
                                ? <span id="admin">
                                    admin
                                </span> 
                                : <span id="user">
                                    user
                                </span>
                            })
                        </div>
                        <form 
                            className="profile__form" 
                            method="post" 
                            onSubmit={logout}
                        >
                            <button type="submit" className="profile__form-btn">
                                <img src={exit} alt="Logout" />
                            </button>
                        </form>
                    </div>
                    <div className="profile__articles-container">
                        {
                            data && data.length > 0
                            ? data.map((val, i) => {
                                return <Link
                                    key={i}
                                    to={`/articles/${val.Id}`}
                                    className="a-reset"
                                >
                                    <ArticleBack data={val} />
                                </Link>
                            })
                            : "You have not saved any articles yet..."
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile