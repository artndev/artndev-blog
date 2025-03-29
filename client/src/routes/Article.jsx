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
            .then(() => navigator("/"))
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

    // utils
    const formatNumber = (number) => {
        return Intl.NumberFormat('en', { notation: 'compact' }).format(number)
    }
  
    // useEffect(() => {
    //   console.log(data)
    // }, [data])
  
    return (
      <>
        {
            data
            ? <div className="article__container">
                <div className="article__subcontainer">
                    <ArticleFront
                        title={data.Title}
                        subtitle={(new Date(data.Updated)).toLocaleDateString().replaceAll(".", "/")} 
                        text={data.Text}
                    />
                    <div className="btns__container">
                        <div className="btn__groupss">
                            <button 
                                className={isLiked ? "pressed" : ""}
                                type="button" 
                                onClick={(e) => {
                                    if (!auth)
                                    {
                                        navigator("/login")
                                        return
                                    }

                                    return !isLiked ? likeArticle() : dislikeArticle()
                                }}
                            >
                                <img src={heart} alt="Like" />
                            </button>
                            <div className="likes">
                                { formatNumber(data.Likes) }
                            </div>
                        </div>
                        <button 
                            className={isSaved ? "pressed" : ""}
                            type="button" 
                            onClick={() => {
                                if (!auth)
                                {
                                    navigator("/login")
                                    return
                                }

                                return !isSaved ? saveArticle() : unsaveArticle()
                            }}
                        >
                            <img src={bookmark} alt="Save" />
                        </button>
                        {
                            admin
                            ? <>
                                <button type="button" onClick={() => navigator(`/articles/${article_id}/update`)}>
                                    <img src={pen} alt="Update" />
                                </button>
                                <button type="button" onClick={() => deleteArticle()}>
                                    <img src={bin} alt="Delete" />
                                </button>
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