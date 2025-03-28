import "../styles/css/ArticleBack.css"
import React from 'react'


function ArticleBack({ title, subtitle, text }) {
  return (
    <>
        <div className="article">
            <div className="article__info">
                <h3 className="article__title">
                    { title }
                </h3>
                <div className="article__subtitle">
                    { subtitle }
                </div>
            </div>
            <div className="article__text">
                { text }
            </div>
        </div>
    </>
  )
}

export default ArticleBack