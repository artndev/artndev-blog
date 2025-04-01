import { Link } from "react-router-dom";
import "../styles/css/AuthForm.css";
import React, { useEffect, useRef, useState } from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";


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
                {formTitle}
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
                        <Input 
                            name={"username"}
                            width={"inherit"}
                            height={45}
                        />
                        {/* <input 
                            className="auth__form-input"
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Enter your username..."
                            required 
                        /> */}
                    </div>
                    <div className="auth__form-group">
                        <label htmlFor="password">
                            Password:
                        </label>
                        <div className="input__group">
                            <Input 
                                ref={inputRef}
                                type={inputType ? "text" : "password"}
                                name={"password"}
                                width={"inherit"}
                                height={45}
                            />
                            <button
                                ref={btnRef}
                                type="button" 
                                className="input__group-btn closed" 
                                onClick={() => setInputType(!inputType)}
                            />
                        </div>
                    </div>
                </div>
                <div className="auth__form-btn__group">
                    <Button 
                        className={"reset"}
                        content={"Submit"}
                        type={"submit"}
                        width={"min(200px, 50%)"}
                        height={45}
                    />
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