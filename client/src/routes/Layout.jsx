import React from 'react'
import { Outlet, Link } from 'react-router-dom'


function Layout() {
  return (
    <>
        <nav>
            <Link to={"/"}>
                Some navigation
            </Link>
        </nav>

        <Outlet />
        
        <footer>
            Some pagination
        </footer>
    </>
  )
}

export default Layout