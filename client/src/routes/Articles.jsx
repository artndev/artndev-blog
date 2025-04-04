import '../styles/css/Articles.css'
import ArticleBack from '../components/ArticleBack.jsx'
import React, { useEffect, useState } from 'react'
import axios from '../axios.js'
import { Link, Navigate } from 'react-router-dom'
import config from '../config.json'
import Button from '../components/Button.jsx'
import ErrorHandler from '../components/ErrorHandler.jsx'

const sliceArray = (arr, n) => {
  let ans = [null]
  let dict = []

  arr.forEach(val => {
    dict.push(val)

    if (dict.length === n) {
      ans.push(dict)
      dict = []
    }
  })

  if (dict.length > 0) ans.push(dict)

  return ans
}

function Articles() {
  const [data, setData] = useState([])
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(1)
  const [err, setErr] = useState(null)

  useEffect(() => {
    axios
      .get('/articles')
      .then(response => {
        const ans = sliceArray(
          response.data.answer,
          config.MAX_ARTICLES_PER_PAGE
        )

        setPages(ans.length - 1)
        setData(ans)
      })
      .catch(err => {
        console.log(err)

        setErr(err.response)
      })
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <div className="articles__container f-md">
        {data && pages > 0 ? (
          <div className="articles__subcontainer">
            <div className="articles">
              {data[page].map((val, i) => {
                return (
                  <Link key={i} to={`/articles/${val.Id}`}>
                    <ArticleBack data={val} />
                  </Link>
                )
              })}
            </div>
            <div className="articles__btns">
              {[...Array(pages)].map((_, i) => {
                return (
                  <div key={i}>
                    <Button
                      width={35}
                      height={35}
                      className={`static invert${page === i + 1 ? ' pressed bold' : ''}`}
                      type={'submit'}
                      onClick={() => setPage(i + 1)}
                      content={i + 1}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <ErrorHandler err={err} />
        )}
      </div>
    </>
  )
}

export default Articles
