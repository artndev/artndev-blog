import "../styles/css/ArticleFront.css"
import React from 'react'
import config from "../config.json"
import MarkdownPreview from "./MarkdownPreview.jsx"


function ArticleFront({ title, subtitle, text,  }) {
    const readingTime = (text) => {
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / config.WPS);

        return time.toString()
    }

    return (
            <div className="article__front f-md">
                <div className="article__front-group">
                    <h1 className="article__title f-bg">
                        { title }
                    </h1>
                    <div className="f-smx" id="grey">
                        { `${readingTime(text)}m • ${subtitle}` }
                    </div>
                </div>
                <MarkdownPreview source={text} />
            </div>
    )
}

export default ArticleFront