import React from 'react'
import config from '../config.json'
import '../styles/css/ArticleFront.css'
import MarkdownPreview from './MarkdownPreview.jsx'

const readingTime = (content: string) => {
  if (!content) return '..m'

  const words = content.trim().split(/\s+/).length
  const time = Math.ceil(words / config.WPS)

  return time.toString()
}

const ArticleFront: React.FC<IArticleFrontProps> = ({
  title,
  subtitle,
  content,
}) => {
  return (
    <div className="article__front f-md">
      <div className="article__front-group">
        <h1 className="article__title f-bg">{title}</h1>
        <div className="f-smx" id="grey">
          {`${readingTime(content)}m • ${subtitle}`}
        </div>
      </div>
      <MarkdownPreview source={content} className="" />
    </div>
  )
}

export default ArticleFront
