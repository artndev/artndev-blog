import React from 'react'


function ArticleForm({ 
    formTitle, 
    defaultTitle, 
    defaultText,
    err, 
    onSubmit 
}) {
  return (
    <div className="article__form-subcontainer">
        <h2>
            {formTitle}
        </h2>
        {
            err
            ? <span>
                {err}
            </span>
            : ""
        }
        <form 
            className="article__form" 
            method="post" 
            onSubmit={onSubmit}
        >
            <div className="article__form-group">
                <label htmlFor="title">
                    Title:
                </label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    defaultValue={defaultTitle}
                    required 
                />
            </div>
            <div className="article__form-group">
                <label htmlFor="text">
                    Text:
                </label>
                <input 
                    type="text" 
                    id="text" 
                    name="text"
                    defaultValue={defaultText} 
                    required 
                />
            </div>
            <button type="submit" className="article__form-btn">
                Submit
            </button>
        </form>
    </div>
  )
}

export default ArticleForm