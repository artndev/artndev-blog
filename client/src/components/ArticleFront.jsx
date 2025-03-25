import "../styles/css/ArticleFront.css"
import React from 'react'


function ArticleFront({ title, text, updated }) {
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

export default ArticleFront