import { Link, Outlet } from 'react-router-dom'
import { useAdminContext } from '../contexts/Admin'
import { useAuthContext } from '../contexts/Auth'
import '../styles/css/Header.css'

const Layout = () => {
  const { refreshToken } = useAuthContext()
  const { admin } = useAdminContext()

  return (
    <>
      <header className="header__container f-md">
        <div className="header">
          <h1 className="f-bg">Blog.</h1>
          <nav className="nav__container">
            <Link className="nav__item" to={'/articles'}>
              ARTICLES
            </Link>
            <Link
              className="nav__item"
              id={`${!refreshToken ? 'red' : ''}`}
              to={'/profile'}
            >
              PROFILE
            </Link>
            <Link
              className="nav__item"
              id={`${!admin ? 'red' : ''}`}
              to={'/articles/create'}
            >
              CREATE
            </Link>
          </nav>
        </div>
      </header>

      <Outlet />
    </>
  )
}

export default Layout
