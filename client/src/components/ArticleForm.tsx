import React, { useState } from 'react'
import config from '../config.json'
import '../styles/css/ArticleForm.css'
import Button from './Button'
import Input from './Input'
import MarkdownEditor from './MarkdownEditor'

const minmax = (n: number, min: number, max: number) => {
  return n >= min && n <= max
}

const ArticleForm: React.FC<IArticleFormProps> = ({
  formTitle,
  defaultTitle,
  defaultSubtitle,
  defaultContent,
  onSubmit,
}) => {
  const [title, setTitle] = useState<string>(defaultTitle || '')
  const [subtitle, setSubtitle] = useState<string>(defaultSubtitle || '')
  const [content, setContent] = useState<string>(defaultContent || '')
  const [err, setErr] = useState<boolean | undefined>(undefined)

  return (
    <div className="article__form-subcontainer">
      <h1 className="f-hg">{formTitle}</h1>
      <form
        className="article__form"
        method="post"
        onSubmit={e => {
          e.preventDefault()

          const regexp = new RegExp(config.PATTERNS.ARTICLE_FORM.UNIVERSAL, 'g')
          if (!minmax(title.replaceAll(regexp, '').length, 5, 100)) {
            setErr(true)
            return
          }

          if (!minmax(subtitle.replaceAll(regexp, '').length, 5, 100)) {
            setErr(true)
            return
          }

          if (!minmax(content.replaceAll(regexp, '').length, 5, 5000)) {
            setErr(true)
            return
          }

          onSubmit(title.trim(), subtitle.trim(), content.trim())
        }}
      >
        <div className="article__form-groups">
          {err && (
            <span id="red">
              An unknown error has been occurred or the validation has not been
              passed
            </span>
          )}
          <div className="article__form-group">
            <label htmlFor="title">
              Title
              <span className="f-smx" id="red">
                *
              </span>
              :
            </label>
            <div className="f-smx">Must contain 5 to 100 characters</div>
            <Input
              onChange={e => setTitle(e.target.value)}
              width={'min(500px, 100%)'}
              height={45}
              name={'title'}
              defaultValue={defaultTitle}
            />
          </div>
          <div className="article__form-group">
            <label htmlFor="subtitle">
              Subtitle
              <span className="f-smx" id="red">
                *
              </span>
              :
            </label>
            <div className="f-smx">Must contain 5 to 100 characters</div>
            <Input
              onChange={e => setSubtitle(e.target.value)}
              width={'min(500px, 100%)'}
              height={45}
              name={'subtitle'}
              defaultValue={defaultSubtitle}
            />
          </div>
          <div className="article__form-group">
            <div>
              Text
              <span className="f-smx" id="red">
                *
              </span>
              :
            </div>
            <div className="f-smx">Must contain 5 to 5000 characters</div>
            <MarkdownEditor value={content} onChange={setContent} />
          </div>
        </div>
        <Button
          isStatic={true}
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
