import "../styles/css/Articles.css";
import ArticleBack from "../components/ArticleBack.jsx";
import React, { useEffect, useState } from 'react'
import axios from "../axios.js";
import { Link } from "react-router-dom";


function Articles() {
  const [data, setData] = useState([])
  const [err, setErr] = useState(null)

  useEffect(() => {
    axios
        .get("/articles")
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
                    return <Link 
                        key={i} 
                        className="a-reset"
                        to={`/articles/${val.Id}`}
                     >
                        <ArticleBack
                            title={val.Title}
                            text={val.Text}
                            updated={(new Date(val.Updated)).toLocaleDateString().replaceAll(".", "/")} 
                        />
                    </Link>
                })
                : (err || "There are no articles left")
            }
        </div>
    </>
  )
}

export default Articles