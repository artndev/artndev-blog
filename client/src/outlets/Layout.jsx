import "../styles/css/Header.css"
import React from 'react'
import { Outlet, Link } from 'react-router-dom'


function Layout() {
  return (
    <>
        <header className="header__container f-md">
            <div className="header">
              <h1 className="f-bg">
                Blog.
              </h1>
              <nav className="nav__container">
                <Link className="nav__item" to={"/articles/create"}>
                  CREATE
                </Link>
                <Link className="nav__item" to={"/articles"}>
                  ARTICLES
                </Link>
                <Link className="nav__item" to={"/profile"}>
                  PROFILE
                </Link>
              </nav>
            </div>
        </header>

        <Outlet />
    </>
  )
}

export default Layout