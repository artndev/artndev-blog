import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../axios'
import ArticleBack from '../components/ArticleBack'
import Button from '../components/Button'
import ErrorHandler from '../components/ErrorHandler'
import config from '../config.json'
import '../styles/css/Articles.css'

const sliceArray = (arr: IArticlesData, n: number) => {
  let ans: (IArticlesDataItem | undefined)[][] = [[undefined]]
  let dict: IArticlesData = []

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

const Articles = () => {
  const [data, setData] = useState<
    (IArticlesDataItem | undefined)[][] | undefined
  >(undefined)
  const [pages, setPages] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [err, setErr] = useState<IAxiosErrorResponse>(undefined)

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

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  return (
    <>
      <div className="articles__container f-md">
        {data && pages > 0 && !err ? (
          <div className="articles__subcontainer">
            <div className="articles">
              {data[page]!.map((val, i) => {
                return (
                  <Link key={i} to={`/articles/${val!.Id}`}>
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
                      isInverted={true}
                      isStatic={true}
                      isPressed={page === i + 1}
                      onClick={() => setPage(i + 1)}
                      width={35}
                      height={35}
                      type={'submit'}
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
