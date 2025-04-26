import React from 'react'
import config from '../config.json'
import '../styles/css/ArticleBack.css'

const readingTime = content => {
  if (!content) return '..m'

  const words = content.trim().split(/\s+/).length
  const time = Math.ceil(words / config.WPS)

  return time.toString()
}

function ArticleBack({ data }) {
  return (
    <div className="article__back f-md">
      <div className="article__back-group">
        <h1 className="article__title f-bg">{data.Title}</h1>
        <div className="f-smx" id="grey">
          {`${readingTime(data.Content)}m • ${new Date(data.Updated).toLocaleDateString().replaceAll('.', '/')}`}
        </div>
      </div>
      <div>{data.Subtitle}</div>
    </div>
  )
}

export default ArticleBack
