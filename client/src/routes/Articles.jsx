import "../css/Articles.css";
import ArticleBack from "../components/ArticleBack.jsx";
import React, { useEffect, useState } from 'react'
import axios from "../axios.js";


function Articles() {
  const [data, setData] = useState(null)
  const [err, setErr] = useState(null)

  useEffect(() => {
    axios.get("/articles")
        .then((response) => {
            setData(response.data.answer)
        })
        .catch((err) => {
            console.log(err)

            setErr(err.response.data.message)
        })
  }, [])

//   useEffect(() => {
//     console.log(data)
//   }, [data])

  return (
    <>
        <div className="articles__container">
            {
                data
                ? data.map((val, i) => {
                    return <ArticleBack
                        key={i} 
                        title={val.Title}
                        text={val.Text}
                        updated={(new Date(val.Updated)).toLocaleDateString().replaceAll(".", "/")} 
                    />
                })
                : (err || "Message is not provided")
            }
        </div>
    </>
  )
}

export default Articles