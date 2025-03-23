import React, { useEffect, useState } from 'react'
import ArticleFront from '../components/ArticleFront.jsx'
import { useParams } from 'react-router-dom'
import axios from "../axios.js";


function Article() {
    const { article_id } = useParams()
    const [data, setData] = useState(null)
    const [err, setErr] = useState(null)

    useEffect(() => {
      axios.get(`/articles/${article_id}`)
          .then((response) => {
              setData(response.data.answer)
          })
          .catch((err) => {
              console.log(err)

              setErr(err.response.data.message)
          })
    }, [article_id])
  
    // useEffect(() => {
    //   console.log(data)
    // }, [data])
  
    return (
      <>
          <div className="article__container">
              {
                  data
                  ? <ArticleFront
                    title={data.Title}
                    text={data.Text}
                    updated={(new Date(data.Updated)).toLocaleDateString().replaceAll(".", "/")} 
                  />
                  : (err || "Message is not provided")
              }
          </div>
      </>
    )
}

export default Article