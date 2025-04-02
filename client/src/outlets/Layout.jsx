import "../styles/css/Header.css"
import React from 'react'
import { Outlet, Link } from 'react-router-dom'


function Layout() {
  return (
    <>
        <header className="header__container">
            <div className="header__subcontainer">
              <h3 className="header__logo">
                Blog.
              </h3>
              <nav className="nav__container f-md">
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