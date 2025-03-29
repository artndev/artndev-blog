import { Link } from "react-router-dom";
import "../styles/css/AuthForm.css";
import React, { useEffect, useRef, useState } from "react";

function AuthForm({ 
    formTitle, 
    err, 
    onSubmit,
    btnText,
    btnLink
}) {
  const inputRef = useRef(null)
  const btnRef = useRef(null)
  const [inputType, setInputType] = useState(false)

  useEffect(() => {
    inputRef.current.type = inputType ? "text" : "password"
    btnRef.current.classList.remove(inputType ? "closed" : "opened")
    btnRef.current.classList.add(inputType ? "opened" : "closed")
  }, [inputType])

  return (
    <>
    <div className="auth__form-container">
        <div className="auth__from-subcontainer">
            <h2>
                # {formTitle}
            </h2>
            <form 
                className="auth__form" 
                method="post" 
                onSubmit={onSubmit}
            >
                <div className="auth__form-groups">
                    {
                        err
                        ? <span className="auth__form-err">
                            {err}
                        </span>
                        : ""
                    }
                    <div className="auth__form-group">
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input 
                            className="auth__form-input"
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Enter your username..."
                            required 
                        />
                    </div>
                    <div className="auth__form-group">
                        <label htmlFor="password">
                            Password:
                        </label>
                        <div className="input__group">
                            <input 
                                ref={inputRef}
                                className="auth__form-input"
                                type={inputType ? "text" : "password"} 
                                id="password" 
                                name="password"
                                placeholder="Enter you password..." 
                                required
                            />
                            <button
                                ref={btnRef}
                                className="input__group-btn closed" 
                                type="button" 
                                onClick={() => {
                                    setInputType(!inputType)
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="auth__form-btn__group">
                    <button type="submit" className="auth__form-btn">
                        Submit
                    </button>
                    <Link className="auth__form-btn__group-link a-reset" to={btnLink}>
                        {btnText}
                    </Link>
                </div>
            </form>
        </div>
    </div>
    </>
  );
}

export default AuthForm;