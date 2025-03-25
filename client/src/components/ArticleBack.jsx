import "../styles/css/ArticleBack.css"
import React from 'react'


function ArticleBack({ title, text, updated }) {
  return (
    <>
        <div className="article">
            <div className="article__info">
                <span className="article__title">
                    { title }
                </span>
                <span className="article__updated">
                    { updated }
                </span>
            </div>
            <span className="article__text">
                { text }
            </span>
        </div>
    </>
  )
}

export default ArticleBack