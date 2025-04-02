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
        {
            data
            ? <div className="articles__container f-md">
                <div className="articles">
                    {
                        data
                        ? data.map((val, i) => {
                            return <Link 
                                key={i} 
                                to={`/articles/${val.Id}`}
                            >
                                <ArticleBack data={val} />
                            </Link>
                        })
                        : "Loading..."
                    }
                </div>
            </div> 
            : "Loading..."
        }
    </>
  )
}

export default Articles