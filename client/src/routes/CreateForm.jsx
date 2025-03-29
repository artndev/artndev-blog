import React, { useEffect, useState } from 'react'
import ArticleForm from '../components/ArticleForm.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../axios.js"


function CreateForm() {
  const navigator = useNavigate()
  const [err, setErr] = useState(null)

  const createArticle = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    console.log(formData)

    let data = {}
    formData.forEach((val, key) => data[key] = val)

    axios
      .post("/articles/create", {
        title: data.title,
        text: data.text
      })
      .then(() => navigator("/articles"))
      .catch((err) => {
        console.log(err)

        setErr(err.response.data.message)
      })
  }

  return (
    <>
        <div className="article__form-container">
          <ArticleForm 
            formTitle={"Create"}
            err={err}
            onSubmit={createArticle}
          />
        </div>
    </>
  )
}

export default CreateForm