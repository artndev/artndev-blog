import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import ArticleForm from '../components/ArticleForm'
import ErrorHandler from '../components/ErrorHandler'
import config from '../config.json'
import { useAuthContext } from '../contexts/Auth'

const CreateForm = () => {
  const navigator = useNavigate()
  const { accessToken, setAccessToken } = useAuthContext()
  const [err, setErr] = useState<IAxiosErrorResponse>(undefined)

  const createArticle = (title: string, subtitle: string, content: string) => {
    axios
      .post(
        '/articles/create',
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

  return (
    <div className="article__form-container f-md">
      {!err ? (
        <ArticleForm formTitle={'Create.'} onSubmit={createArticle} />
      ) : (
        <ErrorHandler err={err} />
      )}
    </div>
  )
}

export default CreateForm
