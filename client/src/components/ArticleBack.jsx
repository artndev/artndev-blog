import "../styles/css/ArticleBack.css"
import React, { useEffect } from 'react'
import config from "../config.json"


function ArticleBack({ title, subtitle, text }) {
    const readingTime = (text) => {
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / config.WPS);

        return time.toString()
    }

    return (
        <>
            <div className="article__back">
                <div className="article__back-info">
                    <h3 className="article__back-title">
                        { title }
                    </h3>
                    <div className="article__back-subtitle">
                        { `${readingTime(text)}m • ${subtitle}` }
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