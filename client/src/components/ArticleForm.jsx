import "../styles/css/ArticleForm.css"
import React, { useState } from 'react'
import MarkdownEditor from './MarkdownEditor'


function ArticleForm({ 
    formTitle, 
    defaultTitle, 
    defaultSubtitle,
    defaultText,
    err, 
    onSubmit 
}) {
  const [title, setTitle] = useState(defaultTitle)
  const [text, setText] = useState(defaultText)

  return (
    <div className="article__form-container">
        <div className="article__form-subcontainer">
            <h2>
                {formTitle}
            </h2>
            <form 
                className="article__form" 
                method="post" 
                onSubmit={onSubmit}
            >
                <div className="article__form-groups">
                    <div className="article__form-group">
                        <label htmlFor="title">
                            Title:
                        </label>
                        <input 
                            className="article__form-input"
                            type="text" 
                            id="title" 
                            name="title" 
                            defaultValue={defaultTitle}
                            placeholder={"Enter title..."}
                            required 
                        />
                    </div>
                    <div className="article__form-group">
                        <label htmlFor="subtitle">
                            Subtitle:
                        </label>
                        <input 
                            className="article__form-input"
                            type="text" 
                            id="subtitle" 
                            name="subtitle" 
                            defaultValue={defaultSubtitle}
                            placeholder={"Enter subtitle..."}
                            required 
                        />
                    </div>
                    <div className="article__form-group">
                        <div className="article__form-group__title">
                            Text:
                        </div>
                        <MarkdownEditor value={text} onChange={setText} />
                        <input 
                            style={{ 
                                position: "absolute",
                                visibility: "hidden" 
                            }}
                            type="text" 
                            id="text" 
                            name="text" 
                            value={text}
                            defaultValue={defaultText}
                            required 
                        />
                    </div>
                </div>
                <button type="submit" className="article__form-btn">
                    Submit
                </button>
            </form>
        </div>
    </div>
  )
}

export default ArticleForm