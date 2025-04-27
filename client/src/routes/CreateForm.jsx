import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios.js'
import ArticleForm from '../components/ArticleForm.jsx'
import config from '../config.json'
import { useAuthContext } from '../contexts/Auth.jsx'
import ErrorHandler from '../components/ErrorHandler.js'

function CreateForm() {
  const navigator = useNavigate()
  const { accessToken, setAccessToken } = useAuthContext()
  const [err, setErr] = useState(null)

  const createArticle = (title, subtitle, content) => {
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
          setAccessToken(null)
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
