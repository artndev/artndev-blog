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
    <div className="article__form-container f-md">
        <div className="article__form-subcontainer">
            <h1 className="f-hg">
                {formTitle}
            </h1>
            <form 
                className="article__form" 
                method="post" 
                onSubmit={onSubmit}
            >
                <div className="article__form-groups">
                    {
                        err && <span id="red">
                            An unknown error has been occurred
                        </span>
                    }
                    <div className="article__form-group">
                        <label htmlFor="title">
                            Title<span id="red">*</span>:
                        </label>
                        <Input 
                            width={"min(500px, 100%)"}
                            height={45}
                            name={"title"}
                            defaultValue={defaultTitle}
                        />
                    </div>
                    <div className="article__form-group">
                        <label htmlFor="subtitle">
                            Subtitle<span id="red">*</span>:
                        </label>
                        <Input 
                            width={"min(500px, 100%)"}
                            height={45}
                            name={"subtitle"}
                            defaultValue={defaultSubtitle}
                        />
                    </div>
                    <div className="article__form-group">
                        <div>
                            Text<span id="red">*</span>:
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
                    width={"min(200px, 100%)"}
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