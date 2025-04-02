import "../styles/css/Articles.css";
import ArticleBack from "../components/ArticleBack.jsx";
import React, { useEffect, useState } from 'react'
import axios from "../axios.js";
import { Link } from "react-router-dom";
import config from "../config.json"
import Button from "../components/Button.jsx";


const divideArray = (arr, n) => {
    let ans = [null]
    let dict = []

    arr.forEach((val) => {
        dict.push(val)

        if (dict.length === n) {
            ans.push(dict)
            dict = []
        }
    })

    if (dict.length > 0)
        ans.push(dict)

    return ans
}

function Articles() {
  const [data, setData] = useState(null)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)

  useEffect(() => {
    axios
        .get("/articles")
        .then((response) => {
            const ans = divideArray(response.data.answer, config.MAX_ARTICLES_PER_PAGE)

            setPages(ans.length - 1)
            setData(ans)
        })
        .catch((err) => {
            console.log(err)

            //alert(err.response.data.message)
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
                <div className="articles__subcontainer">
                    <div className="articles">
                        {
                            data[page].map((val, i) => {
                                return <Link 
                                    key={i} 
                                    to={`/articles/${val.Id}`}
                                >
                                    <ArticleBack data={val} />
                                </Link>
                            })
                        }
                    </div>
                    <div className="articles__btns">
                            {
                                [...Array(pages)].map((_, i) => {
                                    return <div>
                                        <Button 
                                            width={35}
                                            height={35}
                                            className={`static invert${page === i + 1 ? " pressed bold" : ""}`}
                                            type={"submit"}
                                            onClick={() => setPage(i + 1)}
                                            content={i + 1}
                                        />
                                    </div>
                                })
                            }
                    </div>
                </div>
            </div> 
            : "Loading..."
        }
    </>
  )
}

export default Articles