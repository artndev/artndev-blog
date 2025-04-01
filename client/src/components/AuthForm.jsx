import "../styles/css/AuthForm.css";
import { Link } from "react-router-dom";
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
        <div className="auth__form-subcontainer">
            <h2 className="form__title">
                {formTitle}
            </h2>
            <form 
                className="auth__form" 
                method="post" 
                onSubmit={onSubmit}
            >
                <div className="auth__form-groups">
                    {
                        err && <span id="err">
                            Username or password is incorrect
                        </span>
                    }
                    <div className="auth__form-group">
                        <label className="form__label" htmlFor="username">
                            Username<span id="err">*</span>:
                        </label>
                        <Input 
                            width={"inherit"}
                            height={45}
                            name={"username"}
                        />
                    </div>
                    <div className="auth__form-group">
                        <label className="form__label" htmlFor="password">
                            Password<span id="err">*</span>:
                        </label>
                        <div className="auth__form-ipt__group">
                            <Input 
                                width={"inherit"}
                                height={45}
                                ref={inputRef}
                                type={inputType ? "text" : "password"}
                                name={"password"}
                            />
                            <button
                                ref={btnRef}
                                type="button" 
                                className="auth__form-ipt__group-btn closed" 
                                onClick={() => setInputType(!inputType)}
                            />
                        </div>
                    </div>
                </div>
                <div className="auth__form-btn__group">
                    <Button 
                        width={"min(200px, 50%)"}
                        height={45}
                        type={"submit"}
                        content={"Submit"}
                    />
                    <Link id="mst" className="lnk" to={btnLink}>
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