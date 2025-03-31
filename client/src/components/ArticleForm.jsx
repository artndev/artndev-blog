import "../styles/css/ArticleForm.css"
import React, { useState } from 'react'
import MarkdownEditor from './MarkdownEditor'
import Button from "./Button.jsx"
import Input from "./Input.jsx"


function ArticleForm({ 
    formTitle, 
    defaultTitle, 
    defaultSubtitle,
    defaultText,
    err, 
    onSubmit 
}) {
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
                        <Input 
                            name={"title"}
                            defaultValue={defaultTitle}
                            width={"min(500px, 100%)"}
                            height={45}
                        />
                    </div>
                    <div className="article__form-group">
                        <label htmlFor="subtitle">
                            Subtitle:
                        </label>
                        <Input 
                            name={"subtitle"}
                            defaultValue={defaultSubtitle}
                            width={"min(500px, 100%)"}
                            height={45}
                        />
                    </div>
                    <div className="article__form-group">
                        <div className="article__form-group__title">
                            Text:
                        </div>
                        <MarkdownEditor value={text} onChange={setText} />
                        <Input 
                            name={"text"}
                            value={text}
                            defaultValue={defaultText}
                            style={{
                                position: "absolute",
                                visibility: "hidden" 
                            }}
                        />
                    </div>
                </div>
                <Button 
                    content={"Submit"}
                    type={"submit"}
                    width={"min(200px, 50%)"}
                    height={45}
                />
            </form>
        </div>
    </div>
  )
}

export default ArticleForm