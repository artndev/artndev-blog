import React, { useContext, useEffect, useState } from 'react'
import ArticleFront from '../components/ArticleFront.jsx'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from "../axios.js";
import AdminContext from "../contexts/Admin.jsx";
import AuthContext from '../contexts/Auth.jsx';


function Article() {
    const navigator = useNavigate()
    const { auth } = useContext(AuthContext)
    const { admin } = useContext(AdminContext)
    const { article_id } = useParams()
    const [data, setData] = useState(null)
    const [err, setErr] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    useEffect(() => {
      axios
          .get(`/articles/${article_id}`)
          .then((response) => {
              setData(response.data.answer)
          })
          .catch((err) => {
              console.log(err)

              setErr(err.response.data.message)
          })
    }, [article_id])

    useEffect(() => {
        axios
            .get(`/likes/${article_id}/state`)
            .then((response) => {
                setIsLiked(response.data.answer)
            })
            .catch((err) => {
                console.log(err)

                setErr(err.response.data.message)
            })
    }, [article_id])

    useEffect(() => {
        axios
            .get(`/saves/${article_id}/state`)
            .then((response) => {
                setIsSaved(response.data.answer)
            })
            .catch((err) => {
                console.log(err)

                setErr(err.response.data.message)
            })
    }, [article_id])

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
  
                setErr(err.response.data.message)
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
  
                setErr(err.response.data.message)
            })       
    }

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

                setErr(err.response.data.message)
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

                setErr(err.response.data.message)
            })
    }

    const deleteArticle = () => {
        axios
            .delete(`/articles/${article_id}/delete`)
            .then(() => navigator("/"))
            .catch((err) => {
                console.log(err)

                setErr(err.response.data.message)
            })
    }
  
    // useEffect(() => {
    //   console.log(data)
    // }, [data])
  
    return (
      <>
        {
            data
            ? <div className="article-front__container">
                <div className="article__container">
                    <ArticleFront
                        title={data.Title}
                        text={data.Text}
                        updated={(new Date(data.Updated)).toLocaleDateString().replaceAll(".", "/")} 
                    />
                </div>
                <div className="btns__container">
                    <button type="button" onClick={() => {
                        if (!auth)
                        {
                            navigator("/login")
                            return
                        }

                        return !isLiked ? likeArticle() : dislikeArticle()
                    }}>
                        { !isLiked ? "Like" : "Dislike" }
                    </button>
                    <button type="button" onClick={() => {
                        if (!auth)
                        {
                            navigator("/login")
                            return
                        }

                        return !isSaved ? saveArticle() : unsaveArticle()
                    }}>
                        { !isSaved ? "Save" : "Unsave" }
                    </button>
                    {
                        admin
                        ? <>
                            <button type="button" onClick={() => navigator(`/articles/${article_id}/update`)}>
                                Update
                            </button>
                            <button type="button" onClick={() => deleteArticle()}>
                                Delete
                            </button>
                        </>
                        : ""
                    }
                </div>
            </div>
            : (err || "Message is not provided")
        }
      </>
    )
}

export default Article