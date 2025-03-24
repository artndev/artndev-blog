import "../styles/css/AuthForm.css";
import React from "react";

function AuthForm({ title, onSubmit }) {
  return (
    <>
        <div className="auth__form">
            <h2>
                {title}
            </h2>
            <form method="post" onSubmit={onSubmit}>
                <div className="auth__form-group">
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        required 
                    />
                </div>
                <div className="auth__form-group">
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                    />
                </div>
                <button type="submit" className="auth__form-btn">
                    Submit
                </button>
            </form>
        </div>
    </>
  );
}

export default AuthForm;