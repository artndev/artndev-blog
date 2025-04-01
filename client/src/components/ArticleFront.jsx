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
        <>
            <div className="article__front">
                <div className="article__front-info">
                    <h3 className="article__title">
                        { title }
                    </h3>
                    <div id="mst">
                        { `${readingTime(text)}m • ${subtitle}` }
                    </div>
                </div>
                <MarkdownPreview source={text} className={"article__text"} />
            </div>
        </>
    )
}

export default ArticleFront