import "../styles/css/ArticleFront.css"
import React from 'react'
import config from "../config.json"


function ArticleFront({ title, subtitle, text,  }) {
    const readingTime = (text) => {
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / config.WPS);

        return time.toString()
    }

    return (
        <>
            <div className="article__front">
                <div className="article__front-info">
                    <h3 className="article__front-title">
                        { title }
                    </h3>
                    <div className="article__front-subtitle">
                        { `${readingTime(text)}m • ${subtitle}` }
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