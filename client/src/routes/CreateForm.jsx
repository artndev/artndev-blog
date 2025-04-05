import React, { useEffect, useState } from 'react'
import ArticleForm from '../components/ArticleForm.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../axios.js'

function CreateForm() {
  const navigator = useNavigate()
  const [err, setErr] = useState(null)

  const createArticle = e => {
    const formData = new FormData(e.target)
    console.log(formData)

    let data = {}
    formData.forEach((val, key) => (data[key] = val))

    axios
      .post('/articles/create', {
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

  return (
    <div className="article__form-container f-md">
      <ArticleForm formTitle={'Create.'} err={err} onSubmit={createArticle} />
    </div>
  )
}

export default CreateForm
