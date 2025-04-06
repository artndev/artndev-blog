import React, { useContext, useEffect, useState } from 'react'
import ArticleForm from '../components/ArticleForm.jsx'
import { useNavigate } from 'react-router-dom'
import axios from '../axios.js'
import AuthContext from '../contexts/Auth.jsx'

function CreateForm() {
  const navigator = useNavigate()
  const { token } = useContext(AuthContext)
  const [err, setErr] = useState(null)

  const createArticle = (title, subtitle, text) => {
    axios
      .post(
        '/articles/create',
        {
          title: title,
          subtitle: subtitle,
          text: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => navigator('/articles'))
      .catch(err => {
        console.log(err)

        setErr(err.response)
      })
  }

  return (
    <div className="article__form-container f-md">
      <ArticleForm formTitle={'Create.'} err={err} onSubmit={createArticle} />
    </div>
  )
}

export default CreateForm
