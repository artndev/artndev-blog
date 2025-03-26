import "../styles/css/Header.css"
import React from 'react'
import { Outlet, Link } from 'react-router-dom'


function Layout() {
  return (
    <>
        <header className="header__container">
            <div className="header__subcontainer">
              <div className="header__logo">
                Blog
              </div>
              <nav className="nav__container">
                <Link className="nav__item-link">
                  <div className="nav__item">
                    CREATE
                  </div>
                </Link>
                <Link className="nav__item-link">
                  <div className="nav__item">
                    ARTICLES
                  </div>
                </Link>
                <Link className="nav__item-link">
                  <div className="nav__item">
                    PROFILE
                  </div>
                </Link>
              </nav>
            </div>
        </header>

        <Outlet />
        
        <footer>
            Some pagination
        </footer>
    </>
  )
}

export default Layout