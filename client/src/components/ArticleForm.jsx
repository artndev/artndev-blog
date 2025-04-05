import '../styles/css/ArticleForm.css'
import React, { useState } from 'react'
import MarkdownEditor from './MarkdownEditor'
import Button from './Button.jsx'
import Input from './Input.jsx'

function ArticleForm({
  formTitle,
  defaultTitle,
  defaultSubtitle,
  defaultText,
  err,
  onSubmit,
}) {
  const [err2, setErr2] = useState(err) // || null
  const [text, setText] = useState(defaultText) // || ''

  return (
    <div className="article__form-subcontainer">
      <h1 className="f-hg">{formTitle}</h1>
      <form
        className="article__form"
        method="post"
        onSubmit={e => {
          e.preventDefault()

          if (text.length < 5 || text.length > 5000) {
            setErr2(true)
            return
          }

          onSubmit(e)
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
              minLength={5}
              maxLength={100}
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
              minLength={5}
              maxLength={100}
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
            <Input
              className={'hidden'}
              name={'text'}
              value={text}
              defaultValue={defaultText}
            />
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
