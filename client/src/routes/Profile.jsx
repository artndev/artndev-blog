import "../styles/css/Profile.css";
import React, { useContext, useEffect, useState } from 'react'
import ArticleBack from '../components/ArticleBack.jsx'
import axios from "../axios.js"
import AuthContext from '../contexts/Auth.jsx'
import { Link, useNavigate } from 'react-router-dom'
import AdminContext from "../contexts/Admin.jsx";
import exit from "../imgs/exit.svg"
import Button from "../components/Button.jsx";
import ErrorHandler from "../components/ErrorHandler.jsx";


function Profile() {
    const navigator = useNavigate()  
    const { admin, setAdmin } = useContext(AdminContext)
    const { auth, setAuth } = useContext(AuthContext)
    const [data, setData] = useState(null)
    const [err, setErr] = useState(null)

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
    
                setErr(err.response)
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

                setErr(err.response)
            })
    }, [])

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    return (
            <div className="profile__container f-md">
                {
                    data
                    ? <div className="profile">
                        <div className="profile__group">
                            <div className="profile__info">
                                You are logged as <span className="bold">@{ auth.username }</span> ({
                                    admin 
                                    ? <span id="red">
                                        admin
                                    </span> 
                                    : <span id="blue">
                                        user
                                    </span>
                                })
                            </div>
                            <form 
                                className="profile__form" 
                                method="post" 
                                onSubmit={logout}
                            >
                                <Button 
                                    width={35}
                                    height={35}
                                    className={"static invert"}
                                    type={"submit"}
                                    content={
                                        <img src={exit} alt="Logout" />
                                    }
                                />
                            </form>
                        </div>
                        {
                            data.length > 0
                            ? <div className="profile__articles">
                                {
                                    data.map((val, i) => {
                                        return <Link
                                            key={i}
                                            to={`/articles/${val.Id}`}
                                        >
                                            <ArticleBack data={val} />
                                        </Link>
                                    })
                                }
                            </div>
                            : "You seem to like reading a lot. By the way, you have not saved any articles yet..."

                        }
                    </div> 
                    : <ErrorHandler to={err} />
                }
            </div>
    )
}

export default Profile