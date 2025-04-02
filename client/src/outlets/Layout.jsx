import "../styles/css/Header.css"
import React, { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import AdminContext from "../contexts/Admin"


function Layout() {
  const { admin } = useContext(AdminContext)

  return (
    <>
        <header className="header__container f-md">
            <div className="header">
              <h1 className="f-bg">
                Blog.
              </h1>
              <nav className="nav__container">
                <Link className="nav__item" id={`${!admin ? "red" : ""}`} to={"/articles/create"}>
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