import "../styles/css/ArticleBack.css"
import React from 'react'


function ArticleBack({ title, subtitle, text }) {
  return (
    <>
        <div className="article__back">
            <div className="article__back-info">
                <h3 className="article__back-title">
                    { title }
                </h3>
                <div className="article__back-subtitle">
                    { subtitle }
                </div>
            </div>
            <div className="article__back-text">
                { text }
            </div>
        </div>
    </>
  )
}

export default ArticleBack