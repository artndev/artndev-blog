import '../styles/css/AuthForm.css'
import { Link } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import Input from './Input.jsx'
import Button from './Button.jsx'
import config from '../config.json'

function AuthForm({ formTitle, err, onSubmit, btnText, btnLink }) {
  const inputRef = useRef(null)
  const btnRef = useRef(null)
  const [inputType, setInputType] = useState(false)

  useEffect(() => {
    inputRef.current.type = inputType ? 'text' : 'password'
    btnRef.current.classList.remove(inputType ? 'closed' : 'opened')
    btnRef.current.classList.add(inputType ? 'opened' : 'closed')
  }, [inputType])

  return (
    <div className="auth__form-container f-md">
      <div className="auth__form-subcontainer">
        <h1 className="f-hg">{formTitle}</h1>
        <form className="auth__form" method="post" onSubmit={onSubmit}>
          <div className="auth__form-groups">
            {err && (
              <span id="red">
                This username has been taken or your credentials are incorrect
              </span>
            )}
            <div className="auth__form-group">
              <label htmlFor="username">
                Username<span id="red">*</span>:
              </label>
              <div className="auth__form-group__info f-smx">
                Must contain 5 to 20 characters (spaces are permitted)
                including:
                <p>'a-z/A-Z/0-9/_'</p>
              </div>
              <Input
                width={'inherit'}
                height={45}
                onKeyDown={e => {
                  if (e.code === 'Space') e.preventDefault()
                }}
                pattern={config.PATTERNS.AUTH_FORM.USERNAME}
                name={'username'}
              />
            </div>
            <div className="auth__form-group">
              <label htmlFor="password">
                Password<span id="red">*</span>:
              </label>
              <div className="auth__form-group__info f-smx">
                Must contain 5 to 20 characters (spaces are permitted)
                including:
                <p>'a-z', 'A-Z', '0-9' and './_/!/@/#/$/%/^/&/*'</p>
              </div>
              <div className="auth__form-ipt__group">
                <Input
                  width={'inherit'}
                  height={45}
                  onKeyDown={e => {
                    if (e.code === 'Space') e.preventDefault()
                  }}
                  ref={inputRef}
                  type={inputType ? 'text' : 'password'}
                  pattern={config.PATTERNS.AUTH_FORM.PASSWORD}
                  name={'password'}
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
              width={'min(200px, 100%)'}
              height={45}
              type={'submit'}
              content={'Submit'}
            />
            <Link className="lnk f-smx" id="grey" to={btnLink}>
              {btnText}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthForm
