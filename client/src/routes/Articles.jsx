import "../styles/css/Articles.css";
import ArticleBack from "../components/ArticleBack.jsx";
import React, { useEffect, useState } from 'react'
import axios from "../axios.js";
import { Link } from "react-router-dom";
import config from "../config.json"


function Articles() {
  const [data, setData] = useState([])

  useEffect(() => {
    console.log(config.TEXT_MAXSYMBOLS, config.TITLE_MAXSYMBOLS)
    axios
        .get("/articles")
        .then((response) => {
            setData(response.data.answer)
        })
        .catch((err) => {
            console.log(err)

            alert(err.response.data.message)
        })
  }, [])

//   useEffect(() => {
//     console.log(data)
//   }, [data])

  return (
    <>
        <div className="articles__container">
            <div className="articles__subcontainer">
                {
                    data
                    ? data.map((val, i) => {
                        return <Link 
                            key={i} 
                            className="a-reset"
                            to={`/articles/${val.Id}`}
                        >
                            <ArticleBack
                                title={`${val.Title.substring(0, config.TITLE_MAXSYMBOLS).trim()}...`}
                                subtitle={(new Date(val.Updated)).toLocaleDateString().replaceAll(".", "/")} 
                                text={`${val.Text.substring(0, config.TEXT_MAXSYMBOLS).trim()}...`}
                            />
                        </Link>
                    })
                    : "Loading..."
                }
            </div>
        </div>
    </>
  )
}

export default Articles