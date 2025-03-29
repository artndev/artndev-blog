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
              <nav className="nav__container">
                <Link className="nav__item-link" to={"/articles/create"}>
                  <div className="nav__item">
                    CREATE
                  </div>
                </Link>
                <Link className="nav__item-link" to={"/articles"}>
                  <div className="nav__item">
                    ARTICLES
                  </div>
                </Link>
                <Link className="nav__item-link" to={"/profile"}>
                  <div className="nav__item">
                    PROFILE
                  </div>
                </Link>
              </nav>
            </div>
        </header>

        <Outlet />
    </>
  )
}

export default Layout