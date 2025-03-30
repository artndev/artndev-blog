import "../styles/css/ArticleBack.css"
import React, { useEffect } from 'react'
import config from "../config.json"


function ArticleBack({ data }) {
    const readingTime = (text) => {
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / config.WPS);

        return time.toString()
    }

    useEffect(() => {
        console.log(data)
    }, [])

    return (
        <>
            <div className="article__back">
                <div className="article__back-info">
                    <h3 className="article__back-title">
                        { data.Title }
                    </h3>
                    <div className="article__back-subtitle">
                        { `${readingTime(data.Text)}m • ${(new Date(data.Updated)).toLocaleDateString().replaceAll(".", "/")}` }
                    </div>
                </div>
                <div className="article__back-text">
                    { data.Subtitle }
                </div>
            </div>
        </>
    )
}

export default ArticleBack