import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../axios'
import ArticleFront from '../components/ArticleFront'
import Button from '../components/Button'
import ErrorHandler from '../components/ErrorHandler'
import config from '../config.json'
import { useAdminContext } from '../contexts/Admin'
import { useAuthContext } from '../contexts/Auth'
import bin from '../imgs/bin.svg'
import bookmark from '../imgs/bookmark.svg'
import heart from '../imgs/heart.svg'
import pen from '../imgs/pen.svg'
import '../styles/css/Article.css'

const Article = () => {
  const navigator = useNavigate()
  const { refreshToken, accessToken, setAccessToken } = useAuthContext()
  const { admin } = useAdminContext()
  const { article_id } = useParams()
  const [data, setData] = useState<IArticleData | undefined>(undefined)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [err, setErr] = useState<IAxiosErrorResponse>(undefined)

  // GET / DELETE requests don't need blank curly brackets
  // ========= DATA =========
  useEffect(() => {
    axios
      .get(`/articles/${article_id}`)
      .then(response => {
        setData(response.data.answer)
      })
      .catch(err => {
        console.log(err)

        setErr(err.response)
      })
  }, [article_id, isLiked])

  const deleteArticle = () => {
    axios
      .delete(`/articles/${article_id}/delete`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => navigator('/articles'))
      .catch(err => {
        console.log(err)

        if (config.ACCEPTED_ERR_CODES.includes(err.response.status)) {
          setAccessToken(undefined)
          return
        }

        setErr(err.response)
      })
  }

  // ========= REACTIONS =========
  useEffect(() => {
    axios
      .get(`/likes/${article_id}/state`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        setIsLiked(response.data.answer)
      })
      .catch(err => {
        console.log(err)

        if (config.ACCEPTED_ERR_CODES.includes(err.response.status)) {
          setAccessToken(undefined)
          return
        }

        setErr(err.response)
      })
  }, [article_id, accessToken])

  const likeArticle = () => {
    if (isLiked) return

    axios
      .post(
        `/likes/${article_id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        setIsLiked(true)
      })
      .catch(err => {
        console.log(err)

        if (config.ACCEPTED_ERR_CODES.includes(err.response.status)) {
          setAccessToken(undefined)
          return
        }

        setErr(err.response)
      })
  }

  const dislikeArticle = () => {
    if (!isLiked) return

    axios
      .post(
        `/likes/${article_id}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        setIsLiked(false)
      })
      .catch(err => {
        console.log(err)

        if (config.ACCEPTED_ERR_CODES.includes(err.response.status)) {
          setAccessToken(undefined)
          return
        }

        setErr(err.response)
      })
  }

  // ========= SAVES =========
  useEffect(() => {
    axios
      .get(`/saves/${article_id}/state`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        setIsSaved(response.data.answer)
      })
      .catch(err => {
        console.log(err)

        if (config.ACCEPTED_ERR_CODES.includes(err.response.status)) {
          setAccessToken(undefined)
          return
        }

        setErr(err.response)
      })
  }, [article_id, accessToken])

  const saveArticle = () => {
    if (isSaved) return

    axios
      .post(
        `/saves/${article_id}/save`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        setIsSaved(true)
      })
      .catch(err => {
        console.log(err)

        if (config.ACCEPTED_ERR_CODES.includes(err.response.status)) {
          setAccessToken(undefined)
          return
        }

        setErr(err.response)
      })
  }

  const unsaveArticle = () => {
    if (!isSaved) return

    axios
      .post(
        `/saves/${article_id}/unsave`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        setIsSaved(false)
      })
      .catch(err => {
        console.log(err)

        if (config.ACCEPTED_ERR_CODES.includes(err.response.status)) {
          setAccessToken(undefined)
          return
        }

        setErr(err.response)
      })
  }

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  // useEffect(() => {
  //   console.log(err)
  // }, [err])

  // useEffect(() => {
  //   console.log(isLiked, isSaved)
  // }, [isLiked, isSaved])

  return (
    <div className="article__container f-md">
      {data ? (
        <div className="article">
          <ArticleFront
            title={data.Title}
            subtitle={new Date(data.Updated)
              .toLocaleDateString()
              .replaceAll('.', '/')}
            content={data.Content}
          />
          <div className="article__btns">
            <div className="article__btns-group">
              <Button
                isPressed={isLiked}
                isInverted={true}
                onClick={() => {
                  if (!refreshToken) {
                    navigator('/login')
                    return
                  }

                  if (isLiked) {
                    dislikeArticle()
                    return
                  }

                  likeArticle()
                }}
                width={35}
                height={35}
                content={<img src={heart} alt="Like" />}
              />
              <div>
                {Intl.NumberFormat('en', { notation: 'compact' }).format(
                  data.Likes
                )}
              </div>
            </div>
            <Button
              isPressed={isSaved}
              isInverted={true}
              onClick={() => {
                if (!refreshToken) {
                  navigator('/login')
                  return
                }

                if (isSaved) {
                  unsaveArticle()
                  return
                }

                saveArticle()
              }}
              width={35}
              height={35}
              content={<img src={bookmark} alt="Save" />}
            />
            {admin && (
              <>
                <Button
                  isInverted={true}
                  onClick={() => navigator(`/articles/${article_id}/update`)}
                  width={35}
                  height={35}
                  content={<img src={pen} alt="Update" />}
                />
                <Button
                  isInverted={true}
                  onClick={() => deleteArticle()}
                  width={35}
                  height={35}
                  content={<img src={bin} alt="Delete" />}
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <ErrorHandler err={err} />
      )}
    </div>
  )
}

export default Article
