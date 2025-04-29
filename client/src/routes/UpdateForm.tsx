import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../axios'
import ArticleForm from '../components/ArticleForm'
import ErrorHandler from '../components/ErrorHandler'
import config from '../config.json'
import { useAuthContext } from '../contexts/Auth'

function UpdateForm() {
  const navigator = useNavigate()
  const { accessToken, setAccessToken } = useAuthContext()
  const { article_id } = useParams()
  const [data, setData] = useState<IArticleData | undefined>(undefined)
  const [err, setErr] = useState<IAxiosErrorResponse>(undefined)

  const updateArticle = (title: string, subtitle: string, content: string) => {
    axios
      .put(
        `/articles/${article_id}/update`,
        {
          title: title,
          subtitle: subtitle,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
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
  }, [article_id])

  return (
    <div className="article__form-container f-md">
      {data && !err ? (
        <ArticleForm
          formTitle={'Update.'}
          defaultTitle={data!.Title}
          defaultContent={data!.Content}
          defaultSubtitle={data!.Subtitle}
          onSubmit={updateArticle}
        />
      ) : (
        <ErrorHandler err={err} />
      )}
    </div>
  )
}

export default UpdateForm
