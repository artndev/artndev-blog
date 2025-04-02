import "../styles/css/ArticleBack.css"
import React, { useEffect } from 'react'
import config from "../config.json"


function ArticleBack({ data }) {
    const readingTime = (text) => {
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / config.WPS);

        return time.toString()
    }

    return (
            <div className="article__back f-md">
                <div className="article__back-group">
                    <h3 className="article__title f-bg">
                        { data.Title }
                    </h3>
                    <div className="f-smx" id="grey">
                        { `${readingTime(data.Text)}m • ${(new Date(data.Updated)).toLocaleDateString().replaceAll(".", "/")}` }
                    </div>
                </div>
                <div>
                    { data.Subtitle }
                </div>
            </div>
    )
}

export default ArticleBack