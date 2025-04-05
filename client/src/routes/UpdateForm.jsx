import React, { useEffect, useState } from 'react'
import ArticleForm from '../components/ArticleForm.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../axios.js'
import ErrorHandler from '../components/ErrorHandler.jsx'

function UpdateForm() {
  const navigator = useNavigate()
  const { article_id } = useParams()
  const [data, setData] = useState(null)
  const [err, setErr] = useState(null)

  const updateArticle = e => {
    const formData = new FormData(e.target)
    console.log(formData)

    let data = {}
    formData.forEach((val, key) => (data[key] = val))

    console.log(data)
    axios
      .put(`/articles/${article_id}/update`, {
        title: data.title,
        subtitle: data.subtitle,
        text: data.text,
      })
      .then(() => navigator('/articles'))
      .catch(err => {
        console.log(err)

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
      {data ? (
        <ArticleForm
          formTitle={'Update.'}
          defaultTitle={data.Title}
          defaultText={data.Text}
          defaultSubtitle={data.Subtitle}
          err={err}
          onSubmit={updateArticle}
        />
      ) : (
        <ErrorHandler err={err} />
      )}
    </div>
  )
}

export default UpdateForm
