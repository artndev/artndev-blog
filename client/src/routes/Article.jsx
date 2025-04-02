import "../styles/css/Article.css";
import React, { useContext, useEffect, useRef, useState } from 'react'
import ArticleFront from '../components/ArticleFront.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../axios.js";
import AdminContext from "../contexts/Admin.jsx";
import AuthContext from '../contexts/Auth.jsx';
import heart from "../imgs/heart.svg"
import bookmark from "../imgs/bookmark.svg"
import pen from "../imgs/pen.svg"
import bin from "../imgs/bin.svg"
import Button from "../components/Button.jsx";


function Article() {
    const navigator = useNavigate()
    const { auth } = useContext(AuthContext)
    const { admin } = useContext(AdminContext)
    const { article_id } = useParams()
    const [data, setData] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    // article data
    useEffect(() => {
      axios
          .get(`/articles/${article_id}`)
          .then((response) => {
              setData(response.data.answer)
          })
          .catch((err) => {
              console.log(err)

              //alert(err.response.data.message)
          })
    }, [article_id, isLiked])

    const deleteArticle = () => {
        axios
            .delete(`/articles/${article_id}/delete`)
            .then(() => navigator("/articles"))
            .catch((err) => {
                console.log(err)

                //alert(err.response.data.message)
            })
    }

    // likes or dislikes
    useEffect(() => {
        axios
            .get(`/likes/${article_id}/state`)
            .then((response) => {
                setIsLiked(response.data.answer)
            })
            .catch((err) => {
                console.log(err)

                //alert(err.response.data.message)
            })
    }, [article_id])

    // useEffect(() => {
    //     if (!likeBtn)
    //         return

    //     setTimeout(() => {

    //     }, 1000)
    //     console.log(likeBtn, isLiked)
    //     if (isLiked)
    //         likeBtn.current.classList.add("pressed")
    //     else
    //         likeBtn.current.classList.remove("pressed")
    // }, [isLiked])

    const likeArticle = () => {
        if (isLiked)
            return

        axios
            .post(`/likes/${article_id}/like`)
            .then(() => {
                setIsLiked(true)
            })
            .catch((err) => {
                console.log(err)
  
                //alert(err.response.data.message)
            })
    }

    const dislikeArticle = () => {
        if (!isLiked)
            return

        axios
            .post(`/likes/${article_id}/dislike`)
            .then(() => {
                setIsLiked(false)
            })
            .catch((err) => {
                console.log(err)
  
                //alert(err.response.data.message)
            })       
    }

    // saves
    useEffect(() => {
        axios
            .get(`/saves/${article_id}/state`)
            .then((response) => {
                setIsSaved(response.data.answer)
            })
            .catch((err) => {
                console.log(err)

                //alert(err.response.data.message)
            })
    }, [article_id])

    const saveArticle = () => {
        if (isSaved)
            return

        axios
            .post(`/saves/${article_id}/save`)
            .then(() => {
                setIsSaved(true)
            })
            .catch((err) => {
                console.log(err)

                //alert(err.response.data.message)
            })
    }

    const unsaveArticle = () => {
        if (!isSaved)
            return

        axios
            .post(`/saves/${article_id}/unsave`)
            .then(() => {
                setIsSaved(false)
            })
            .catch((err) => {
                console.log(err)

                //alert(err.response.data.message)
            })
    }
  
    // useEffect(() => {
    //   console.log(data)
    // }, [data])
  
    return (
      <>
        {
            data
            ? <div className="article__container f-md">
                <div className="article">
                    <ArticleFront
                        title={data.Title}
                        subtitle={(new Date(data.Updated)).toLocaleDateString().replaceAll(".", "/")} 
                        text={data.Text}
                    />
                    <div className="article__btns">
                        <div className="article__btns-group">
                            <Button 
                                width={35}
                                height={35}
                                className={`static invert ${isLiked ? " pressed" : ""}`}
                                onClick={() => {
                                    if (!auth)
                                    {
                                        navigator("/login")
                                        return
                                    }

                                    if (isLiked)
                                    {
                                        dislikeArticle()
                                        return
                                    }
    
                                    likeArticle()
                                }}
                                content={
                                    <img src={heart} alt="Like" />
                                }
                            />
                            <div>
                                { Intl.NumberFormat('en', { notation: 'compact' }).format(data.Likes) }
                            </div>
                        </div>
                        <Button 
                            width={35}
                            height={35}
                            className={`static invert ${isSaved ? " pressed" : ""}`}
                            onClick={() => {
                                if (!auth)
                                {
                                    navigator("/login")
                                    return
                                }

                                if (isSaved)
                                {
                                    unsaveArticle()
                                    return
                                }
    
                                saveArticle()
                            }}
                            content={
                                <img src={bookmark} alt="Like" />
                            }
                        />
                        {
                            admin
                            ? <>
                                <Button 
                                    width={35}
                                    height={35}
                                    className={"static invert"}
                                    onClick={() => navigator(`/articles/${article_id}/update`)}
                                    content={
                                        <img src={pen} alt="Update" />
                                    }
                                />
                                <Button 
                                    width={35}
                                    height={35}
                                    className={"static invert"}
                                    onClick={() => deleteArticle()}
                                    content={
                                        <img src={bin} alt="Delete" />
                                    }
                                />
                            </>
                            : ""
                        }
                    </div>
                </div>
            </div>
            : "Loading..."
        }
      </>
    )
}

export default Article