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
            <h2 className="form__title">
                {formTitle}
            </h2>
            <form 
                className="article__form" 
                method="post" 
                onSubmit={onSubmit}
            >
                <div className="article__form-groups">
                    {
                        err && <span id="err">
                            Unknown error has occurred
                        </span>
                    }
                    <div className="article__form-group">
                        <label className="form__label" htmlFor="title">
                            Title<span id="err">*</span>:
                        </label>
                        <Input 
                            width={"min(500px, 100%)"}
                            height={45}
                            name={"title"}
                            defaultValue={defaultTitle}
                        />
                    </div>
                    <div className="article__form-group">
                        <label className="form__label" htmlFor="subtitle">
                            Subtitle<span id="err">*</span>:
                        </label>
                        <Input 
                            width={"min(500px, 100%)"}
                            height={45}
                            name={"subtitle"}
                            defaultValue={defaultSubtitle}
                        />
                    </div>
                    <div className="article__form-group">
                        <div className="article__form-group__title form__label">
                            Text<span id="err">*</span>:
                        </div>
                        <MarkdownEditor value={text} onChange={setText} />
                        <Input 
                            className={"hidden"}
                            name={"text"}
                            value={text}
                            defaultValue={defaultText}
                        />
                    </div>
                </div>
                <Button 
                    width={"min(200px, 50%)"}
                    height={45}
                    type={"submit"}
                    content={"Submit"}
                />
            </form>
        </div>
    </div>
  )
}

export default ArticleForm