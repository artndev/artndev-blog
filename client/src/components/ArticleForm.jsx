import '../styles/css/ArticleForm.css'
import React, { useEffect, useState } from 'react'
import MarkdownEditor from './MarkdownEditor'
import Button from './Button.jsx'
import Input from './Input.jsx'
import config from '../config.json'

const minmax = (n, min, max) => {
  return n >= min && n <= max
}

function ArticleForm({
  formTitle,
  defaultTitle,
  defaultSubtitle,
  defaultText,
  err,
  onSubmit,
}) {
  const [title, setTitle] = useState(defaultTitle || '')
  const [subtitle, setSubtitle] = useState(defaultSubtitle || '')
  const [text, setText] = useState(defaultText || '')
  const [err2, setErr2] = useState(err)

  useEffect(() => {
    console.log(title, subtitle, text)
  }, [title, subtitle, text])

  return (
    <div className="article__form-subcontainer">
      <h1 className="f-hg">{formTitle}</h1>
      <form
        className="article__form"
        method="post"
        onSubmit={e => {
          e.preventDefault()

          const regexp = !new RegExp(config.PATTERNS.ARTICLE_FORM.UNIVERSAL)
          if (!minmax(title.replaceAll(regexp, '').length, 5, 100)) {
            setErr2(true)
            return
          }

          if (!minmax(subtitle.replaceAll(regexp, '').length, 5, 100)) {
            setErr2(true)
            return
          }

          if (!minmax(text.replaceAll(regexp, '').length, 5, 5000)) {
            setErr2(true)
            return
          }

          onSubmit(title.trim(), subtitle.trim(), text.trim())
        }}
      >
        <div className="article__form-groups">
          {err2 && (
            <span id="red">
              An unknown error has been occurred or the validation has not been
              passed
            </span>
          )}
          <div className="article__form-group">
            <label htmlFor="title">
              Title<span id="red">*</span>:
            </label>
            <div className="f-smx">Must contain 5 to 100 characters</div>
            <Input
              width={'min(500px, 100%)'}
              height={45}
              onChange={e => setTitle(e.target.value)}
              name={'title'}
              defaultValue={defaultTitle}
            />
          </div>
          <div className="article__form-group">
            <label htmlFor="subtitle">
              Subtitle<span id="red">*</span>:
            </label>
            <div className="f-smx">Must contain 5 to 100 characters</div>
            <Input
              width={'min(500px, 100%)'}
              height={45}
              onChange={e => setSubtitle(e.target.value)}
              name={'subtitle'}
              defaultValue={defaultSubtitle}
            />
          </div>
          <div className="article__form-group">
            <div>
              Text<span id="red">*</span>:
            </div>
            <div className="f-smx">Must contain 5 to 5000 characters</div>
            <MarkdownEditor value={text} onChange={setText} />
          </div>
        </div>
        <Button
          width={'min(200px, 100%)'}
          height={45}
          type={'submit'}
          content={'Submit'}
        />
      </form>
    </div>
  )
}

export default ArticleForm
