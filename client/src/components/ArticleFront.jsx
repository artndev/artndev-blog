import "../styles/css/ArticleFront.css"
import React from 'react'


function ArticleFront({ title, subtitle, text,  }) {
    return (
        <>
            <div className="article__front">
                <div className="article__front-info">
                    <h3 className="article__front-title">
                        { title }
                    </h3>
                    <div className="article__front-subtitle">
                        { subtitle }
                    </div>
                </div>
                <div className="article__front-text">
                    { text }
                </div>
            </div>
        </>
    )
}

export default ArticleFront